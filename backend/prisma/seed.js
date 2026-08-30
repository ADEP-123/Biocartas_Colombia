const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const speciesSeed = [
  {
    commonName: "Turpial",
    scientificName: "Icterus icterus",
    group: "AVES",
    habitat: "Bosques secos, sabanas y zonas urbanas con árboles",
    diet: "Frutas, néctar e insectos",
    avgSizeCm: 20,
    avgWeightKg: 0.04,
    conservationStatus: "LC",
    speed: 55,
    camouflage: 20,
    resistance: 50,
    adaptability: 90,
    description:
      "Ave de plumaje negro y naranja intenso, muy adaptable a ambientes humanos y reconocible por su canto melodioso.",
    questions: [
      {
        prompt: "¿Cuál es el principal hábitat del turpial?",
        options: [
          "Bosques secos y zonas abiertas con árboles",
          "Fondo marino profundo",
          "Cuevas subterráneas",
          "Glaciares andinos",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿De qué se alimenta principalmente el turpial?",
        options: [
          "Frutas, néctar e insectos",
          "Solo peces",
          "Rocas y minerales",
          "Otras aves adultas",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Tucán esmeralda",
    scientificName: "Aulacorhynchus prasinus",
    group: "AVES",
    habitat: "Bosques húmedos de montaña",
    diet: "Frutas, insectos y pequeños vertebrados",
    avgSizeCm: 30,
    avgWeightKg: 0.13,
    conservationStatus: "LC",
    speed: 40,
    camouflage: 60,
    resistance: 55,
    adaptability: 70,
    description:
      "Reconocible por su pico largo y curvo, cumple un papel clave dispersando semillas en los bosques andinos.",
    questions: [
      {
        prompt: "¿Qué característica distintiva tiene el tucán esmeralda?",
        options: [
          "Un pico largo y curvo",
          "Alas transparentes",
          "Ausencia total de plumas",
          "Vive bajo el agua",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Cuál es su estado de conservación según la UICN?",
        options: [
          "Preocupación menor",
          "En peligro crítico",
          "Extinto en estado silvestre",
          "Vulnerable",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Gran guacamayo verde",
    scientificName: "Ara ambiguus",
    group: "AVES",
    habitat: "Bosques húmedos tropicales de tierras bajas",
    diet: "Semillas, frutos y nueces duras",
    avgSizeCm: 85,
    avgWeightKg: 1.3,
    conservationStatus: "EN",
    speed: 45,
    camouflage: 15,
    resistance: 60,
    adaptability: 35,
    description:
      "Una de las guacamayas más grandes de América, amenazada por la pérdida de los árboles centenarios donde anida.",
    questions: [
      {
        prompt:
          "¿Cuál es el estado de conservación del gran guacamayo verde en Colombia?",
        options: [
          "En peligro",
          "Preocupación menor",
          "Extinto",
          "Casi amenazado",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Qué tipo de hábitat prefiere esta especie?",
        options: [
          "Bosques húmedos tropicales de tierras bajas",
          "Desiertos áridos",
          "Tundra ártica",
          "Praderas de alta montaña",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Pava caucana",
    scientificName: "Penelope perspicax",
    group: "AVES",
    habitat: "Bosques húmedos del valle del río Cauca",
    diet: "Frutas y hojas",
    avgSizeCm: 65,
    avgWeightKg: 1.8,
    conservationStatus: "VU",
    speed: 30,
    camouflage: 65,
    resistance: 45,
    adaptability: 25,
    description:
      "Ave endémica de Colombia, de hábitos arbóreos, con una población reducida a unas pocas áreas protegidas del Eje Cafetero.",
    questions: [
      {
        prompt: "¿En qué región de Colombia es endémica la pava caucana?",
        options: [
          "El valle del río Cauca",
          "La Amazonía",
          "La Guajira",
          "El Pacífico chocoano",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Qué tipo de vida lleva principalmente?",
        options: [
          "Arbórea, en bosques húmedos",
          "Totalmente acuática",
          "Subterránea",
          "Migratoria transoceánica",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Loro orejiamarillo",
    scientificName: "Ognorhynchus icterotis",
    group: "AVES",
    habitat: "Bosques de niebla andinos asociados a la palma de cera",
    diet: "Frutos de la palma de cera y otras semillas",
    avgSizeCm: 42,
    avgWeightKg: 0.28,
    conservationStatus: "VU",
    speed: 50,
    camouflage: 35,
    resistance: 40,
    adaptability: 30,
    description:
      "Especie casi endémica de Colombia, estrechamente ligada a la palma de cera del Quindío, símbolo de un notable proceso de recuperación gracias a la conservación comunitaria.",
    questions: [
      {
        prompt:
          "¿Con qué palma está fuertemente asociado el loro orejiamarillo?",
        options: [
          "La palma de cera del Quindío",
          "La palma de coco",
          "El cactus saguaro",
          "El helecho arbóreo",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Cómo cambió su categoría de riesgo en años recientes?",
        options: [
          "Bajó de En Peligro a Vulnerable gracias a la conservación",
          "Subió de Vulnerable a Extinto",
          "Nunca ha estado en riesgo",
          "Fue declarado extinto",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Águila harpía",
    scientificName: "Harpia harpyja",
    group: "AVES",
    habitat: "Dosel de selvas tropicales bajas",
    diet: "Perezosos, monos y otros mamíferos arborícolas",
    avgSizeCm: 100,
    avgWeightKg: 7.5,
    conservationStatus: "VU",
    speed: 70,
    camouflage: 45,
    resistance: 80,
    adaptability: 20,
    description:
      "Una de las águilas más grandes y poderosas del mundo, con garras capaces de ejercer una fuerza comparable a la de un oso.",
    questions: [
      {
        prompt: "¿Cuál es una de las principales presas del águila harpía?",
        options: [
          "Perezosos y monos",
          "Peces de agua profunda",
          "Insectos voladores pequeños",
          "Semillas y frutos",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Dónde suele cazar principalmente?",
        options: [
          "En el dosel de la selva tropical",
          "En el fondo del océano",
          "En zonas urbanas",
          "En desiertos",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Cóndor andino",
    scientificName: "Vultur gryphus",
    group: "AVES",
    habitat: "Páramos y zonas altas de la cordillera de los Andes",
    diet: "Carroña de grandes mamíferos",
    avgSizeCm: 130,
    avgWeightKg: 13,
    conservationStatus: "VU",
    speed: 60,
    camouflage: 10,
    resistance: 95,
    adaptability: 25,
    description:
      "Ave voladora más grande del mundo por envergadura y símbolo nacional de Colombia, capaz de planear largas distancias casi sin batir las alas.",
    questions: [
      {
        prompt: "¿Cuál es la función ecológica principal del cóndor andino?",
        options: [
          "Carroñero que limpia el ecosistema",
          "Depredador activo de mamíferos grandes",
          "Polinizador de flores",
          "Constructor de represas",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Qué caracteriza su tasa reproductiva?",
        options: [
          "Es muy baja, con crías cada 2-3 años",
          "Se reproduce varias veces al año",
          "Pone huevos diariamente",
          "No se reproduce en cautiverio",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    commonName: "Paujil piquiazul",
    scientificName: "Crax alberti",
    group: "AVES",
    habitat: "Bosques húmedos tropicales del norte de Colombia (endémico)",
    diet: "Frutas, semillas e insectos",
    avgSizeCm: 92,
    avgWeightKg: 3.1,
    conservationStatus: "CR",
    speed: 25,
    camouflage: 70,
    resistance: 35,
    adaptability: 15,
    description:
      "Ave terrestre endémica de Colombia y gran dispersora de semillas, hoy relegada a unos pocos bosques fragmentados del valle del Magdalena.",
    questions: [
      {
        prompt: "¿Dónde se encuentra principalmente el paujil piquiazul?",
        options: [
          "Endémico del norte de Colombia, valle del Magdalena",
          "Es una especie migratoria intercontinental",
          "Habita en la Patagonia",
          "Se encuentra en África occidental",
        ],
        correctOptionIndex: 0,
      },
      {
        prompt: "¿Cuál es su estado de conservación?",
        options: [
          "En peligro crítico",
          "Preocupación menor",
          "Casi amenazado",
          "Extinto",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
];

async function main() {
  for (const { questions, ...species } of speciesSeed) {
    const created = await prisma.species.upsert({
      where: { scientificName: species.scientificName },
      update: species,
      create: species,
    });

    await prisma.question.deleteMany({ where: { speciesId: created.id } });
    await prisma.question.createMany({
      data: questions.map(q => ({ ...q, speciesId: created.id })),
    });
  }

  console.log(
    `Seed completado: ${speciesSeed.length} especies del módulo Aves.`,
  );
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
