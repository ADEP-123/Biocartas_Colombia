const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const REUSABLE_LICENSES = new Set([
  "cc0",
  "cc-by",
  "cc-by-sa",
  "cc-by-nc",
  "cc-by-nc-sa",
]);
const LICENSE_PARAM = Array.from(REUSABLE_LICENSES).join(",");

async function searchObservations(scientificName, { qualityGrade } = {}) {
  const params = new URLSearchParams({
    taxon_name: scientificName,
    photos: "true",
    photo_license: LICENSE_PARAM,
    order_by: "votes",
    order: "desc",
    per_page: "10",
  });
  if (qualityGrade) params.set("quality_grade", qualityGrade);

  const res = await fetch(
    `https://api.inaturalist.org/v1/observations?${params}`,
  );
  const data = await res.json();
  return data.results || [];
}

function extractUsablePhoto(observation) {
  const photo = (observation.photos || []).find(p =>
    REUSABLE_LICENSES.has(p.license_code),
  );
  if (!photo) return null;
  return {
    imageUrl: photo.url.replace("square", "medium"),
    imageAttribution: photo.attribution,
    imageSourceUrl: observation.uri,
  };
}

async function findBestPhoto(scientificName) {
  // Primero intentamos solo con observaciones "research grade" (identificacion verificada por la comunidad)
  let results = await searchObservations(scientificName, {
    qualityGrade: "research",
  });
  // Si no hay suficientes, ampliamos la busqueda a cualquier calidad
  if (results.length === 0) {
    results = await searchObservations(scientificName);
  }

  for (const obs of results) {
    const photoData = extractUsablePhoto(obs);
    if (photoData) return photoData;
  }
  return null;
}

async function main() {
  const species = await prisma.species.findMany();

  for (const s of species) {
    if (s.imageUrl) {
      console.log(`\n${s.commonName}: ya tiene imagen, se omite.`);
      continue;
    }

    console.log(
      `\nBuscando foto para ${s.commonName} (${s.scientificName})...`,
    );
    try {
      const photoData = await findBestPhoto(s.scientificName);
      if (!photoData) {
        console.warn(
          "  ⚠ Sin foto con licencia reutilizable. Requiere seleccion manual (GBIF o Wikimedia Commons).",
        );
        continue;
      }
      await prisma.species.update({ where: { id: s.id }, data: photoData });
      console.log(`  ✔ ${photoData.imageUrl}`);
      console.log(`    Credito: ${photoData.imageAttribution}`);
      console.log(`    Fuente: ${photoData.imageSourceUrl}`);
    } catch (error) {
      console.error("  ✖ Error:", error.message);
    }
    await new Promise(r => setTimeout(r, 1000)); // no saturar la API
  }

  console.log(
    "\nListo. Abre las URLs impresas para revisarlas antes de seguir.",
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
