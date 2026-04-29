// Fuente única de verdad: contenido y assets de Casa Pérez Multiespacio.
// Centralizado para que las secciones queden declarativas.

export const BRAND = {
  name: "Casa Pérez",
  tag: "Multiespacio",
  city: "City Bell · La Plata",
  tagline: "Olvidate de todo. Te ayudamos a festejar lo que vos quieras.",
  about:
    "Tres espacios, un mismo concepto: descontracturado, cálido, sin protocolos rígidos. Cada evento se piensa como único e irrepetible.",
};

export const CONTACT = {
  phone: "221 5742167",
  phoneTel: "+542215742167",
  whatsapp: "https://api.whatsapp.com/send?phone=5492215742167&text=Hola%20Casa%20Perez!",
  email: "contacto@casaperez.com.ar",
  hours: "Lunes a viernes · 17 a 20 hs",
  instagram: "https://www.instagram.com/casaperezmultiespacio",
  facebook: "https://www.facebook.com/casaperezmultiespacio",
  addresses: [
    {
      label: "Casa Pérez Centenario",
      line: "Camino Centenario #7019 e/ 461f y 462",
      city: "City Bell · La Plata",
    },
    {
      label: "Casa Pérez 467",
      line: "Calle 467 (ex 11) #1309 e/ 19 y 21",
      city: "City Bell · La Plata",
    },
  ],
};

// Slider home — fotos hero del sitio original, descargadas a /public/gallery
export const HERO_IMAGES = [80, 57, 67, 50, 66, 69, 71, 62, 59].map(
  (id) => `/gallery/${id}/big0000.jpg`
);

// 4 pilares de marca (los del sitio original, parafraseados)
export const PILARES = [
  {
    n: "01",
    titulo: "Equipo",
    txt: "Un grupo de profesionales en cada rubro, trabajando en conjunto para que cada detalle del evento esté pensado.",
  },
  {
    n: "02",
    titulo: "Estilo",
    txt: "Descontracturado, cálido y sin protocolo rígido. La fiesta es tuya; nosotros sabemos sostenerla.",
  },
  {
    n: "03",
    titulo: "Confianza",
    txt: "Más de dos décadas organizando festejos en La Plata. Las familias vuelven y eso ya dice todo.",
  },
  {
    n: "04",
    titulo: "Capital humano",
    txt: "Mozos, cocina, sonido, ambientación: equipo propio, formado en la casa, con la misma vara.",
  },
];

// 3 espacios físicos. `gallery` = fotos para la experiencia scroll-expansion
// (la primera funciona como hero / cover full-bleed, las otras como floats)
export const ESPACIOS = [
  {
    id: "centenario",
    nombre: "Casa Pérez Centenario",
    img: "/salones/centenario/foto-01.jpg",
    fallback: "/salones/centenario/foto-01.jpg",
    gallery: [
      "/salones/centenario/foto-01.jpg",
      "/salones/centenario/foto-02.jpg",
      "/salones/centenario/foto-03.jpg",
      "/salones/centenario/foto-04.jpg",
      "/salones/centenario/foto-05.jpg",
      "/salones/centenario/foto-06.jpg",
      "/salones/centenario/foto-07.jpg",
      "/salones/centenario/foto-08.jpg",
    ],
    metros: "1100 m² cubiertos",
    aire: "Patios y semicubiertos",
    capacidad: "hasta 400 invitados",
    bullets: [
      "Pistas de baile con sonido e iluminación profesionales",
      "Pantalla 150″ y proyector HD",
      "Aire libre y espacios semicubiertos",
    ],
  },
  {
    id: "casona",
    nombre: "Casona Pérez",
    img: "/salones/casona/foto-01.jpg",
    fallback: "/salones/casona/foto-01.jpg",
    gallery: [
      "/salones/casona/foto-01.jpg",
      "/salones/casona/foto-02.jpg",
      "/salones/casona/foto-03.jpg",
      "/salones/casona/foto-04.jpg",
      "/salones/casona/foto-05.jpg",
      "/salones/casona/foto-06.jpg",
      "/salones/casona/foto-07.jpg",
      "/salones/casona/foto-08.jpg",
    ],
    metros: "Salón íntimo",
    aire: "Parque y patio interno",
    capacidad: "hasta 120 invitados",
    bullets: [
      "Pensado para reuniones más íntimas",
      "Misma cocina, mismo equipo",
      "Patio para ceremonia o cóctel de bienvenida",
    ],
  },
  {
    id: "467",
    nombre: "Casa Pérez 467",
    img: "/salones/salon467/foto-01.jpg",
    fallback: "/salones/salon467/foto-01.jpg",
    gallery: [
      "/salones/salon467/foto-01.jpg",
      "/salones/salon467/foto-02.jpg",
      "/salones/salon467/foto-03.jpg",
      "/salones/salon467/foto-04.jpg",
      "/salones/salon467/foto-05.jpg",
      "/salones/salon467/foto-06.jpg",
      "/salones/salon467/foto-07.jpg",
      "/salones/salon467/foto-08.jpg",
    ],
    metros: "2000 m² de parque",
    aire: "Aire libre completo",
    capacidad: "hasta 350 invitados",
    bullets: [
      "Circuito de juegos para los chicos",
      "Espacios semicubiertos amplios",
      "Ideal para infantiles y eventos al aire libre",
    ],
  },
];

