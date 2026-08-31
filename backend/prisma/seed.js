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
        hint: "Piensa en los lugares donde más se ve un turpial: zonas con árboles, no selvas cerradas.",
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
        hint: "Es un ave omnívora que visita flores y árboles frutales.",
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
        hint: "Todos los tucanes comparten un rasgo muy notorio en la cara.",
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
        hint: "Es una especie todavía bastante común en los Andes.",
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
        hint: "Su situación es delicada, pero no es la categoría más grave posible.",
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
        hint: "Necesita árboles muy grandes y viejos para anidar.",
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
        hint: "Su nombre ya da una pista sobre el río al que está asociada.",
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
        hint: "Pasa la mayor parte del tiempo en las ramas, no en el suelo.",
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
        hint: "Es la misma palma que es el árbol nacional de Colombia.",
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
        hint: "Es una historia de éxito de conservación comunitaria.",
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
        hint: "Caza mamíferos que viven en los árboles, no en el suelo.",
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
        hint: "Vive y caza entre las copas de los árboles.",
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
        hint: "No mata a sus presas: se alimenta de animales que ya murieron.",
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
        hint: "Es una de las aves con el ciclo reproductivo más lento del mundo.",
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
        hint: "Solo existe en un área muy específica del norte de Colombia.",
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
        hint: "Es una de las aves más amenazadas de Colombia, la categoría más grave.",
      },
    ],
  },
  /*Mamíferos*/
  {
    commonName: "Puma",
    scientificName: "Puma concolor",
    group: "MAMIFEROS",
    habitat:
      "Amplia variedad de ecosistemas, desde bosques andinos hasta llanuras y selvas",
    diet: "Venados, roedores y otros mamíferos medianos",
    avgSizeCm: 150,
    avgWeightKg: 60,
    conservationStatus: "LC",
    speed: 85,
    camouflage: 70,
    resistance: 65,
    adaptability: 95,
    description:
      "El felino con la distribución más amplia de América, capaz de vivir desde el nivel del mar hasta páramos de alta montaña.",
    questions: [
      {
        prompt: "¿Qué caracteriza la distribución geográfica del puma?",
        options: [
          "Es el felino con el rango más amplio de América",
          "Solo vive en un pequeño valle de Colombia",
          "Vive exclusivamente bajo el agua",
          "Solo existe en zoológicos",
        ],
        correctOptionIndex: 0,
        hint: "Piensa en qué tan extendido está este felino por todo el continente.",
      },
      {
        prompt: "¿De qué se alimenta principalmente el puma?",
        options: [
          "Venados y otros mamíferos medianos",
          "Solo de frutas",
          "Únicamente insectos",
          "Algas marinas",
        ],
        correctOptionIndex: 0,
        hint: "Es un depredador tope, no un herbívoro.",
      },
    ],
  },
  {
    commonName: "Perezoso de tres dedos",
    scientificName: "Bradypus variegatus",
    group: "MAMIFEROS",
    habitat: "Doseles de bosques tropicales húmedos",
    diet: "Hojas, brotes y frutos",
    avgSizeCm: 55,
    avgWeightKg: 4,
    conservationStatus: "LC",
    speed: 5,
    camouflage: 80,
    resistance: 40,
    adaptability: 45,
    description:
      "Uno de los mamíferos más lentos del mundo; su pelaje suele albergar algas que le dan un tono verdoso, ayudándolo a camuflarse entre las hojas.",
    questions: [
      {
        prompt:
          "¿Qué característica le da un tono verdoso al pelaje del perezoso?",
        options: [
          "Algas que crecen en su pelaje",
          "Pintura natural de su piel",
          "Polvo del suelo",
          "Su dieta a base de espinacas",
        ],
        correctOptionIndex: 0,
        hint: "No es un pigmento propio del animal, sino otro organismo que vive sobre su pelo.",
      },
      {
        prompt:
          "¿Dónde pasa la mayor parte de su vida el perezoso de tres dedos?",
        options: [
          "Colgado en el dosel de los árboles",
          "Enterrado bajo tierra",
          "Nadando en ríos",
          "Corriendo por el suelo",
        ],
        correctOptionIndex: 0,
        hint: "Su cuerpo está adaptado para colgar boca abajo, no para desplazarse en el suelo.",
      },
    ],
  },
  {
    commonName: "Zarigüeya común",
    scientificName: "Didelphis marsupialis",
    group: "MAMIFEROS",
    habitat: "Bosques, zonas rurales y áreas urbanas con árboles",
    diet: "Frutas, insectos, pequeños vertebrados y carroña",
    avgSizeCm: 35,
    avgWeightKg: 1.2,
    conservationStatus: "LC",
    speed: 45,
    camouflage: 50,
    resistance: 55,
    adaptability: 90,
    description:
      "Marsupial nocturno muy adaptable, capaz de sobrevivir cerca de los humanos gracias a su dieta variada.",
    questions: [
      {
        prompt: "¿A qué grupo de mamíferos pertenece la zarigüeya?",
        options: ["Marsupiales", "Roedores", "Primates", "Felinos"],
        correctOptionIndex: 0,
        hint: "Las hembras cargan a sus crías en una bolsa, igual que un canguro.",
      },
      {
        prompt: "¿Por qué la zarigüeya sobrevive bien cerca de zonas humanas?",
        options: [
          "Porque tiene una dieta muy variada",
          "Porque solo come una planta rara",
          "Porque hiberna todo el año",
          "Porque vive exclusivamente en el agua",
        ],
        correctOptionIndex: 0,
        hint: "Es un animal oportunista que come casi de todo.",
      },
    ],
  },
  {
    commonName: "Jaguar",
    scientificName: "Panthera onca",
    group: "MAMIFEROS",
    habitat: "Selvas tropicales, sabanas inundables y bosques secos",
    diet: "Venados, chigüiros, caimanes y otros mamíferos grandes",
    avgSizeCm: 170,
    avgWeightKg: 90,
    conservationStatus: "NT",
    speed: 75,
    camouflage: 75,
    resistance: 80,
    adaptability: 55,
    description:
      "El felino más grande de América, reconocido por la fuerza de su mordida, capaz de perforar el caparazón de tortugas y caimanes.",
    questions: [
      {
        prompt:
          "¿Qué hace única la mordida del jaguar entre los grandes felinos?",
        options: [
          "Es capaz de perforar caparazones y cráneos de sus presas",
          "Nunca muerde a sus presas",
          "Solo puede masticar plantas",
          "Es más débil que la de un gato doméstico",
        ],
        correctOptionIndex: 0,
        hint: "A diferencia de otros felinos, mata mordiendo el cráneo directamente.",
      },
      {
        prompt: "¿Cuál es su estado de conservación según la UICN?",
        options: [
          "Casi amenazado",
          "Preocupación menor",
          "En peligro crítico",
          "Extinto en estado silvestre",
        ],
        correctOptionIndex: 0,
        hint: "Su población está disminuyendo, pero todavía no alcanza las categorías más graves.",
      },
    ],
  },
  {
    commonName: "Nutria neotropical",
    scientificName: "Lontra longicaudis",
    group: "MAMIFEROS",
    habitat: "Ríos, quebradas y lagunas de agua dulce",
    diet: "Peces, cangrejos y otros crustáceos",
    avgSizeCm: 100,
    avgWeightKg: 10,
    conservationStatus: "NT",
    speed: 60,
    camouflage: 55,
    resistance: 50,
    adaptability: 40,
    description:
      "Mamífero semiacuático que depende de ríos limpios; es un buen indicador de la calidad del agua de un ecosistema.",
    questions: [
      {
        prompt:
          "¿Por qué la nutria neotropical es un buen indicador ambiental?",
        options: [
          "Porque necesita ríos limpios para sobrevivir",
          "Porque puede vivir en cualquier tipo de agua contaminada",
          "Porque no depende del agua en absoluto",
          "Porque solo vive en el mar",
        ],
        correctOptionIndex: 0,
        hint: "Piensa en qué tan sensible es a la contaminación del agua.",
      },
      {
        prompt: "¿Cuál es su principal fuente de alimento?",
        options: [
          "Peces y crustáceos",
          "Solo frutas",
          "Insectos voladores",
          "Semillas de árboles",
        ],
        correctOptionIndex: 0,
        hint: "Es un cazador que vive y caza dentro del agua.",
      },
    ],
  },
  {
    commonName: "Oso de anteojos",
    scientificName: "Tremarctos ornatus",
    group: "MAMIFEROS",
    habitat: "Bosques andinos y páramos",
    diet: "Frutas, bromelias, palmas y ocasionalmente pequeños animales",
    avgSizeCm: 180,
    avgWeightKg: 130,
    conservationStatus: "VU",
    speed: 40,
    camouflage: 45,
    resistance: 70,
    adaptability: 35,
    description:
      "Único oso nativo de Suramérica, reconocible por las manchas claras alrededor de sus ojos, únicas en cada individuo.",
    questions: [
      {
        prompt: "¿Qué hace único al oso de anteojos entre los osos del mundo?",
        options: [
          "Es el único oso nativo de Suramérica",
          "Es el oso más grande del mundo",
          "Vive exclusivamente en el Ártico",
          "No tiene pelaje",
        ],
        correctOptionIndex: 0,
        hint: "Piensa en qué continente es el único lugar donde existen osos silvestres de esta especie.",
      },
      {
        prompt: "¿Qué compone principalmente su dieta?",
        options: [
          "Frutas, bromelias y palmas",
          "Es un carnívoro estricto",
          "Solo pescado",
          "Únicamente insectos",
        ],
        correctOptionIndex: 0,
        hint: "A pesar de ser un oso, su dieta es mayoritariamente vegetal.",
      },
    ],
  },
  {
    commonName: "Manatí antillano",
    scientificName: "Trichechus manatus",
    group: "MAMIFEROS",
    habitat: "Ríos, estuarios y aguas costeras cálidas del Caribe",
    diet: "Plantas acuáticas",
    avgSizeCm: 300,
    avgWeightKg: 450,
    conservationStatus: "VU",
    speed: 30,
    camouflage: 20,
    resistance: 60,
    adaptability: 20,
    description:
      "Mamífero acuático herbívoro de movimientos lentos, amenazado por colisiones con embarcaciones y la pérdida de pastos marinos.",
    questions: [
      {
        prompt: "¿Qué come principalmente el manatí antillano?",
        options: [
          "Plantas acuáticas",
          "Peces pequeños",
          "Crustáceos",
          "Otros mamíferos marinos",
        ],
        correctOptionIndex: 0,
        hint: "A pesar de vivir en el agua, no es un cazador: es herbívoro.",
      },
      {
        prompt: "¿Cuál es una de las principales amenazas del manatí?",
        options: [
          "Colisiones con embarcaciones",
          "Depredación por águilas",
          "Falta de agua dulce",
          "Exceso de depredadores naturales",
        ],
        correctOptionIndex: 0,
        hint: "Es un animal lento que comparte el agua con lanchas y botes.",
      },
    ],
  },
  {
    commonName: "Danta de páramo",
    scientificName: "Tapirus pinchaque",
    group: "MAMIFEROS",
    habitat: "Bosques altoandinos y páramos",
    diet: "Hojas, ramas y frutos de plantas de páramo",
    avgSizeCm: 180,
    avgWeightKg: 200,
    conservationStatus: "EN",
    speed: 35,
    camouflage: 55,
    resistance: 60,
    adaptability: 15,
    description:
      "La danta más pequeña del mundo y la única adaptada a vivir en las alturas de los Andes; su pelaje grueso la protege del frío del páramo.",
    questions: [
      {
        prompt: "¿Qué la hace única entre las especies de danta?",
        options: [
          "Es la única adaptada a vivir en el páramo de alta montaña",
          "Es la danta más grande del mundo",
          "Vive exclusivamente en el desierto",
          "No tiene pelaje",
        ],
        correctOptionIndex: 0,
        hint: "Piensa en el tipo de ecosistema frío donde vive, distinto al de otras dantas de tierras bajas.",
      },
      {
        prompt: "¿Cuál es su estado de conservación?",
        options: [
          "En peligro",
          "Preocupación menor",
          "Extinta",
          "Casi amenazada",
        ],
        correctOptionIndex: 0,
        hint: "Su situación es grave, aunque no es la categoría más extrema.",
      },
    ],
  },
  {
    commonName: "Mono araña café",
    scientificName: "Ateles hybridus",
    group: "MAMIFEROS",
    habitat: "Bosques húmedos del norte de Colombia y Venezuela",
    diet: "Frutas maduras, hojas y semillas",
    avgSizeCm: 50,
    avgWeightKg: 9,
    conservationStatus: "CR",
    speed: 65,
    camouflage: 40,
    resistance: 30,
    adaptability: 15,
    description:
      "Uno de los primates más amenazados del mundo, fundamental como dispersor de semillas en los bosques donde habita.",
    questions: [
      {
        prompt: "¿Por qué es tan importante ecológicamente el mono araña café?",
        options: [
          "Es un dispersor clave de semillas en el bosque",
          "No cumple ningún papel ecológico",
          "Solo come una especie de planta",
          "Es un depredador tope",
        ],
        correctOptionIndex: 0,
        hint: "Piensa en qué pasa con las semillas de las frutas que come y transporta.",
      },
      {
        prompt: "¿Cuál es su estado de conservación?",
        options: [
          "En peligro crítico",
          "Preocupación menor",
          "Vulnerable",
          "Casi amenazado",
        ],
        correctOptionIndex: 0,
        hint: "Es una de las 25 especies de primates más amenazadas del mundo.",
      },
    ],
  },
  {
    commonName: "Tití cabeciblanco",
    scientificName: "Saguinus oedipus",
    group: "MAMIFEROS",
    habitat: "Bosques secos y húmedos del norte de Colombia (endémico)",
    diet: "Frutas, insectos y savia de árboles",
    avgSizeCm: 24,
    avgWeightKg: 0.43,
    conservationStatus: "CR",
    speed: 55,
    camouflage: 35,
    resistance: 25,
    adaptability: 20,
    description:
      "Primate endémico de Colombia reconocido por su llamativa cresta blanca; símbolo de conservación gracias al trabajo de comunidades locales y Proyecto Tití.",
    questions: [
      {
        prompt: "¿Qué rasgo distintivo tiene el tití cabeciblanco?",
        options: [
          "Una cresta blanca en la cabeza",
          "Un cuerno en la frente",
          "Alas membranosas",
          "Un caparazón duro",
        ],
        correctOptionIndex: 0,
        hint: "Su nombre común ya describe la parte de su cuerpo más llamativa.",
      },
      {
        prompt: "¿En qué país es endémico el tití cabeciblanco?",
        options: ["Colombia", "Brasil", "México", "Perú"],
        correctOptionIndex: 0,
        hint: "Solo existe en estado silvestre en el norte de un único país suramericano.",
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
