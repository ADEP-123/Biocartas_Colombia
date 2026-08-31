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
  /*Reptiles*/
  {
    commonName: "Iguana verde",
    scientificName: "Iguana iguana",
    group: "REPTILES",
    habitat: "Bosques tropicales, riberas de ríos y zonas costeras",
    diet: "Hojas, flores y frutos",
    avgSizeCm: 150,
    avgWeightKg: 4,
    conservationStatus: "LC",
    speed: 50,
    camouflage: 65,
    resistance: 45,
    adaptability: 80,
    description:
      "Uno de los reptiles más comunes y reconocibles de las tierras bajas colombianas; cambia de tono verde a más opaco según la temperatura y su estado de ánimo.",
    questions: [
      {
        prompt: "¿De qué se alimenta principalmente la iguana verde adulta?",
        options: [
          "Hojas, flores y frutos",
          "Otros reptiles",
          "Peces",
          "Solo insectos",
        ],
        correctOptionIndex: 0,
        hint: "A pesar de su aspecto feroz, es un animal herbívoro.",
      },
      {
        prompt: "¿Qué le puede hacer cambiar de tono a la iguana verde?",
        options: [
          "La temperatura y su estado de ánimo",
          "Solo la hora del día",
          "Nunca cambia de color",
          "El tipo de agua que bebe",
        ],
        correctOptionIndex: 0,
        hint: "Su piel reacciona a factores externos e internos, no es un color fijo.",
      },
    ],
  },
  {
    commonName: "Boa constrictor",
    scientificName: "Boa constrictor",
    group: "REPTILES",
    habitat: "Bosques tropicales, sabanas y zonas rurales",
    diet: "Roedores, aves y otros pequeños vertebrados",
    avgSizeCm: 250,
    avgWeightKg: 15,
    conservationStatus: "LC",
    speed: 35,
    camouflage: 75,
    resistance: 60,
    adaptability: 70,
    description:
      "Serpiente no venenosa que mata a sus presas por constricción, cortando la circulación en lugar de aplastar sus huesos.",
    questions: [
      {
        prompt: "¿Cómo caza sus presas la boa constrictor?",
        options: [
          "Las envuelve y corta su circulación",
          "Usa veneno mortal",
          "Las electrocuta",
          "Las atrapa con una tela pegajosa",
        ],
        correctOptionIndex: 0,
        hint: "Su nombre ya describe su técnica de caza.",
      },
      {
        prompt: "¿La boa constrictor es venenosa?",
        options: [
          "No, mata por constricción",
          "Sí, es altamente venenosa",
          "Solo es venenosa de joven",
          "Solo lo es en época de apareamiento",
        ],
        correctOptionIndex: 0,
        hint: "No necesita veneno porque usa la fuerza de su cuerpo.",
      },
    ],
  },
  {
    commonName: "Babilla",
    scientificName: "Caiman crocodilus",
    group: "REPTILES",
    habitat: "Ríos, ciénagas y humedales de tierras bajas",
    diet: "Peces, aves e invertebrados acuáticos",
    avgSizeCm: 200,
    avgWeightKg: 40,
    conservationStatus: "LC",
    speed: 45,
    camouflage: 60,
    resistance: 55,
    adaptability: 75,
    description:
      "El caimán más pequeño y abundante de Colombia; su nombre viene de la cresta ósea entre los ojos, parecida a unas gafas.",
    questions: [
      {
        prompt:
          "¿De dónde viene el nombre 'caimán de anteojos' que también recibe la babilla?",
        options: [
          "De una cresta ósea entre los ojos",
          "De que usa lentes reales",
          "De su color transparente",
          "De que vive cerca de ópticas",
        ],
        correctOptionIndex: 0,
        hint: "Fíjate en la parte de su cara entre los ojos.",
      },
      {
        prompt:
          "¿Qué caracteriza a la babilla frente a otros caimanes de Colombia?",
        options: [
          "Es el más pequeño y abundante",
          "Es el más grande del país",
          "Es el único venenoso",
          "Solo vive en el mar",
        ],
        correctOptionIndex: 0,
        hint: "A pesar de ser común, no es el de mayor tamaño.",
      },
    ],
  },
  {
    commonName: "Cascabel muda",
    scientificName: "Crotalus durissus",
    group: "REPTILES",
    habitat: "Sabanas secas y bosques abiertos",
    diet: "Roedores y pequeños mamíferos",
    avgSizeCm: 120,
    avgWeightKg: 1.5,
    conservationStatus: "LC",
    speed: 40,
    camouflage: 85,
    resistance: 50,
    adaptability: 55,
    description:
      "Serpiente venenosa reconocible por el cascabel en la punta de su cola, que agita como advertencia antes de atacar.",
    questions: [
      {
        prompt: "¿Para qué usa la cascabel el cascabel de su cola?",
        options: [
          "Como advertencia antes de atacar",
          "Para nadar más rápido",
          "Para atraer pareja únicamente",
          "Para cavar madrigueras",
        ],
        correctOptionIndex: 0,
        hint: "Es una señal de alerta, no una herramienta de caza.",
      },
      {
        prompt: "¿Qué tipo de serpiente es la cascabel muda?",
        options: [
          "Venenosa",
          "No venenosa, constrictora",
          "Sin dientes",
          "Acuática exclusivamente",
        ],
        correctOptionIndex: 0,
        hint: "A diferencia de la boa, esta especie sí inyecta veneno.",
      },
    ],
  },
  {
    commonName: "Tortuga terecay",
    scientificName: "Podocnemis unifilis",
    group: "REPTILES",
    habitat: "Ríos y caños de las cuencas del Orinoco y el Amazonas",
    diet: "Frutos, hojas y ocasionalmente pequeños invertebrados",
    avgSizeCm: 45,
    avgWeightKg: 8,
    conservationStatus: "VU",
    speed: 20,
    camouflage: 55,
    resistance: 40,
    adaptability: 30,
    description:
      "Tortuga de río muy apetecida por sus huevos, lo que ha reducido fuertemente sus poblaciones en varias cuencas de Colombia.",
    questions: [
      {
        prompt:
          "¿Cuál es una de las principales amenazas para la tortuga terecay?",
        options: [
          "La recolección de sus huevos",
          "La falta de agua en su hábitat",
          "La competencia con peces",
          "El exceso de vegetación acuática",
        ],
        correctOptionIndex: 0,
        hint: "Sus nidos en las playas de los ríos son muy buscados por las comunidades locales.",
      },
      {
        prompt: "¿En qué tipo de ecosistema vive principalmente?",
        options: [
          "Ríos y caños de tierras bajas",
          "Desiertos",
          "Páramos de alta montaña",
          "Cuevas subterráneas",
        ],
        correctOptionIndex: 0,
        hint: "Es una tortuga de agua dulce, no de zonas áridas o frías.",
      },
    ],
  },
  {
    commonName: "Tortuga caguama",
    scientificName: "Caretta caretta",
    group: "REPTILES",
    habitat: "Océanos abiertos y playas de anidación del Caribe",
    diet: "Moluscos, crustáceos y otros invertebrados marinos",
    avgSizeCm: 90,
    avgWeightKg: 135,
    conservationStatus: "VU",
    speed: 55,
    camouflage: 30,
    resistance: 65,
    adaptability: 25,
    description:
      "Tortuga marina de cabeza robusta y mandíbulas fuertes, adaptadas para triturar caparazones de crustáceos y moluscos.",
    questions: [
      {
        prompt:
          "¿Para qué están adaptadas las fuertes mandíbulas de la tortuga caguama?",
        options: [
          "Para triturar caparazones de moluscos y crustáceos",
          "Para masticar algas duras",
          "Para cazar aves",
          "Para cortar madera",
        ],
        correctOptionIndex: 0,
        hint: "Piensa en el tipo de presas de concha dura que come.",
      },
      {
        prompt: "¿Dónde pone sus huevos la tortuga caguama?",
        options: [
          "En playas de anidación",
          "En el fondo del mar",
          "En nidos de árboles",
          "No pone huevos, es vivípara",
        ],
        correctOptionIndex: 0,
        hint: "Aunque vive en el mar, sale a tierra para un momento clave de su ciclo de vida.",
      },
    ],
  },
  {
    commonName: "Caimán llanero",
    scientificName: "Crocodylus intermedius",
    group: "REPTILES",
    habitat: "Ríos de la cuenca del Orinoco, en los Llanos colombianos",
    diet: "Peces, y en su etapa adulta, mamíferos grandes",
    avgSizeCm: 400,
    avgWeightKg: 380,
    conservationStatus: "CR",
    speed: 40,
    camouflage: 45,
    resistance: 55,
    adaptability: 10,
    description:
      "Uno de los cocodrilos más amenazados del planeta, reducido a unas pocas poblaciones tras décadas de caza para el comercio de pieles.",
    questions: [
      {
        prompt:
          "¿Qué causó la drástica disminución del caimán llanero en el siglo XX?",
        options: [
          "La caza para el comercio de pieles",
          "Un virus exclusivo de la especie",
          "La llegada de una nueva especie de pez",
          "El cambio en la dirección del río Orinoco",
        ],
        correctOptionIndex: 0,
        hint: "Su piel fue muy valorada comercialmente durante décadas.",
      },
      {
        prompt: "¿En qué cuenca hidrográfica vive el caimán llanero?",
        options: [
          "La cuenca del Orinoco",
          "La cuenca del Amazonas",
          "La cuenca del Magdalena",
          "No vive en cuencas de río, solo en el mar",
        ],
        correctOptionIndex: 0,
        hint: "Su nombre común hace referencia a la región de los Llanos.",
      },
    ],
  },
  {
    commonName: "Tortuga del Magdalena",
    scientificName: "Podocnemis lewyana",
    group: "REPTILES",
    habitat: "Ríos de la cuenca del Magdalena, endémica de Colombia",
    diet: "Frutos, semillas y pequeños invertebrados",
    avgSizeCm: 40,
    avgWeightKg: 6,
    conservationStatus: "CR",
    speed: 20,
    camouflage: 50,
    resistance: 35,
    adaptability: 15,
    description:
      "Tortuga endémica de Colombia que solo existe en el río Magdalena y sus afluentes; su población ha caído fuertemente por la caza y la degradación del río.",
    questions: [
      {
        prompt: "¿Dónde se encuentra exclusivamente la tortuga del Magdalena?",
        options: [
          "En el río Magdalena y sus afluentes, en Colombia",
          "En cualquier río de Suramérica",
          "En lagos de alta montaña",
          "En el océano Pacífico",
        ],
        correctOptionIndex: 0,
        hint: "Su nombre común ya indica el único río donde vive.",
      },
      {
        prompt: "¿Cuál es su estado de conservación?",
        options: [
          "En peligro crítico",
          "Preocupación menor",
          "Vulnerable",
          "Casi amenazada",
        ],
        correctOptionIndex: 0,
        hint: "Es una de las tortugas de río más amenazadas de Colombia.",
      },
    ],
  },
  {
    commonName: "Tortuga carey",
    scientificName: "Eretmochelys imbricata",
    group: "REPTILES",
    habitat: "Arrecifes de coral y aguas costeras tropicales",
    diet: "Esponjas marinas",
    avgSizeCm: 90,
    avgWeightKg: 80,
    conservationStatus: "CR",
    speed: 50,
    camouflage: 60,
    resistance: 45,
    adaptability: 10,
    description:
      "Tortuga marina cuyo caparazón fue históricamente muy explotado para joyería, lo que la llevó a ser una de las tortugas más amenazadas del planeta.",
    questions: [
      {
        prompt: "¿Por qué fue tan cazada históricamente la tortuga carey?",
        options: [
          "Por su caparazón, usado en joyería",
          "Por su carne, considerada una delicadeza única",
          "Por sus huevos exclusivamente",
          "Porque se creía que traía mala suerte",
        ],
        correctOptionIndex: 0,
        hint: "Su material más codiciado no era la carne, sino su cubierta externa.",
      },
      {
        prompt: "¿De qué se alimenta principalmente la tortuga carey?",
        options: [
          "Esponjas marinas",
          "Solo algas",
          "Peces grandes",
          "Aves marinas",
        ],
        correctOptionIndex: 0,
        hint: "Es una de las pocas especies capaces de comer presas tóxicas para otros animales.",
      },
    ],
  },
  {
    commonName: "Tortuga verde",
    scientificName: "Chelonia mydas",
    group: "REPTILES",
    habitat: "Praderas marinas y arrecifes de zonas tropicales",
    diet: "Pastos marinos y algas en su etapa adulta",
    avgSizeCm: 110,
    avgWeightKg: 160,
    conservationStatus: "EN",
    speed: 55,
    camouflage: 40,
    resistance: 60,
    adaptability: 25,
    description:
      "Una de las pocas tortugas marinas herbívoras en su etapa adulta; su nombre viene del color verdoso de su grasa, no de su caparazón.",
    questions: [
      {
        prompt: "¿De dónde viene el nombre 'tortuga verde'?",
        options: [
          "Del color verdoso de su grasa interna",
          "Del color de su caparazón",
          "De que solo come plantas verdes",
          "De la región donde fue descubierta",
        ],
        correctOptionIndex: 0,
        hint: "No es el caparazón lo que le da el nombre.",
      },
      {
        prompt: "¿Cuál es su estado de conservación según la UICN?",
        options: [
          "En peligro",
          "Preocupación menor",
          "En peligro crítico",
          "Extinta en el medio silvestre",
        ],
        correctOptionIndex: 0,
        hint: "Está en una categoría grave, pero no es la más extrema de todas.",
      },
    ],
  },
  /*Anfibios*/
  {
    commonName: "Sapo común",
    scientificName: "Rhinella marina",
    group: "ANFIBIOS",
    habitat: "Zonas urbanas, jardines, bosques secos y áreas rurales",
    diet: "Insectos, pequeños roedores y otros invertebrados",
    avgSizeCm: 15,
    avgWeightKg: 0.5,
    conservationStatus: "LC",
    speed: 20,
    camouflage: 60,
    resistance: 70,
    adaptability: 95,
    description:
      "Uno de los sapos más comunes y adaptables de América, capaz de sobrevivir en casi cualquier ambiente; su piel segrega una toxina que lo protege de muchos depredadores.",
    questions: [
      {
        prompt: "¿Qué protege al sapo común de muchos depredadores?",
        options: [
          "Una toxina que segrega su piel",
          "Un caparazón duro",
          "Su capacidad de volar",
          "Veneno inyectado por mordida",
        ],
        correctOptionIndex: 0,
        hint: "No lo inyecta como una serpiente: la libera a través de la piel.",
      },
      {
        prompt:
          "¿Por qué el sapo común es tan exitoso en tantos ambientes distintos?",
        options: [
          "Es muy adaptable y tolera diversos hábitats",
          "Solo puede vivir en un tipo de bosque",
          "Depende de un único tipo de presa",
          "No puede sobrevivir cerca de humanos",
        ],
        correctOptionIndex: 0,
        hint: "Se le encuentra desde selvas hasta patios de casas.",
      },
    ],
  },
  {
    commonName: "Rana túngara",
    scientificName: "Engystomops pustulosus",
    group: "ANFIBIOS",
    habitat: "Charcos temporales, potreros y zonas húmedas bajas",
    diet: "Insectos pequeños",
    avgSizeCm: 3,
    avgWeightKg: 0.003,
    conservationStatus: "LC",
    speed: 25,
    camouflage: 65,
    resistance: 30,
    adaptability: 75,
    description:
      "Pequeña rana conocida por su llamado nasal característico y por construir un nido de espuma flotante para proteger sus huevos.",
    questions: [
      {
        prompt: "¿Cómo protege sus huevos la rana túngara?",
        options: [
          "Construyendo un nido de espuma flotante",
          "Enterrándolos bajo tierra",
          "Cargándolos en la espalda",
          "Escondiéndolos en cuevas",
        ],
        correctOptionIndex: 0,
        hint: "El macho bate una sustancia con las patas hasta formar burbujas.",
      },
      {
        prompt: "¿Qué caracteriza su llamado de apareamiento?",
        options: [
          "Es un sonido nasal muy distintivo",
          "Es completamente silencioso",
          "Suena como el canto de un ave",
          "Solo canta bajo el agua",
        ],
        correctOptionIndex: 0,
        hint: "Su nombre común imita el sonido que produce.",
      },
    ],
  },
  {
    commonName: "Rana de rayas amarillas",
    scientificName: "Dendrobates truncatus",
    group: "ANFIBIOS",
    habitat:
      "Bosques secos y húmedos de las cuencas del Magdalena y el Sinú (endémica de Colombia)",
    diet: "Hormigas, ácaros y pequeños insectos",
    avgSizeCm: 3,
    avgWeightKg: 0.002,
    conservationStatus: "LC",
    speed: 40,
    camouflage: 30,
    resistance: 25,
    adaptability: 45,
    description:
      "Rana venenosa endémica de Colombia, reconocible por sus llamativas franjas amarillas sobre fondo negro, una advertencia visual para sus depredadores.",
    questions: [
      {
        prompt: "¿Qué función cumple la coloración llamativa de esta rana?",
        options: [
          "Advertir a los depredadores que es tóxica",
          "Ayudarla a camuflarse totalmente",
          "Atraer solo a sus presas",
          "No cumple ninguna función",
        ],
        correctOptionIndex: 0,
        hint: "Es una advertencia visual, no un camuflaje.",
      },
      {
        prompt: "¿De qué se alimenta principalmente?",
        options: [
          "Hormigas y pequeños insectos",
          "Peces",
          "Frutas exclusivamente",
          "Otras ranas",
        ],
        correctOptionIndex: 0,
        hint: "Su dieta de hormigas específicas es clave para producir sus toxinas.",
      },
    ],
  },
  {
    commonName: "Rana de cristal verrugosa",
    scientificName: "Centrolene heloderma",
    group: "ANFIBIOS",
    habitat: "Bosques andinos húmedos cerca de quebradas",
    diet: "Insectos pequeños",
    avgSizeCm: 3,
    avgWeightKg: 0.003,
    conservationStatus: "VU",
    speed: 30,
    camouflage: 90,
    resistance: 20,
    adaptability: 15,
    description:
      "Rana de piel transparente en el vientre que deja ver sus órganos internos, incluyendo el corazón latiendo; vive siempre cerca de quebradas de aguas limpias.",
    questions: [
      {
        prompt:
          "¿Qué característica única tiene la piel del vientre de esta rana?",
        options: [
          "Es transparente y deja ver sus órganos internos",
          "Es completamente opaca",
          "Cambia de color cada hora",
          "Es impermeable al agua",
        ],
        correctOptionIndex: 0,
        hint: "Por esto a esta familia de ranas se le llama 'ranas de cristal'.",
      },
      {
        prompt: "¿De qué depende principalmente esta especie para sobrevivir?",
        options: [
          "Quebradas de aguas limpias y bosque conservado",
          "Zonas urbanas contaminadas",
          "Desiertos áridos",
          "Aguas saladas del mar",
        ],
        correctOptionIndex: 0,
        hint: "Es muy sensible a la contaminación y la deforestación.",
      },
    ],
  },
  {
    commonName: "Rana venenosa de Virolín",
    scientificName: "Andinobates virolinensis",
    group: "ANFIBIOS",
    habitat: "Bosques húmedos de montaña en Santander (endémica de Colombia)",
    diet: "Hormigas y ácaros pequeños",
    avgSizeCm: 2,
    avgWeightKg: 0.001,
    conservationStatus: "VU",
    speed: 35,
    camouflage: 35,
    resistance: 20,
    adaptability: 15,
    description:
      "Diminuta rana venenosa que solo se encuentra en un área muy reducida de los bosques de Santander, lo que la hace especialmente vulnerable a la pérdida de hábitat.",
    questions: [
      {
        prompt:
          "¿Por qué esta especie es especialmente vulnerable a la deforestación?",
        options: [
          "Porque solo vive en un área muy reducida",
          "Porque puede volar largas distancias",
          "Porque migra entre continentes",
          "Porque vive en el fondo del océano",
        ],
        correctOptionIndex: 0,
        hint: "Su distribución geográfica es extremadamente pequeña.",
      },
      {
        prompt: "¿En qué departamento de Colombia es endémica?",
        options: ["Santander", "Amazonas", "La Guajira", "Chocó"],
        correctOptionIndex: 0,
        hint: "Su nombre común hace referencia a una localidad de ese departamento.",
      },
    ],
  },
  {
    commonName: "Rana dorada venenosa",
    scientificName: "Phyllobates terribilis",
    group: "ANFIBIOS",
    habitat: "Selvas húmedas tropicales del Pacífico colombiano (Chocó)",
    diet: "Hormigas, termitas y pequeños insectos",
    avgSizeCm: 5,
    avgWeightKg: 0.03,
    conservationStatus: "EN",
    speed: 30,
    camouflage: 10,
    resistance: 15,
    adaptability: 10,
    description:
      "Considerada el animal más venenoso del planeta; su piel contiene suficiente toxina para poner en riesgo a varios seres humanos adultos con solo tocarla.",
    questions: [
      {
        prompt:
          "¿Por qué es considerada uno de los animales más peligrosos del mundo por su veneno?",
        options: [
          "Su piel contiene una toxina extremadamente potente",
          "Tiene mordida venenosa como una serpiente",
          "Ataca activamente a los humanos",
          "Es venenosa solo si se ingiere cocinada",
        ],
        correctOptionIndex: 0,
        hint: "No pica ni muerde: basta con tocar su piel.",
      },
      {
        prompt: "¿Dónde se encuentra esta especie en estado silvestre?",
        options: [
          "Selvas húmedas del Pacífico colombiano",
          "Desiertos de La Guajira",
          "Páramos andinos",
          "Selvas de Asia",
        ],
        correctOptionIndex: 0,
        hint: "Es endémica de una región específica de Colombia con clima muy húmedo.",
      },
    ],
  },
  {
    commonName: "Rana venenosa bicolor",
    scientificName: "Phyllobates bicolor",
    group: "ANFIBIOS",
    habitat: "Bosques bajos del Chocó, cerca del río San Juan",
    diet: "Hormigas y otros pequeños insectos",
    avgSizeCm: 4.5,
    avgWeightKg: 0.025,
    conservationStatus: "EN",
    speed: 30,
    camouflage: 15,
    resistance: 15,
    adaptability: 10,
    description:
      "Segunda especie de rana más tóxica del mundo, a menudo confundida con la rana dorada venenosa por su apariencia similar.",
    questions: [
      {
        prompt:
          "¿Con qué otra especie se confunde frecuentemente la rana venenosa bicolor?",
        options: [
          "Con la rana dorada venenosa",
          "Con el sapo común",
          "Con la iguana verde",
          "Con la tortuga carey",
        ],
        correctOptionIndex: 0,
        hint: "Ambas pertenecen al mismo género y se parecen mucho físicamente.",
      },
      {
        prompt:
          "¿Qué lugar ocupa en la escala de toxicidad entre las ranas venenosas?",
        options: [
          "Es la segunda más tóxica del mundo",
          "Es la menos tóxica de todas",
          "No es tóxica en absoluto",
          "Es la única especie sin depredadores",
        ],
        correctOptionIndex: 0,
        hint: "Solo una especie del mismo género la supera en toxicidad.",
      },
    ],
  },
  {
    commonName: "Rana arlequín de Santa Marta",
    scientificName: "Atelopus laetissimus",
    group: "ANFIBIOS",
    habitat: "Bosques húmedos de la Sierra Nevada de Santa Marta (endémica)",
    diet: "Pequeños invertebrados",
    avgSizeCm: 4,
    avgWeightKg: 0.01,
    conservationStatus: "CR",
    speed: 15,
    camouflage: 55,
    resistance: 10,
    adaptability: 5,
    description:
      "Especie que se creía extinta por más de una década debido a un hongo letal, hasta que fue redescubierta con una población aparentemente saludable en una reserva natural.",
    questions: [
      {
        prompt: "¿Qué pasó con esta especie antes de ser redescubierta?",
        options: [
          "Se creía extinta por más de una década",
          "Nunca había sido estudiada",
          "Se pensaba que era muy abundante",
          "Fue introducida recientemente desde otro país",
        ],
        correctOptionIndex: 0,
        hint: "Pasó muchos años sin registros hasta que se le volvió a encontrar.",
      },
      {
        prompt:
          "¿Cuál es la principal amenaza que afecta a las ranas arlequín como esta?",
        options: [
          "Un hongo letal para su piel",
          "La caza para consumo humano",
          "La competencia con aves",
          "El exceso de humedad en su hábitat",
        ],
        correctOptionIndex: 0,
        hint: "Es una enfermedad microscópica que ha diezmado ranas arlequín en toda América.",
      },
    ],
  },
  {
    commonName: "Rana arlequín de Ruiz",
    scientificName: "Atelopus petriruizi",
    group: "ANFIBIOS",
    habitat: "Bosques montanos húmedos y ríos de Colombia (endémica)",
    diet: "Pequeños invertebrados",
    avgSizeCm: 3.5,
    avgWeightKg: 0.008,
    conservationStatus: "CR",
    speed: 15,
    camouflage: 50,
    resistance: 10,
    adaptability: 5,
    description:
      "Rana arlequín endémica de Colombia, gravemente amenazada por la pérdida de su hábitat natural en los bosques montanos.",
    questions: [
      {
        prompt: "¿Qué tipo de hábitat necesita esta rana para sobrevivir?",
        options: [
          "Bosques montanos húmedos cerca de ríos",
          "Desiertos secos",
          "Praderas de baja altitud",
          "Manglares costeros",
        ],
        correctOptionIndex: 0,
        hint: "Es una especie de montaña, no de tierras bajas.",
      },
      {
        prompt: "¿Cuál es su estado de conservación?",
        options: [
          "En peligro crítico",
          "Preocupación menor",
          "Vulnerable",
          "Casi amenazada",
        ],
        correctOptionIndex: 0,
        hint: "Al igual que muchas ranas arlequín de Colombia, está en la categoría más grave.",
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
