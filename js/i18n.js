// ============================================
// INTERNATIONALISATION — EN / ES
// ============================================

const translations = {
  en: {
    // — Navbar & mobile menu —
    'nav-home':          'HOME',
    'nav-about':         'ABOUT',
    'nav-projects':      'PROJECTS',
    'nav-cta':           'GET IN TOUCH',
    'nav-contact':       'CONTACT',
    'nav-play':          'PLAY',
    'nav-link-bio':      'LINK IN BIO',

    // — Footer —
    'footer-tagline':    'MULTIDISCIPLINARY DESIGNER',

    // — index.html —
    'hero-badge':        'MULTIDISCIPLINARY DESIGNER',
    'hero-title':        'Hi :)',
    'hero-desc':         "I'm José, a designer based in Buenos Aires, Argentina. I specialize in 3D, communication and digital design.",
    'section-projects':  'PROJECTS',
    'latest-title':      'Latest projects',
    'collab-title':      "Let's Collaborate",

    // — about.html —
    'about-label':       'About',
    'about-bio-1':       'I strongly believe that design is an area for empathizing with others, being able to move them emotionally in the same way it moves me. To convey and communicate ideas.',
    'about-bio-title-1': 'Education',
    'about-bio-title-2': 'Career',
    'about-bio-2a':      "I am a designer based in Buenos Aires, with a Bachelor's degree in Design from Universidad Torcuato Di Tella. My academic formation was instrumental in shaping my comprehensive understanding of the discipline, teaching me to approach complex problems with a strategic mindset and deep user empathy. This foundation allows me to tackle challenges by truly thinking like a designer, looking beyond aesthetics to find functional solutions.",
    'about-bio-2b':      "Throughout my studies, I expanded my creative horizons, moving beyond traditional boundaries to cultivate a strong passion for industrial design, digital communication, and the creation of multimedia objects.",
    'about-bio-3a':      "Complementing my academic background, I have gained professional experience working as a Community Manager and Graphic Designer since 2024. These roles have allowed me to dive deep into the digital landscape, mastering the nuances of social media dynamics and the art of community building.",
    'about-bio-3b':      "This combination of theoretical knowledge and practical application enables me to bridge the gap between physical design and digital interaction, delivering visual solutions that not only solve problems but also resonate effectively with audiences in an increasingly connected world.",
    'disciplines-label': 'Disciplines',
    'disc-industrial':   'Industrial Design',
    'disc-3d':           '3D Design',
    'disc-product':      'Product Design',
    'disc-game':         'Game Design',
    'disc-comm':         'Communication Design',
    'disc-digital':      'Digital Design',
    'disc-ia':           'IA Design',

    // — contact.html —
    'contact-heading':   'Get in touch',
    'contact-subtitle':  "Let's create something amazing together!",
    'contact-phone-lbl': 'CONTACT NUMBER',
    'contact-email-lbl': 'EMAIL ADDRESS',
    'contact-loc-lbl':   'LOCATION',

    // — projects.html —
    'all-work-tag':      'ALL WORK',
    'projects-title':    'Projects',
    'cat-herbario':      'Fanzine · Illustration',
    'cat-plexa':         'Furniture · LED',
    'cat-patagon':       'Board Game · Strategy',
    'cat-savia':         'Urban Furniture · 3D',
    'cat-ccr':           'App Design',
    'coming-soon':       'Coming Soon',

    // — Project detail: shared —
    'back-link':         '← PROJECTS',
    'meta-year':         'Year',
    'meta-area':         'Area',
    'meta-team':         'Team',
    'meta-role':         'Role',

    // — Savia —
    'savia-cat':         'Urban Furniture · 3D',
    'savia-area':        'Industrial Design',
    'savia-desc-1':      'A modular urban furniture set centered on the relationship between public space, workers and nature. The structure utilizes a pipe-based construction system that encourages spontaneous vegetation growth, blurring the line between industrial design and the natural landscape.',
    'savia-desc-2':      'In this project, I served as the 3D Designer. I was responsible for the conceptualization, modeling, rendering, and finishing of the pieces. The urban furniture set includes ischiatic supports, benches, and tables, featuring a pipe-based construction system designed to allow nature to grow through it while connecting the various components to create different spatial configurations.',
    'savia-desc-3':      'Finally, I developed a web configurator that allows anyone to explore our system. Users can assemble different parts and create their own custom configurations, bringing the modular system to life.',
    'savia-img-label':   'Images',
    'savia-coming-soon': 'Coming Soon',

    // — Plexa —
    'plexa-cat':         'Furniture · LED',
    'plexa-area':        'Furniture Design',
    'plexa-desc-1':      'Designed as a study of contrasts, PLEXA bridges the gap between the rigidity of exact sciences and the fluidity of soft disciplines, like design.',
    'plexa-desc-2':      "In this collaborative project, I served as the Technical Lead. My focus was on structural feasibility, including load calculations and dimensional analysis. I designed and 3D-modeled the white connecting nodes —printed in PETG— which act as both structural joints and aesthetic elements. I also oversaw the fabrication of the 'Palo Blanco' wood rods, which were turned for precision assembly and finished with linseed oil. The seat and backrest feature polycarbonate panels mounted via glass standoffs.",

    // — Patagón —
    'patagon-cat':       'Board Game · Strategy',
    'patagon-area':      'Game Design',
    'patagon-desc-1':    'Strategy board game combining area control and resource management mechanics. It takes place in a whimsical, stylized medieval world.',
    'patagon-desc-2':    'This was a collaborative project where tasks were shared equally between both team members. Together, we handled the conceptualization, rule-setting, and the full illustration of the board, characters, and environments. The final result is a 4-player game featuring an MDF board, custom player tokens, and four distinct card decks—each with its own unique illustrations. The game is set in a humorous, stylized version of the Argentine Patagonia.',

    // — Herbario —
    'herbario-cat':      'Fanzine · Illustration',
    'herbario-area':     'Communication Design',
    'herbario-role':     'Designer',
    'herbario-desc-1':   'A personal project dedicated to Natalia Lafourcade. This work draws inspiration from her career, creative processes, and life story, all of which are deeply rooted in a profound connection with nature.',
    'herbario-desc-2':   'Herbario is a fanzine that chronicles the musical journey of Mexican artist Natalia Lafourcade. Through a blend of acrylic illustrations and digital post-processing, the project seeks to convey her deep-rooted connection with the natural world.',

    // — CCR+ —
    'ccr-cat':           'App Design',
    'ccr-area':          'Digital Design',
    'ccr-desc-1':        'CCR+ is an app for connecting young people, artists, and people living in community.',
    'ccr-proj-label':    'Project',
    'ccr-coming-soon':   'Coming Soon',

    // — play.html —
    'play-label':        'PLAYGROUND',
    'play-title':        'Play',
    'play-subtitle':     'Pick a game and have fun.',
    'play-snake':        'SNAKE',
    'play-snake-desc':   'Eat, grow, don\'t crash.',
    'play-memory':       'MEMORY',
    'play-memory-desc':  'Find every pair.',
    'play-back':         '\u2190 BACK',
    'play-start':        'PRESS TO START',
    'play-gameover':     'GAME OVER',
    'play-youwin':       'YOU WIN',
    'play-again':        'PLAY AGAIN',
    'play-draw':         'DRAW',
    'play-runner':       'RUNNER',
    'play-runner-desc':  'Run, jump, survive.',
    'play-pong':         'PONG',
    'play-pong-desc':    'Classic paddle battle.',
    'play-breakout':     'BREAKOUT',
    'play-breakout-desc':'Smash every brick.',
    'play-ttt':          'TIC TAC TOE',
    'play-ttt-desc':     'Beat the machine.',

    // — link-in-bio.html —
    'bio-handle':        'Industrial Designer',
    'bio-link-projects': 'Projects',
  },

  es: {
    // — Navbar & mobile menu —
    'nav-home':          'INICIO',
    'nav-about':         'SOBRE MÍ',
    'nav-projects':      'PROYECTOS',
    'nav-cta':           'ESCRIBIME',
    'nav-contact':       'CONTACTO',
    'nav-play':          'JUGAR',
    'nav-link-bio':      'LINK EN BIO',

    // — Footer —
    'footer-tagline':    'DISEÑADOR MULTIDISCIPLINARIO',

    // — index.html —
    'hero-badge':        'DISEÑADOR MULTIDISCIPLINARIO',
    'hero-title':        'Hola :)',
    'hero-desc':         'Soy José, diseñador radicado en Buenos Aires, Argentina. Me especializo en diseño 3D, comunicación y diseño digital.',
    'section-projects':  'PROYECTOS',
    'latest-title':      'Últimos proyectos',
    'collab-title':      'Colaboremos',

    // — about.html —
    'about-label':       'Sobre mí',
    'about-bio-1':       'Creo firmemente que el diseño es un área para empatizar con los demás, capaz de movilizarlos emocionalmente de la misma manera en que me moviliza a mí. Para transmitir y comunicar ideas.',
    'about-bio-title-1': 'Educación',
    'about-bio-title-2': 'Trayectoria',
    'about-bio-2a':      'Soy diseñador radicado en Buenos Aires, con una Licenciatura en Diseño de la Universidad Torcuato Di Tella. Mi formación académica fue fundamental para construir una comprensión integral de la disciplina, enseñándome a abordar problemas complejos con una mentalidad estratégica y una profunda empatía hacia los usuarios. Esta base me permite enfrentar desafíos pensando genuinamente como diseñador, yendo más allá de la estética para encontrar soluciones funcionales.',
    'about-bio-2b':      'A lo largo de mis estudios, amplié mis horizontes creativos, superando los límites tradicionales para cultivar una fuerte pasión por el diseño industrial, la comunicación digital y la creación de objetos multimedia.',
    'about-bio-3a':      'Complementando mi formación académica, cuento con experiencia profesional como Community Manager y Diseñador Gráfico desde 2024. Estos roles me permitieron adentrarme en el ecosistema digital, dominando los matices de las redes sociales y el arte de construir comunidades.',
    'about-bio-3b':      'Esta combinación de conocimiento teórico y aplicación práctica me permite tender puentes entre el diseño físico y la interacción digital, brindando soluciones visuales que no solo resuelven problemas sino que también conectan efectivamente con audiencias en un mundo cada vez más interconectado.',
    'disciplines-label': 'Disciplinas',
    'disc-industrial':   'Diseño Industrial',
    'disc-3d':           'Diseño 3D',
    'disc-product':      'Diseño de Producto',
    'disc-game':         'Diseño de Juegos',
    'disc-comm':         'Diseño de Comunicación',
    'disc-digital':      'Diseño Digital',
    'disc-ia':           'Diseño IA',

    // — contact.html —
    'contact-heading':   'Contacto',
    'contact-subtitle':  '¡Creemos algo increíble juntos!',
    'contact-phone-lbl': 'NÚMERO DE CONTACTO',
    'contact-email-lbl': 'CORREO ELECTRÓNICO',
    'contact-loc-lbl':   'UBICACIÓN',

    // — projects.html —
    'all-work-tag':      'TODO EL TRABAJO',
    'projects-title':    'Proyectos',
    'cat-herbario':      'Fanzine · Ilustración',
    'cat-plexa':         'Mobiliario · LED',
    'cat-patagon':       'Juego de Mesa · Estrategia',
    'cat-savia':         'Mobiliario Urbano · 3D',
    'cat-ccr':           'Diseño de App',
    'coming-soon':       'Próximamente',

    // — Project detail: shared —
    'back-link':         '← PROYECTOS',
    'meta-year':         'Año',
    'meta-area':         'Área',
    'meta-team':         'Equipo',
    'meta-role':         'Rol',

    // — Savia —
    'savia-cat':         'Mobiliario Urbano · 3D',
    'savia-area':        'Diseño Industrial',
    'savia-desc-1':      'Un conjunto de mobiliario urbano modular centrado en la relación entre el espacio público, las personas y la naturaleza. La estructura utiliza un sistema constructivo de caños que favorece el crecimiento espontáneo de vegetación, desdibujando el límite entre el diseño industrial y el paisaje natural.',
    'savia-desc-2':      'En este proyecto, fui el Diseñador 3D. Me encargué de la conceptualización, el modelado, el renderizado y el acabado de las piezas. El conjunto de mobiliario urbano incluye apoyaisquiones, bancos y mesas, con un sistema constructivo de caños diseñado para que la naturaleza crezca a través de él mientras conecta los distintos componentes para crear diferentes configuraciones espaciales.',
    'savia-desc-3':      'Finalmente, desarrollé un configurador web que permite a cualquier persona explorar nuestro sistema. Los usuarios pueden ensamblar distintas piezas y crear sus propias configuraciones personalizadas, dándole vida al sistema modular.',
    'savia-img-label':   'Imágenes',
    'savia-coming-soon': 'Próximamente',

    // — Plexa —
    'plexa-cat':         'Mobiliario · LED',
    'plexa-area':        'Diseño de Mobiliario',
    'plexa-desc-1':      'Diseñado como un estudio de contrastes, PLEXA tiende un puente entre la rigidez de las ciencias exactas y la fluidez de las disciplinas blandas, como el diseño.',
    'plexa-desc-2':      'En este proyecto colaborativo, fui el Líder Técnico. Mi enfoque estuvo en la viabilidad estructural, incluyendo cálculos de carga y análisis dimensional. Diseñé y modelé en 3D los nodos conectores blancos —impresos en PETG— que funcionan tanto como juntas estructurales y como elementos estéticos. También supervisé la fabricación de los varillones de madera de Palo Blanco, torneados para un ensamblaje de precisión y terminados con aceite de lino. El asiento y el respaldo están formados por paneles de policarbonato montados con separadores de vidrio.',

    // — Patagón —
    'patagon-cat':       'Juego de Mesa · Estrategia',
    'patagon-area':      'Diseño de Juegos',
    'patagon-desc-1':    'Juego de mesa de estrategia que combina mecánicas de control de zonas y gestión de recursos. Transcurre en un mundo medieval estilizado y pintoresco.',
    'patagon-desc-2':    'Fue un proyecto colaborativo donde las tareas se repartieron de manera equitativa entre los dos integrantes. Juntos trabajamos en la conceptualización, el reglamento y la ilustración completa del tablero, los personajes y los entornos. El resultado final es un juego para 4 jugadores con un tablero de MDF, fichas personalizadas y cuatro mazos de cartas distintos, cada uno con ilustraciones propias. El juego está ambientado en una versión humorística y estilizada de la Patagonia argentina.',

    // — Herbario —
    'herbario-cat':      'Fanzine · Ilustración',
    'herbario-area':     'Diseño de Comunicación',
    'herbario-role':     'Diseñador',
    'herbario-desc-1':   'Un proyecto personal dedicado a Natalia Lafourcade. Esta obra se inspira en su carrera, sus procesos creativos y su historia de vida, todos profundamente arraigados en una conexión con la naturaleza.',
    'herbario-desc-2':   'Herbario es un fanzine que narra el recorrido musical de la artista mexicana Natalia Lafourcade. A través de una mezcla de ilustraciones acrílicas y postproducción digital, el proyecto busca transmitir su profunda conexión con el mundo natural.',

    // — CCR+ —
    'ccr-cat':           'Diseño de App',
    'ccr-area':          'Diseño Digital',
    'ccr-desc-1':        'CCR+ es una app para conectar jóvenes, artistas y personas que viven en comunidad.',
    'ccr-proj-label':    'Proyecto',
    'ccr-coming-soon':   'Próximamente',

    // — play.html —
    'play-label':        'PATIO DE JUEGOS',
    'play-title':        'Jugar',
    'play-subtitle':     'Elegí un juego y divertite.',
    'play-snake':        'SERPIENTE',
    'play-snake-desc':   'Comé, crecé, no choques.',
    'play-memory':       'MEMORIA',
    'play-memory-desc':  'Encontrá cada par.',
    'play-back':         '\u2190 VOLVER',
    'play-start':        'PRESIONÁ PARA EMPEZAR',
    'play-gameover':     'FIN DEL JUEGO',
    'play-youwin':       'GANASTE',
    'play-again':        'JUGAR DE NUEVO',
    'play-draw':         'EMPATE',
    'play-runner':       'CORREDOR',
    'play-runner-desc':  'Corré, saltá, sobreviví.',
    'play-pong':         'PONG',
    'play-pong-desc':    'Batalla de paletas clásica.',
    'play-breakout':     'BREAKOUT',
    'play-breakout-desc':'Rompé todos los ladrillos.',
    'play-ttt':          'TA-TE-TI',
    'play-ttt-desc':     'Ganá a la máquina.',

    // — link-in-bio.html —
    'bio-handle':        'Diseñador Industrial',
    'bio-link-projects': 'Proyectos',
  }
};

// ============================================

let currentLang = localStorage.getItem('lang') || 'en';

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update all toggle buttons to show the OTHER language
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.textContent = lang === 'en' ? 'ES' : 'EN';
    btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  });

  // Update <html lang>
  document.documentElement.lang = lang;
}

// Expose for dynamic DOM (games create elements after load)
window.applyCurrentLang = function () { applyTranslations(currentLang); };

function toggleLang() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  localStorage.setItem('lang', currentLang);
  applyTranslations(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });
  applyTranslations(currentLang);
});
