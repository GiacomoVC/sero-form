// Sero — datos del formulario
// Correcciones aplicadas: BookTok por autor, Latinoamericana por autor (sin "La femme désarmée"),
// A24 usa Aftersun (no Midsommar duplicado), idioma "como lo dice un peruano" (original salvo Ghibli/clásicos).

export const WORLDS = [
  { id: "musica", label: "Música", emoji: "🎵" },
  { id: "series", label: "Series", emoji: "📺" },
  { id: "peliculas", label: "Películas", emoji: "🎬" },
  { id: "anime", label: "Anime / manga", emoji: "🀄" },
  { id: "libros", label: "Libros", emoji: "📚" },
  { id: "otro", label: "Otro mundo", emoji: "✨" },
];

export const SUBCATEGORIES = {
  musica: [
    { id: "kpop", label: "K-pop", titles: ["BTS", "BLACKPINK", "TWICE", "KATSEYE", "Stray Kids"] },
    { id: "swifties", label: "Swifties", titles: ["Taylor Swift", "Olivia Rodrigo", "Paramore", "Lorde", "HAIM"] },
    { id: "emo", label: "Emo / pop punk", titles: ["My Chemical Romance", "Paramore", "Fall Out Boy", "Panic! At The Disco", "Green Day"] },
    { id: "indie", label: "Indie alt", titles: ["Arctic Monkeys", "Tame Impala", "Fleet Foxes", "Phoebe Bridgers", "The National"] },
    { id: "hyperpop", label: "Hyperpop / experimental", titles: ["Charli XCX", "100 gecs", "SOPHIE", "Rina Sawayama", "Arca"] },
    { id: "electronica", label: "Electrónica", titles: ["Deadmau5", "Disclosure", "Four Tet", "Aphex Twin", "Flume"] },
    { id: "jazz", label: "Jazz / R&B / neo soul", titles: ["Miles Davis", "Alicia Keys", "Erykah Badu", "D'Angelo", "Solange"] },
    { id: "rock", label: "Rock clásico", titles: ["The Beatles", "Pink Floyd", "Led Zeppelin", "The Rolling Stones", "David Bowie"] },
  ],
  series: [
    { id: "kdrama", label: "K-dramas", titles: ["Crash Landing on You", "Goblin", "Itaewon Class", "Stranger", "Extraordinary Attorney Woo"] },
    { id: "reality", label: "Reality competitivo", titles: ["RuPaul's Drag Race", "Survivor", "The Great British Bake Off", "Top Chef", "The Circle"] },
    { id: "hbo", label: "HBO drama", titles: ["Game of Thrones", "Succession", "The Last of Us", "Euphoria", "The Sopranos"] },
    { id: "truecrime", label: "True crime y documentales", titles: ["Making a Murderer", "The Jinx", "The Staircase", "Ted Bundy Tapes", "I'll Be Gone in the Dark"] },
    { id: "scifi", label: "Sci-fi / distopía", titles: ["Black Mirror", "Westworld", "Dark", "The Expanse", "Devs"] },
    { id: "culto", label: "Género con culto", titles: ["Stranger Things", "The Mandalorian", "Hannibal", "Buffy", "Daredevil"] },
    { id: "sitcom", label: "Sitcoms", titles: ["Friends", "The Office", "Seinfeld", "Parks and Recreation", "Brooklyn Nine-Nine"] },
    { id: "animacion", label: "Animación occidental seria", titles: ["Arcane", "BoJack Horseman", "Invincible", "Gravity Falls", "Rick and Morty"] },
  ],
  peliculas: [
    { id: "superheroes", label: "Marvel / DC / superhéroes", titles: ["Avengers: Endgame", "Black Panther", "Spider-Man: No Way Home", "The Dark Knight", "Joker"] },
    { id: "scifipens", label: "Sci-fi pensante", titles: ["Blade Runner 2049", "Arrival", "Ex Machina", "Dune: Part Two", "Annihilation"] },
    { id: "terror", label: "Terror moderno", titles: ["Hereditary", "Get Out", "Midsommar", "The Witch", "It Follows"] },
    { id: "autor", label: "Cine de autor", titles: ["Parasite", "Moonlight", "There Will Be Blood", "Mulholland Drive", "The Handmaiden"] },
    { id: "animadas", label: "Animadas", titles: ["El viaje de Chihiro", "Spider-Verse", "Coco", "Your Name", "WALL·E"] },
    { id: "a24", label: "A24 / indie reciente", titles: ["Lady Bird", "The Lighthouse", "The Florida Project", "Uncut Gems", "Aftersun"] },
    { id: "asiatico", label: "Cine asiático", titles: ["Parasite", "Train to Busan", "Oldboy", "Shoplifters", "Happy Together"] },
    { id: "clasicos", label: "Clásicos", titles: ["Citizen Kane", "Casablanca", "2001: Odisea del espacio", "El Padrino", "Vertigo"] },
  ],
  anime: [
    { id: "shonenbattle", label: "Shonen battle", titles: ["One Piece", "Naruto", "Dragon Ball Z", "Bleach", "Hunter x Hunter"] },
    { id: "shonencapas", label: "Shonen con capas", titles: ["Fullmetal Alchemist: Brotherhood", "Attack on Titan", "Hunter x Hunter", "Neon Genesis Evangelion", "My Hero Academia"] },
    { id: "ghibli", label: "Studio Ghibli", titles: ["El viaje de Chihiro", "Mi vecino Totoro", "La princesa Mononoke", "El castillo ambulante", "La tumba de las luciérnagas"] },
    { id: "romance", label: "Romance / slice of life", titles: ["Your Name", "Toradora!", "Clannad", "Kimi ni Todoke", "Honey and Clover"] },
    { id: "isekai", label: "Isekai", titles: ["Frieren", "Re:Zero", "Sword Art Online", "Tensura", "Overlord"] },
    { id: "seinen", label: "Seinen / psicológico", titles: ["Death Note", "Monster", "Berserk", "Psycho-Pass", "Tokyo Ghoul"] },
    { id: "sports", label: "Sports / underdog", titles: ["Haikyuu!!", "Kuroko's Basketball", "Slam Dunk", "Hajime no Ippo", "Yuri!!! on Ice"] },
  ],
  libros: [
    { id: "fantasia", label: "Fantasía épica", titles: ["Canción de Hielo y Fuego", "El Archivo de las Tormentas", "El Señor de los Anillos", "La Rueda del Tiempo", "Crónica del Asesino de Reyes"] },
    { id: "scifilib", label: "Sci-fi", titles: ["Dune", "Neuromante", "El problema de los tres cuerpos", "La mano izquierda de la oscuridad", "Snow Crash"] },
    { id: "booktok", label: "Romance / BookTok", titles: ["Colleen Hoover", "Emily Henry", "Casey McQuiston", "Taylor Jenkins Reid", "Ali Hazelwood"] },
    { id: "romantasy", label: "Romántasy", titles: ["Sarah J. Maas", "Rebecca Yarros", "Jennifer L. Armentrout"] },
    { id: "filosofia", label: "Filosofía / ensayos", titles: ["Nietzsche", "Camus", "Byung-Chul Han", "Mark Fisher", "Sapiens"] },
    { id: "literaria", label: "Ficción literaria", titles: ["Murakami", "Bolaño", "Vargas Llosa", "Borges", "García Márquez"] },
    { id: "latam", label: "Latinoamericana contemporánea", titles: ["Mariana Enríquez", "Samanta Schweblin", "Mónica Ojeda", "Selva Almada"] },
    { id: "poesia", label: "Poesía", titles: ["César Vallejo", "Pablo Neruda", "Alejandra Pizarnik", "Ocean Vuong", "Rupi Kaur"] },
  ],
};

export const DATES = ["Martes 23 de junio · 8:30 PM", "Miércoles 24 de junio · 8:30 PM"];
export const VENUE = "Valentini Café Pizza";
export const PRICE = "S/ 69.90";
export const YAPE_NUMBER = "924 978 711";
export const WHATSAPP_NUMBER = "51924978711"; // número con código de país, sin +

// Pega aquí la URL del Google Apps Script (ver INSTRUCCIONES_SHEETS.md).
// Si lo dejas vacío (""), el form funciona igual pero no envía a la hoja.
export const SHEETS_URL = "https://script.google.com/macros/s/AKfycbwQ8isvy4S56fdQSy-vRvnXBi2a6yaJ42m84Wle10A5XOLlohWIBwgQxR9HZR4Vw2WT/exec";