// Servicios extra (más allá del salón)
export const SERVICIOS = [
  {
    id: "catering",
    titulo: "Catering",
    bajada:
      "Cocina propia de 100 m², equipo profesional. Bandejeo, islas temáticas y propuestas a medida.",
    img: "/catering/1/big0000.jpg",
  },
  {
    id: "dj",
    titulo: "DJ, sonido e iluminación",
    bajada:
      "DJs propios, distintos estilos, todos capaces de leer la pista. La música hace o rompe la fiesta.",
    img: "/servicios/dj.png",
  },
  {
    id: "ambientacion",
    titulo: "Ambientación & deco",
    bajada:
      "Detalles que hacen la diferencia: paleta, mesa, luces, rincones. Cada evento tiene su escena.",
    img: "/servicios/deco.png",
  },
  {
    id: "beauty",
    titulo: "Maquillaje & peinado",
    bajada:
      "Para quinceañeras, novias o quien quiera llegar al evento listo. Trabajamos con artistas de confianza.",
    img: "/servicios/maquillaje.png",
  },
  {
    id: "fotografia",
    titulo: "Fotografía",
    bajada:
      "Cubrimos cada momento del festejo. Fotógrafos que se mueven con la fiesta y devuelven el recuerdo intacto.",
    img: "/servicios/fotografia.png",
  },
  {
    id: "asesoramiento",
    titulo: "Asesoramiento integral",
    bajada:
      "Te acompañamos desde la primera reunión hasta el último brindis. Nuestra experiencia, tu fiesta.",
    img: "/gallery/71/big0000.jpg",
  },
];

// Catering: 3 opciones con menús estructurados por subsecciones.
// Texto y fotos provienen de la web oficial de Casa Pérez (es contenido del cliente).
type MenuSection = { titulo: string; items: string[] };

