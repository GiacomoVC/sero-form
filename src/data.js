// Sero — datos del formulario

// Emojis construidos con codepoints (ASCII puro en el código → no se corrompen al copiar/pegar en GitHub).
const cp = (...n) => String.fromCodePoint(...n);
export const EMO = {
  card: cp(0x1F3B4),     // 🎴
  point: cp(0x1F447),    // 👇
  fire: cp(0x1F525),     // 🔥
  wave: cp(0x1F44B),     // 👋
  sparkle: cp(0x2728),   // ✨
  pizza: cp(0x1F355),    // 🍕
  money: cp(0x1F4B0),    // 💰
  cal: cp(0x1F4C5),      // 📅
  plate: cp(0x1F37D),    // 🍽
  pair: cp(0x1F46F),     // 👯
  hands: cp(0x1F64C),    // 🙌
  speak: cp(0x1F5E3),    // 🗣
  music: cp(0x1F3B5),    // 🎵
  tv: cp(0x1F4FA),       // 📺
  film: cp(0x1F3AC),     // 🎬
  anime: cp(0x1F004),    // 🀄
  books: cp(0x1F4DA),    // 📚
};

export const WORLDS = [
  { id: "musica", label: "Música", emoji: EMO.music },
  { id: "series", label: "Series", emoji: EMO.tv },
  { id: "peliculas", label: "Películas", emoji: EMO.film },
  { id: "anime", label: "Anime / manga", emoji: EMO.anime },
  { id: "libros", label: "Libros", emoji: EMO.books },
  { id: "otro", label: "Otro mundo", emoji: EMO.sparkle },
];

