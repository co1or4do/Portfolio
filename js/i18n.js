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
    'hero-desc':         "I'm José, a designer from Buenos Aires, Argentina. I specialize in 3D, communication and digital environments.",
    'section-projects':  'PROJECTS',
    'latest-title':      'Latest projects',
    'collab-title':      "Let's Collaborate",

    // — about.html —
    'about-label':       'About',
    'about-bio-1':       'To me, design is empathy. Understanding others and moving them the way design moves me.<br><br>Conveying and communicating ideas.',
    'about-cv-experience': 'Work Experience',
    'about-cv-role-1':   'Community Manager',
    'about-cv-place-1':  'Deco Macetas Home | Jan 2024 – Aug 2024',
    'about-cv-task-1a':  'Social media management and content creation.',
    'about-cv-task-1b':  'Development of personalized budgets.',
    'about-cv-task-1c':  'Customer service and inquiry resolution.',
    'about-cv-task-1d':  'Development of digital marketing strategies.',
    'about-cv-role-2':   'Designer & Community Manager',
    'about-cv-place-2':  'Mercado de Helados | Aug 2025 – Present',
    'about-cv-task-2a':  'Visual content creation and social media management.',
    'about-cv-task-2b':  'Content planning and post scheduling.',
    'about-cv-task-2c':  'Brand communication and messaging.',
    'about-cv-task-2d':  'Strengthening digital presence and community.',
    'about-cv-education': 'Education',
    'about-cv-edu-1':   "Bachelor's in Design | 2022 – 2025",
    'about-cv-edu-2':   'High School Diploma | Graduated in 2020',
    'about-cv-skills':  'Skills',
    'skill-graphic':    'Graphic Design',
    'skill-industrial': 'Industrial Design',
    'skill-product':    'Product Design',
    'skill-audiovisual':'Audiovisual Design',
    'skill-communication':'Digital Communication',
    'tools-label':       'Tools',

    // — contact.html —
    'contact-heading':   'Get in touch',
    'contact-subtitle':  "Let's create something together!",
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
    'savia-desc-1':      'Modular urban furniture that explores the relationship between public space, people and nature. A pipe-based construction system that lets vegetation grow freely, blurring the line between the industrial and the natural.',
    'savia-desc-2':      'I was the <span style="color:#9fd6db">3D Designer</span> on this project. I conceptualized, modeled, rendered and finished the pieces. The system includes ischiatic supports, benches and tables, connected by pipes through which nature grows and expands.',
    'savia-catalog-heading': 'Catalog',
    'savia-heading-3':   'Web configurator',
    'savia-desc-3':      'I also developed a <a href="https://configurador-savia-git-main-co1or4dos-projects.vercel.app/" target="_blank" rel="noopener noreferrer">web configurator</a> so anyone can explore the system, assemble pieces and build their own configuration.',
    'savia-img-label':   'Images',
    'savia-coming-soon': 'Coming Soon',

    // — Plexa —
    'plexa-cat':         'Furniture · LED',
    'plexa-area':        'Furniture Design',
    'plexa-desc-1':      'Designed as a study of contrasts, PLEXA bridges the gap between the rigidity of exact sciences and the fluidity of soft disciplines, like design.',
    'plexa-desc-2':      "I was the <span style=\"color:#9fd6db\">Technical Lead</span> on this project. I handled structural feasibility: load calculations and dimensional analysis. I designed and 3D-modeled the white connecting nodes —printed in PETG— which work as both structural joints and aesthetic elements. I also oversaw the fabrication of the Palo Blanco wood rods, turned for precision assembly and finished with linseed oil. The seat and backrest are polycarbonate panels mounted with glass standoffs.",

    // — Patagón —
    'patagon-cat':       'Board Game · Strategy',
    'patagon-area':      'Game Design',
    'patagon-desc-1':    'Strategy board game combining area control and resource management mechanics. It takes place in a whimsical, stylized medieval world.',
    'patagon-desc-2':    'A collaborative project where we split everything equally. We handled conceptualization, rules, and the full illustration of the board, characters and environments.<br><br>The result: a 4-player game with an MDF board, custom tokens, and four card decks—each with its own illustrations. All set in a humorous, stylized Argentine Patagonia.',
    'patagon-manual-title': 'Game Manual',

    // — Herbario —
    'herbario-cat':      'Fanzine · Illustration',
    'herbario-area':     'Communication Design',
    'herbario-role':     'Designer',
    'herbario-desc-1':   'A personal project dedicated to Natalia Lafourcade. This work draws inspiration from her career, creative processes, and life story, all of which are deeply rooted in a profound connection with nature.',
    'herbario-desc-2':   'Herbario is a fanzine that chronicles the musical journey of Mexican artist Natalia Lafourcade. Through a blend of acrylic illustrations and digital post-processing, the project seeks to convey her deep-rooted connection with the natural world.',

    // — CCR+ —
    'ccr-cat':           'App Design',
    'ccr-area':          'Digital Design',
    'ccr-desc-1':        'CCR+ is a platform designed to bring together the people who visit the Centro Cultural Recoleta — young people, artists, and communities — and encourage them to participate in its activities.',
    'ccr-desc-2':        'Beyond the app, the project includes a series of on-site interventions throughout the venue, bridging the digital experience with the physical space.',
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
    'hero-desc':         'Soy José, un diseñador de Buenos Aires, Argentina. Me especializo en diseño 3D, comunicación y entornos digitales.',
    'section-projects':  'PROYECTOS',
    'latest-title':      'Últimos proyectos',
    'collab-title':      'Colaboremos',

    // — about.html —
    'about-label':       'Sobre mí',
    'about-bio-1':       'Para mí, diseñar es empatizar. Entender al otro y poder moverlo como el diseño me mueve a mí.<br><br>Poder transmitir y comunicar ideas.',
    'about-cv-experience': 'Experiencia Laboral',
    'about-cv-role-1':   'Community Manager',
    'about-cv-place-1':  'Deco Macetas Home | Enero 2024 – Agosto 2024',
    'about-cv-task-1a':  'Gestión de redes sociales y creación de contenido.',
    'about-cv-task-1b':  'Desarrollo de presupuestos personalizados.',
    'about-cv-task-1c':  'Atención al cliente y resolución de consultas.',
    'about-cv-task-1d':  'Desarrollo de estrategias de marketing digital.',
    'about-cv-role-2':   'Diseñador y Community Manager',
    'about-cv-place-2':  'Mercado de Helados | Agosto 2025 – Presente',
    'about-cv-task-2a':  'Creación de contenido visual y gestión de redes sociales.',
    'about-cv-task-2b':  'Planificación de contenidos y programación de publicaciones.',
    'about-cv-task-2c':  'Comunicación de marca y mensajería.',
    'about-cv-task-2d':  'Fortalecimiento de la presencia digital y la comunidad.',
    'about-cv-education': 'Formación',
    'about-cv-edu-1':   'Licenciatura en Diseño | 2022 – 2025',
    'about-cv-edu-2':   'Bachillerato | Graduado en 2020',
    'about-cv-skills':  'Habilidades',
    'skill-graphic':    'Diseño Gráfico',
    'skill-industrial': 'Diseño Industrial',
    'skill-product':    'Diseño de Producto',
    'skill-audiovisual':'Diseño Audiovisual',
    'skill-communication':'Comunicación Digital',
    'tools-label':       'Herramientas',

    // — contact.html —
    'contact-heading':   'Contacto',
    'contact-subtitle':  'Creemos algo juntos.',
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
    'savia-desc-1':      'Mobiliario urbano modular que trabaja la relación entre el espacio público, las personas y la naturaleza. Un sistema constructivo de caños que deja crecer la vegetación, desdibujando el límite entre lo industrial y lo natural.',
    'savia-desc-2':      'Fui el <span style="color:#9fd6db">Diseñador 3D</span> del proyecto. Me encargué de conceptualizar, modelar, renderizar y terminar las piezas. El sistema incluye apoyaisquiones, bancos y mesas, conectados por caños a través de los cuales la naturaleza crece y se expande.',
    'savia-catalog-heading': 'Catálogo',
    'savia-heading-3':   'Configurador web',
    'savia-desc-3':      'También desarrollé un <a href="https://configurador-savia-git-main-co1or4dos-projects.vercel.app/" target="_blank" rel="noopener noreferrer">configurador web</a> para que cualquiera pueda explorar el sistema, ensamblar piezas y armar su propia configuración.',
    'savia-img-label':   'Imágenes',
    'savia-coming-soon': 'Próximamente',

    // — Plexa —
    'plexa-cat':         'Mobiliario · LED',
    'plexa-area':        'Diseño de Mobiliario',
    'plexa-desc-1':      'Diseñado como un estudio de contrastes, PLEXA tiende un puente entre la rigidez de las ciencias exactas y la fluidez de las disciplinas blandas, como el diseño.',
    'plexa-desc-2':      'Fui el <span style="color:#9fd6db">Líder Técnico</span> del proyecto. Me ocupé de la viabilidad estructural: cálculos de carga y análisis dimensional. Diseñé y modelé en 3D los nodos conectores blancos —impresos en PETG— que funcionan como juntas estructurales y como elementos estéticos. También supervisé la fabricación de los varillones de Palo Blanco, torneados a precisión y terminados con aceite de lino. El asiento y el respaldo son paneles de policarbonato montados con separadores de vidrio.',

    // — Patagón —
    'patagon-cat':       'Juego de Mesa · Estrategia',
    'patagon-area':      'Diseño de Juegos',
    'patagon-desc-1':    'Juego de mesa de estrategia que combina mecánicas de control de zonas y gestión de recursos. Transcurre en un mundo medieval estilizado y pintoresco.',
    'patagon-desc-2':    'Proyecto colaborativo donde nos repartimos todo por igual. Trabajamos en la conceptualización, el reglamento y la ilustración completa del tablero, los personajes y los entornos.<br><br>El resultado: un juego para 4 jugadores con tablero de MDF, fichas personalizadas y cuatro mazos de cartas distintos, cada uno con ilustraciones propias. Todo ambientado en una Patagonia argentina humorística y estilizada.',
    'patagon-manual-title': 'Manual de Juego',

    // — Herbario —
    'herbario-cat':      'Fanzine · Ilustración',
    'herbario-area':     'Diseño de Comunicación',
    'herbario-role':     'Diseñador',
    'herbario-desc-1':   'Un proyecto personal dedicado a Natalia Lafourcade. Esta obra se inspira en su carrera, sus procesos creativos y su historia de vida, todos profundamente arraigados en una conexión con la naturaleza.',
    'herbario-desc-2':   'Herbario es un fanzine que narra el recorrido musical de la artista mexicana Natalia Lafourcade. A través de una mezcla de ilustraciones acrílicas y postproducción digital, el proyecto busca transmitir su profunda conexión con el mundo natural.',

    // — CCR+ —
    'ccr-cat':           'Diseño de App',
    'ccr-area':          'Diseño Digital',
    'ccr-desc-1':        'CCR+ es una plataforma pensada para unir a la gente que visita el Centro Cultural Recoleta —jóvenes, artistas y comunidades— e incentivarlos a participar en sus actividades.',
    'ccr-desc-2':        'Además de la app, el proyecto incluye una serie de intervenciones en el recinto, conectando la experiencia digital con el espacio físico.',
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
    if (el.dataset.typewriting) return;
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
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

function heroTypewriter() {
  if (window.innerWidth > 743) return;
  var el = document.querySelector('.hero-desc');
  if (!el) return;
  var text = el.textContent;
  var h = el.offsetHeight;

  el.dataset.typewriting = '1';
  el.style.minHeight = h + 'px';
  el.textContent = '';

  var i = 0;
  function type() {
    if (i < text.length) {
      i++;
      el.textContent = text.slice(0, i);
      setTimeout(type, 25);
    } else {
      delete el.dataset.typewriting;
      el.style.minHeight = '';
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });
  applyTranslations(currentLang);
  heroTypewriter();
});