export const CATERING_OPCIONES: {
  id: string;
  numero: string;
  nombre: string;
  fotos: string[];
  menu: MenuSection[];
}[] = [
  {
    id: "op1",
    numero: "01",
    nombre: "Opción #1",
    fotos: [
      "/catering-real/1/foto-01.jpg",
      "/catering-real/1/foto-02.jpg",
      "/catering-real/1/foto-03.jpg",
      "/catering-real/1/foto-04.jpg",
      "/catering-real/1/foto-05.jpg",
      "/catering-real/1/foto-06.jpg",
      "/catering-real/1/foto-07.jpg",
      "/catering-real/1/foto-08.jpg",
    ],
    menu: [
      {
        titulo: "Recepción de bienvenida",
        items: [
          "Brusquetas de hummus y garbanzo frito",
          "Brusquetas de hierbas y criolla",
          "Brusquetas de mousse de hierbas y salmón ahumado",
          "Tarteletas de tapenade de aceitunas y alcaparras",
          "Tarteletas de roquefort, peras y nuez",
          "Tarteletas de atún",
          "Tarteletas de mousse de salmón",
        ],
      },
      {
        titulo: "Isla campestre",
        items: [
          "Variedad de fiambres premium: quesos (azul, fontina, pategras, gouda), jamón crudo, lomito horneado, bondiola, longaniza, cantimpalo, mortadela",
          "Variedad de panes artesanales: baguette blanca, cremona casera, bizcochitos, focaccia",
          "Acompañamientos: queso brie y miel, dip de hummus y de queso crema con frutos secos",
        ],
      },
      {
        titulo: "Bandejeo",
        items: [
          "Arancini de hongos",
          "Falafel con salsa de yogurt",
          "Albóndigas con salsa filetto",
          "Ensalada caesar",
          "Ensalada caprese",
          "Shots de langostinos rebozados con salsa cítrica",
          "Shots tartar de trucha",
        ],
      },
      {
        titulo: "Principal",
        items: [
          "Sándwich de bondiola braseada",
          "Sándwich de pechuguita de pollo y morrones tricolor",
          "Sándwich de ragout de hongos",
          "Acompañado con papas fritas",
        ],
      },
      {
        titulo: "Postre",
        items: ["Variedad de postres en shots: mousse de chocolate, Oreo, Chocotorta, Trifle de dulce de leche"],
      },
      {
        titulo: "Fin de fiesta",
        items: ["Pizzetas individuales caseras"],
      },
    ],
  },
  {
    id: "op2",
    numero: "02",
    nombre: "Opción #2",
    fotos: [
      "/catering-real/2/foto-01.jpg",
      "/catering-real/2/foto-02.jpg",
      "/catering-real/2/foto-03.jpg",
      "/catering-real/2/foto-04.jpg",
      "/catering-real/2/foto-05.jpg",
      "/catering-real/2/foto-06.jpg",
      "/catering-real/2/foto-07.jpg",
      "/catering-real/2/foto-08.jpg",
    ],
    menu: [
      {
        titulo: "Recepción de bienvenida",
        items: [
          "Brusquetas de hummus y garbanzo frito",
          "Brusquetas de hierbas y criolla",
          "Brusquetas de mousse de hierbas y salmón ahumado",
          "Tarteletas de tapenade de aceitunas y alcaparras",
          "Tarteletas de roquefort, peras y nuez",
          "Tarteletas de atún",
          "Tarteletas de mousse de salmón",
        ],
      },
      {
        titulo: "Bandejeo",
        items: [
          "Sándwich de atún en pan saborizado",
          "Sándwich de jamón crudo y rúcula",
          "Sándwich vegetariano (queso, tomate, pesto)",
          "Wrap caesar",
          "Wrap coleslow",
          "Wrap de ternera braseada",
          "Falafel con salsa de yogurt",
          "Tortilla de papa con alioli",
          "Shots de langostinos con salsa cítrica",
          "Empanada de bondiola braseada y queso",
          "Empanada de ragout de hongos y queso",
          "Empanada de cebolla y queso",
        ],
      },
      {
        titulo: "Principal",
        items: [
          "Cazuela de ragout de ternera",
          "Cazuela de pollo (blanco de ave y puerro, salsa crema)",
          "Cazuela de ñoquis caseros con salsa rosa",
        ],
      },
      {
        titulo: "Postre",
        items: ["Variedad de postres en shots premium: Franuí, Oreo, texturas de dulce de leche, cheesecake tropical (mango y maracuyá)"],
      },
      {
        titulo: "Mesa dulce clásica",
        items: [
          "Petit fours: Lemon pie, Brownie torta, Tarta de frutilla, Mini rogel, Tarta tofi, Crumble de manzana, Tarta de coco y dulce de leche, Red velvet, Carrot cake, Tarta mantecol",
        ],
      },
      {
        titulo: "Fin de fiesta",
        items: ["Pizzetas individuales caseras"],
      },
    ],
  },
  {
    id: "op3",
    numero: "03",
    nombre: "Opción #3",
    fotos: [
      "/catering-real/3/foto-01.jpg",
      "/catering-real/3/foto-02.jpg",
      "/catering-real/3/foto-03.jpg",
      "/catering-real/3/foto-04.jpg",
    ],
    menu: [
      {
        titulo: "Recepción de bienvenida",
        items: [
          "Brusquetas de hummus y garbanzo frito",
          "Brusquetas de hierbas y criolla",
          "Brusquetas de mousse de hierbas y salmón ahumado",
          "Tarteletas de tapenade de aceitunas y alcaparras",
          "Tarteletas de roquefort, peras y nuez",
          "Tarteletas de atún",
          "Tarteletas de mousse de salmón",
        ],
      },
      {
        titulo: "Islas / Bandejeo",
        items: [
          "Barra criolla: mini choripán, riñoncitos a la provenzal, mollejitas al verdeo, empanadas de carne cortada a cuchillo, mini brochete de lomo y pollo",
          "Barra de mar: shots de ceviche, rabas, salmón ahumado, risotto de mariscos, sushi",
          "Barra campestre: tablas de quesos y fiambres, panes caseros, dips, ensaladas en shots, conservas",
        ],
      },
      {
        titulo: "Principal",
        items: [
          "Sándwich de lomo, salsa criolla y pan de manteca",
          "Sándwich de pollo, cebolla caramelizada y queso cheddar en pan de semillas",
        ],
      },
      {
        titulo: "Postre",
        items: ["Variedad de postres en shots premium: Franuí, Oreo, texturas de dulce de leche, cheesecake tropical (mango y maracuyá)"],
      },
      {
        titulo: "Mesa dulce premium",
        items: [
          "Trufas de chocolate con leche y almendras caramelizadas",
          "Trufas dúo de chocolate y maní",
          "Blondies con frutos rojos y ganache montada",
          "Pavlova con crema y frutas frescas",
          "Lingotes de limón",
          "Marquisse de chocolate",
          "Parfait de whisky y avellanas caramelizadas",
          "Texturas de chocolate",
          "Cheesecake de nutella, avellanas y chocolate",
          "Macarons",
          "Torta argentina",
        ],
      },
      {
        titulo: "Fin de fiesta",
        items: ["Pizzetas individuales caseras"],
      },
    ],
  },
];