export const SUBCATEGORIES = {
  musica: [
    { id: "kpop",       label: "K-pop",                     examples: "BTS, BLACKPINK, TWICE" },
    { id: "autorasPop", label: "Autoras pop",               examples: "Taylor, Olivia, Sabrina" },
    { id: "emo",        label: "Emo / pop punk",            examples: "My Chemical Romance, Paramore, Fall Out Boy" },
    { id: "indie",      label: "Indie alt",                 examples: "Arctic Monkeys, Tame Impala, Phoebe Bridgers" },
    { id: "hyperpop",   label: "Hyperpop / experimental",   examples: "Charli XCX, 100 gecs, SOPHIE" },
    { id: "electronica",label: "Electrónica",               examples: "Deadmau5, Disclosure, Four Tet" },
    { id: "jazz",       label: "Jazz / R&B / neo soul",     examples: "Miles Davis, Erykah Badu, D'Angelo" },
    { id: "rock",       label: "Rock clásico",              examples: "The Beatles, Pink Floyd, Led Zeppelin" },
    { id: "rockEsp",    label: "Rock ESP",                  examples: "Soda, Los Prisioneros, Grupo Río" },
  ],
  series: [
    { id: "kdrama",     label: "K-dramas",                  examples: "Crash Landing on You, Goblin, Itaewon Class" },
    { id: "reality",    label: "Reality competitivo",       examples: "Survivor, Top Chef, The Circle" },
    { id: "hbo",        label: "HBO drama",                 examples: "Game of Thrones, Succession, Euphoria" },
    { id: "truecrime",  label: "True crime y documentales", examples: "Making a Murderer, The Jinx, Ted Bundy Tapes" },
    { id: "scifi",      label: "Sci-fi / distopía",         examples: "Black Mirror, Westworld, Dark" },
    { id: "culto",      label: "Género con culto",          examples: "Stranger Things, The Mandalorian, Buffy" },
    { id: "sitcom",     label: "Sitcoms",                   examples: "Friends, The Office, Brooklyn Nine-Nine" },
    { id: "animacion",  label: "Animación occidental seria",examples: "Arcane, BoJack Horseman, Invincible" },
  ],
  peliculas: [
    { id: "superheroes",label: "Marvel / DC / superhéroes", examples: "Avengers: Endgame, Spider-Man: No Way Home, The Dark Knight" },
    { id: "scifipens",  label: "Sci-fi pensante",           examples: "Blade Runner 2049, Arrival, Dune: Part Two" },
    { id: "terror",     label: "Terror moderno",            examples: "Hereditary, Get Out, Midsommar" },
    { id: "autor",      label: "Cine de autor",             examples: "Parasite, Moonlight, Mulholland Drive" },
    { id: "animadas",   label: "Animadas",                  examples: "El viaje de Chihiro, Spider-Verse, Coco" },
    { id: "a24",        label: "A24 / indie reciente",      examples: "Lady Bird, The Lighthouse, Aftersun" },
    { id: "asiatico",   label: "Cine asiático",             examples: "Train to Busan, Oldboy, Shoplifters" },
    { id: "clasicos",   label: "Clásicos",                  examples: "Casablanca, El Padrino, Vertigo" },
  ],
  anime: [
    { id: "shonenbattle",label: "Shonen battle",            examples: "One Piece, Naruto, Dragon Ball Z" },
    { id: "shonencapas", label: "Shonen con capas",         examples: "Fullmetal Alchemist, Attack on Titan, Evangelion" },
    { id: "ghibli",     label: "Studio Ghibli",             examples: "El viaje de Chihiro, Mi vecino Totoro, La princesa Mononoke" },
    { id: "romance",    label: "Romance / slice of life",   examples: "Your Name, Toradora!, Clannad" },
    { id: "isekai",     label: "Isekai",                    examples: "Frieren, Re:Zero, Tensura" },
    { id: "seinen",     label: "Seinen / psicológico",      examples: "Death Note, Monster, Berserk" },
    { id: "sports",     label: "Sports / underdog",         examples: "Haikyuu!!, Slam Dunk, Yuri!!! on Ice" },
  ],
  libros: [
    { id: "fantasia",   label: "Fantasía épica",            examples: "Canción de Hielo y Fuego, El Señor de los Anillos, El Archivo de las Tormentas" },
    { id: "scifilib",   label: "Sci-fi",                    examples: "Dune, Neuromante, El problema de los tres cuerpos" },
    { id: "booktok",    label: "Romance / BookTok",         examples: "Colleen Hoover, Emily Henry, Taylor Jenkins Reid" },
    { id: "romantasy",  label: "Romántasy",                 examples: "Sarah J. Maas, Rebecca Yarros, Jennifer L. Armentrout" },
    { id: "filosofia",  label: "Filosofía / ensayos",       examples: "Nietzsche, Camus, Byung-Chul Han" },
    { id: "literaria",  label: "Ficción literaria",         examples: "Murakami, Borges, García Márquez" },
    { id: "latam",      label: "Latinoamericana contemporánea", examples: "Mariana Enríquez, Samanta Schweblin, Mónica Ojeda" },
    { id: "poesia",     label: "Poesía",                    examples: "César Vallejo, Pablo Neruda, Alejandra Pizarnik" },
  ],
};

// Etiqueta de "lo que más amas", por mundo (respeta género en español).
export const AMAS_LABEL = {
  musica:    "¿Cuáles son los artistas que más amas?",
  series:    "¿Cuáles son las series que más amas?",
  peliculas: "¿Cuáles son las películas que más amas?",
  anime:     "¿Cuáles son los animes / mangas que más amas?",
  libros:    "¿Cuáles son los libros que más amas?",
};

export const DATES = ["Martes 23 de junio · 8:30 PM", "Miércoles 24 de junio · 8:30 PM"];
export const VENUE = "Valentini Café Pizza";
export const PRICE = "S/ 69.90";
export const YAPE_NUMBER = "924 978 711";
export const WHATSAPP_NUMBER = "51924978711"; // número con código de país, sin +

// Pega aquí la URL del Google Apps Script (ver INSTRUCCIONES_SHEETS.md).
// Si lo dejas vacío (""), el form funciona igual pero no envía a la hoja.
export const SHEETS_URL = "https://script.google.com/macros/s/AKfycbwQ8isvy4S56fdQSy-vRvnXBi2a6yaJ42m84Wle10A5XOLlohWIBwgQxR9HZR4Vw2WT/exec";