export const BARRA_OPCIONES: {
  id: string;
  nombre: string;
  bajada: string;
  foto: string;
  acento: "lime" | "magenta";
  bloques: MenuSection[];
}[] = [
  {
    id: "clasica",
    nombre: "Barra Clásica",
    bajada: "Las bebidas que no pueden faltar, los tragos clásicos y 6 tragos de autor de la casa.",
    foto: "/gallery/67/big0000.jpg",
    acento: "lime",
    bloques: [
      {
        titulo: "Barras equipadas",
        items: [
          "Línea Coca-Cola completa y agua mineral",
          "Limonada casera",
          "Jugo de naranja",
          "Licuados sin alcohol (cumpleaños de 15)",
          "Cerveza artesanal tirada San Sebastián",
          "Vino tinto y blanco — Secuencias / Finca Abril",
        ],
      },
      {
        titulo: "Tragos clásicos",
        items: [
          "Fernet con Coca-Cola",
          "Campari con jugo de naranja · Campari Tonic",
          "Cuba Libre · Ron Cola",
          "Gin Tonic · Gin con pomelo y Cynar",
          "Vodka con jugo de naranja · Vodka con Sprite y limón",
          "Aperol · Cynar · Cinzano Rosso",
        ],
      },
      {
        titulo: "6 tragos de autor",
        items: [
          "HONORIO — Cynar, Aperol, gaseosa pomelo y piel de pomelo",
          "WALTER — Cynar, gaseosa pomelo y rodaja de naranja",
          "JAIME — Aperol, tónica y rodaja de naranja",
          "ANGÉLICA — Gin, tónica y slide de pepino",
          "DANI HERRERO — Rosso, tónica y rodaja de pomelo",
          "NEGRONI — Gin, Campari y Rosso",
        ],
      },
      {
        titulo: "Marcas",
        items: ["Fernet Branca · Ron Bacardi · Vodka Sky · Gin Gordon"],
      },
    ],
  },
  {
    id: "premium",
    nombre: "Barra Premium",
    bajada: "Suma a la clásica: tragos extra, cervezas y vinos premium, opciones de champagne.",
    foto: "/gallery/59/big0000.jpg",
    acento: "magenta",
    bloques: [
      {
        titulo: "Tragos premium",
        items: [
          "GIN con tónica y frutos rojos",
          "GIN con tónica y maracuyá",
          "MOJITO — ron, almíbar simple, jugo de limón, soda y menta",
          "CAIPIS — cachaça/vodka, azúcar, lima",
          "CYNAR JULEP — Cynar, almíbar, jugo de limón, jugo de pomelo y menta",
        ],
      },
      {
        titulo: "Cervezas",
        items: [
          "Stella Artois · Coronas · latas Patagonia",
          "Cerveza sin alcohol",
        ],
      },
      {
        titulo: "Vinos (a elección)",
        items: [
          "Tinto: Terra Reserva (Malbec / Cabernet / Red Blend) · Rapsodia Reserva (Malbec / Red Blend)",
          "Blanco: Terra Reserva — Torrontés",
        ],
      },
      {
        titulo: "Champagne (3 opciones)",
        items: [
          "Murville (solo brindis o todo el evento)",
          "Perdices Extra Brut (solo brindis o todo el evento)",
          "Salentein Extra Brut (solo brindis o todo el evento)",
        ],
      },
    ],
  },
];

// Testimonios — para sección de social proof (3 columnas auto-scroll).
// Familias reales, parafraseados a partir del feedback histórico de la casa.
export const TESTIMONIOS = [
  {
    nombre: "Florencia & Tomás",
    evento: "Casamiento · 180 invitados",
    txt: "Nos casamos el año pasado en Centenario y todavía nos escriben los amigos diciendo que fue la mejor fiesta a la que fueron. El equipo te hace sentir que estás en tu casa.",
  },
  {
    nombre: "Familia Albornoz",
    evento: "15 años · 120 invitados",
    txt: "Mi hija quería algo diferente, sin protocolo. Casa Pérez nos escuchó desde el primer día. La cocina, el DJ, la deco — todo en su lugar.",
  },
  {
    nombre: "Mateo P.",
    evento: "Cumpleaños 40",
    txt: "Buscaba un lugar para no preocuparme por nada. Lo conseguí. Llegué, abracé a la gente y festejamos hasta las 6.",
  },
  {
    nombre: "Camila & Joaquín",
    evento: "Casamiento íntimo · Casona",
    txt: "Elegimos la Casona porque éramos 60 personas y queríamos algo cálido. Salió mejor de lo que imaginábamos. El catering es brutal.",
  },
  {
    nombre: "Sofía L.",
    evento: "Bautismo + cumple infantil",
    txt: "El parque del 467 fue clave. Los chicos jugaron toda la tarde, los grandes comimos tranquis. Volvemos seguro.",
  },
  {
    nombre: "Estudio Vázquez",
    evento: "Evento corporativo · 90 personas",
    txt: "Hicimos el cierre de año de la consultora. Muy profesionales, equipo de sonido impecable, presentación cuidada hasta el último detalle.",
  },
  {
    nombre: "Lucía M.",
    evento: "Cumpleaños de 15",
    txt: "Pensé que iba a ser un caos coordinar todo. Ellos lo coordinaron. Yo solo bailé. Mi hija no paraba de llorar de la emoción.",
  },
  {
    nombre: "Pablo & Andrea",
    evento: "Renovación de votos",
    txt: "30 años de casados los festejamos en la Casona. Nos cuidaron como si fuera nuestra primera fiesta. Nos vamos volviendo clientes de la familia.",
  },
  {
    nombre: "Familia Gómez",
    evento: "Bodas de oro",
    txt: "Mis viejos cumplieron 50 años casados. Buscábamos algo descontracturado, no un salón frío. Encontramos el lugar perfecto.",
  },
  {
    nombre: "Nico R.",
    evento: "Despedida de soltero",
    txt: "Reservamos la Casona para una despedida con 40 amigos. DJ propio, asado, after hasta las 5. Diez puntos.",
  },
  {
    nombre: "Mariana K.",
    evento: "Cumple 50 sorpresa",
    txt: "Le organicé sorpresa a mi marido. El equipo se prendió como si fuera de la familia. Coordinaron la entrada perfecta.",
  },
  {
    nombre: "Federico T.",
    evento: "Recibida + cumpleaños",
    txt: "Junté las dos cosas en un mismo evento. Pensaron todo. Pantalla con fotos, mesa dulce a medida. Cero stress.",
  },
];

// 12 videos del canal (carrusel/grid en sección Videos)
export const VIDEOS = [
  "_Z4wn9Q8Wiw", "2WYuDlVODYU", "AKBHihHBj6w",
  "aL8XMCEk5dU", "gq8_l5PQCoA", "GwXqUotVOYc",
  "N5WtjfpN6ZE", "Nrs4kH079io", "nvOBqmqA6Kw", "oKTPS70NIfs",
];
