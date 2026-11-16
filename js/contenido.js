// =====================================================================
//  CONTENIDO DEL CURSO: "El poder en la filosofía política"
//  Edita este archivo para cambiar textos, lecturas o desafíos.
//  IMPORTANTE: las respuestas correctas de selección múltiple NO van aquí
//  (este archivo es público). Van en privado/claves.json y se cargan a
//  Firestore desde el panel docente.
// =====================================================================

export const CURSO = {
  nombre: "El poder en la filosofía política",
  subtitulo: "Filosofía · Educación Media",
  exigencia: 0.6, // 60 % de logro = nota 4,0
  notaMin: 1.0,
  notaAprob: 4.0,
  notaMax: 7.0,
  navidad: true,       // false = sin nieve ni luces
  gifPortada: "",      // opcional: ruta a un GIF propio para la portada, ej. "img/portada.gif"
};
// Cada clase acepta además un campo opcional  gif: "img/clase1.gif"  que se muestra en su encabezado.

// Rúbrica general para preguntas abiertas (se muestra al estudiante y al docente)
export const RUBRICA_ABIERTA = [
  { nivel: "Logrado", desc: "Usa el concepto del autor con precisión, lo aplica al caso con un ejemplo propio y argumenta su postura." },
  { nivel: "Casi logrado", desc: "Usa el concepto correctamente y lo aplica, pero el ejemplo o el argumento es débil o poco desarrollado." },
  { nivel: "En desarrollo", desc: "Menciona el concepto, pero lo confunde parcialmente o no lo conecta con el caso." },
  { nivel: "Inicial", desc: "Respuesta muy breve, de opinión sin conceptos del curso, o que no responde a lo pedido." },
];

const sel = (id, enunciado, opciones, puntos = 1) => ({ id, tipo: "seleccion", enunciado, opciones, puntos });
const clasificar = (id, enunciado, categorias, items, puntos = 2) => ({ id, tipo: "clasificar", enunciado, categorias, items, puntos });
const emparejar = (id, enunciado, izquierda, derecha, puntos = 2) => ({ id, tipo: "emparejar", enunciado, izquierda, derecha, puntos });
const ordenar = (id, enunciado, items, puntos = 2) => ({ id, tipo: "ordenar", enunciado, items, puntos });
const it = (...textos) => textos.map((texto, i) => ({ id: "abcdefghij"[i], texto }));
const abierta = (id, enunciado, criterio, puntos = 4, minPalabras = 80) =>
  ({ id, tipo: "abierta", enunciado, criterio, puntos, minPalabras });

export const CLASES = [
  // ------------------------------------------------------------------
  {
    id: "c01",
    numero: 1,
    titulo: "¿Qué es el poder?",
    autor: "Introducción (Robert Dahl)",
    objetivo: "Distinguir entre el poder como objeto que se posee y el poder como relación entre personas.",
    texto: [
      "Cuando escuchamos la palabra «poder» solemos pensar en presidentes, ejércitos o grandes empresas. Pero la filosofía política parte de una pregunta más básica: ¿qué significa que alguien tenga poder? ¿Es algo que se guarda en el bolsillo, como el dinero, o es algo que solo existe entre personas?",
      "El politólogo estadounidense Robert Dahl propuso en 1957 una definición muy influyente: una persona A tiene poder sobre una persona B en la medida en que logra que B haga algo que, de otro modo, no habría hecho. Fíjate en que esta definición no habla de cosas, sino de una relación: el poder aparece cuando la conducta de alguien cambia por la intervención de otro.",
      "A partir de aquí podemos distinguir tres formas de hablar del poder. El «poder sobre» es la capacidad de influir o imponerse a otros. El «poder para» es la capacidad de lograr algo, de actuar y transformar la realidad (por ejemplo, el poder de un curso para organizar una actividad). Y el «poder con» es el que surge cuando varias personas actúan juntas y logran lo que ninguna podría sola.",
      "Durante este curso veremos que los filósofos contemporáneos no se ponen de acuerdo. Algunos dirán que el poder se basa en la obediencia; otros, que nace de la acción colectiva; otros, que está en todas partes, incluso en la forma en que nos sentamos en la sala o usamos el celular. Tu tarea será leer, comparar y aplicar esas ideas a tu propia vida.",
    ],
    lectura: {
      referencia: "Dahl, R. (1957). «The Concept of Power». Behavioral Science, 2(3), 201–215. (Fragmento traducido entregado por el docente.)",
      indicacion: "Lee el fragmento y subraya la definición de poder. Anota un ejemplo propio en el margen.",
    },
    memorice: [["Poder sobre", "Imponerse a otros"], ["Poder para", "Capacidad de lograr algo"], ["Poder con", "Actuar juntos"], ["Dahl", "A logra que B haga algo"]],
    desafios: [
      sel("p1", "Según la definición de Robert Dahl, A tiene poder sobre B cuando…", [
        "A tiene más dinero que B.",
        "A logra que B haga algo que de otro modo no habría hecho.",
        "A ocupa un cargo público más alto que B.",
        "B admira a A y quiere parecerse a él o ella.",
      ]),
      sel("p2", "¿Qué expresión describe mejor el «poder para»?", [
        "La capacidad de castigar a quien desobedece.",
        "La capacidad de actuar y lograr transformar algo.",
        "El derecho legal a dar órdenes.",
        "La riqueza acumulada por una persona.",
      ]),
      sel("p3", "Un grupo de vecinos que por separado no logra nada, pero juntos consiguen recuperar una plaza, es un ejemplo de…", [
        "Poder sobre.",
        "Ausencia de poder.",
        "Poder con.",
        "Poder económico.",
      ]),
      clasificar("p4", "🎁 Juego: arrastra cada situación al saco que corresponde.", ["Poder sobre", "Poder para", "Poder con"], it(
        "Un jefe que obliga a su equipo a quedarse horas extra",
        "Una estudiante que aprende a programar y crea su propia app",
        "Una olla común organizada por la junta de vecinos",
        "Un profesor que pone anotación por usar el celular",
        "Un curso que junta fondos para su gira de estudios",
        "Una deportista que entrena duro y logra clasificar")),
      abierta("p5",
        "Describe una situación de tu vida cotidiana (colegio, casa, redes sociales, deporte) en la que alguien ejerza poder sobre otra persona SIN usar la fuerza física. Indica: quién ejerce el poder, sobre quién, cómo lo hace y si la otra persona se da cuenta. Luego explica si corresponde a «poder sobre», «poder para» o «poder con».",
        "Identifica con claridad los actores y el mecanismo; aplica correctamente la definición de Dahl y una de las tres formas de poder."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c02",
    numero: 2,
    titulo: "Poder, dominación y legitimidad",
    autor: "Max Weber",
    objetivo: "Comprender la diferencia entre poder y dominación, y clasificar los tres tipos de legitimidad.",
    texto: [
      "El sociólogo alemán Max Weber (1864–1920) definió el poder como la probabilidad de imponer la propia voluntad dentro de una relación social, incluso contra la resistencia de otros. Es una definición amplia: cualquiera puede tener poder en alguna situación.",
      "Pero a Weber le interesaba algo más estable: la dominación. Hay dominación cuando un mandato encuentra obediencia de manera regular. ¿Por qué la gente obedece de forma sostenida? No solo por miedo: casi siempre porque cree que obedecer es correcto. A esa creencia Weber la llama legitimidad.",
      "Weber distingue tres tipos ideales de dominación legítima. La tradicional se basa en la costumbre: se obedece porque «siempre ha sido así» (un rey, un patriarca). La carismática se basa en las cualidades extraordinarias que los seguidores atribuyen a un líder (un profeta, un caudillo, un líder de movimiento). La legal-racional se basa en reglas impersonales: se obedece al cargo, no a la persona, porque las normas lo establecen (un funcionario, un juez, un inspector).",
      "Finalmente, Weber define el Estado moderno como la comunidad humana que, dentro de un territorio, reclama con éxito el monopolio de la violencia física legítima. Es decir, solo el Estado puede usar legítimamente la fuerza, y otros solo pueden hacerlo si el Estado lo permite.",
    ],
    lectura: {
      referencia: "Weber, M. Economía y sociedad, primera parte, cap. III: «Los tipos de dominación» (§§ 1–3). Complemento: «La política como vocación» (fragmento sobre el Estado).",
      indicacion: "Elabora un cuadro con los tres tipos de dominación: en qué se basa cada uno y un ejemplo actual.",
    },
    memorice: [["Poder", "Imponer la propia voluntad"], ["Dominación", "Obediencia a un mandato"], ["Legitimidad", "Creer que obedecer es correcto"], ["Estado", "Monopolio de la violencia legítima"]],
    desafios: [
      sel("p1", "Para Weber, ¿qué distingue a la dominación del simple poder?", [
        "La dominación siempre usa violencia física.",
        "La dominación implica obediencia regular a un mandato, normalmente sostenida por la creencia en su legitimidad.",
        "La dominación solo la ejercen los Estados.",
        "No hay ninguna diferencia: son sinónimos.",
      ]),
      sel("p2", "Una autoridad indígena que es obedecida porque así lo han hecho las generaciones anteriores ejemplifica la dominación…", [
        "Carismática.",
        "Legal-racional.",
        "Tradicional.",
        "Económica.",
      ]),
      sel("p3", "Un inspector de colegio que exige cumplir el horario porque el reglamento interno lo faculta ejerce una dominación…", [
        "Legal-racional.",
        "Carismática.",
        "Tradicional.",
        "Ilegítima.",
      ]),
      clasificar("p4", "🎁 Juego: ¿en qué se basa la obediencia? Clasifica cada autoridad.", ["Tradicional", "Carismática", "Legal-racional"], it(
        "Un juez que aplica el Código Penal",
        "Un líder religioso seguido por los milagros que se le atribuyen",
        "Un jefe de clan que heredó el mando de su padre",
        "Un alcalde electo según la ley vigente",
        "Una influencer cuyos fans hacen todo lo que propone por pura admiración",
        "Un rey medieval obedecido «porque siempre ha sido así»")),
      abierta("p5",
        "Elige una figura de autoridad actual (puede ser de tu comunidad, una institución, un influencer, un deportista, un dirigente). ¿Qué tipo de legitimidad tiene según Weber? ¿Puede combinar más de un tipo? Fundamenta con ejemplos concretos de por qué la gente le obedece o le sigue.",
        "Clasifica correctamente según los tipos weberianos y justifica con evidencia; reconoce posibles combinaciones."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c03",
    numero: 3,
    titulo: "Poder y violencia",
    autor: "Hannah Arendt",
    objetivo: "Explicar por qué, para Arendt, poder y violencia son opuestos y no grados de lo mismo.",
    texto: [
      "Hannah Arendt (1906–1975), filósofa alemana que huyó del nazismo, criticó la idea —compartida por Weber— de que el poder consiste en mandar y ser obedecido. Para ella esa visión confunde el poder con la violencia.",
      "Arendt define el poder como la capacidad humana de actuar de manera concertada, es decir, de ponerse de acuerdo y actuar juntos. Por eso el poder nunca es propiedad de un individuo: pertenece a un grupo y existe solo mientras el grupo se mantiene unido. Cuando decimos que alguien «está en el poder», en realidad queremos decir que un grupo lo ha autorizado a actuar en su nombre.",
      "Arendt distingue además el poder de otras palabras que solemos confundir: la potencia es una cualidad individual (la fuerza física o de carácter de una persona) y la autoridad es el reconocimiento que se obedece sin necesidad de obligar ni de convencer.",
      "La violencia, en cambio, es instrumental: necesita herramientas (armas, tecnología) y puede ser ejercida por pocos contra muchos. La violencia puede destruir el poder, pero nunca puede crearlo. Un gobierno que solo se sostiene con armas no es poderoso: es un gobierno que ya perdió su poder y lo reemplaza con violencia.",
      "De ahí su tesis central: poder y violencia son opuestos. Donde uno domina por completo, el otro está ausente. La violencia aparece cuando el poder está en peligro. Esto nos obliga a mirar de otra manera las protestas, las huelgas, las revoluciones y también la represión.",
    ],
    lectura: {
      referencia: "Arendt, H. (1970). Sobre la violencia, cap. II. Madrid: Alianza Editorial.",
      indicacion: "Identifica cómo distingue Arendt entre poder, potencia, fuerza, autoridad y violencia. Haz un glosario breve.",
    },
    memorice: [["Poder (Arendt)", "Actuar juntos"], ["Violencia", "Instrumental"], ["Poder y violencia", "Opuestos"], ["Gobierno solo con armas", "Ya perdió su poder"]],
    desafios: [
      sel("p1", "Para Arendt, el poder es…", [
        "La capacidad de un individuo de imponerse a otros.",
        "La capacidad humana de actuar en conjunto, de manera concertada.",
        "El uso legítimo de la fuerza por parte del Estado.",
        "La posesión de armas y recursos materiales.",
      ]),
      sel("p2", "¿Cuál es la relación entre poder y violencia según Arendt?", [
        "La violencia es la forma más intensa de poder.",
        "Son lo mismo con distinto nombre.",
        "Son opuestos: la violencia aparece cuando el poder se debilita, y puede destruirlo pero no crearlo.",
        "El poder siempre necesita violencia para existir.",
      ]),
      sel("p3", "¿Cuál de estas situaciones es el ejemplo más claro de «poder» en el sentido de Arendt?", [
        "Un guardia armado que impide la entrada a un edificio.",
        "Una amenaza anónima por redes sociales.",
        "Un paro estudiantil masivo y pacífico que obliga a las autoridades a dialogar.",
        "Un hacker que bloquea el sistema de una empresa.",
      ]),
      emparejar("p4", "🎁 Juego: une cada concepto de Arendt con su definición.", it("Poder", "Violencia", "Autoridad", "Potencia"), [
        "Reconocimiento que se obedece sin necesidad de obligar ni convencer",
        "Cualidad propia de un individuo, como su fuerza física o de carácter",
        "Capacidad humana de actuar en conjunto",
        "Medio instrumental que necesita herramientas"]),
      abierta("p5",
        "Compara a Weber y Arendt. Si un gobierno reprime con mucha fuerza una protesta masiva, ¿demuestra que tiene mucho poder o poco poder? Responde primero desde Weber, luego desde Arendt, y finalmente da tu propia postura.",
        "Presenta correctamente la posición de ambos autores, marca el contraste y argumenta una postura propia."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c04",
    numero: 4,
    titulo: "Vigilar y disciplinar",
    autor: "Michel Foucault (I)",
    objetivo: "Analizar el poder disciplinario y el modelo del panóptico en instituciones cotidianas.",
    texto: [
      "Michel Foucault (1926–1984) propone dejar de pensar el poder solo como algo que está «arriba» (el rey, el Estado) y que prohíbe. Para él, el poder circula, se ejerce en relaciones concretas y, sobre todo, es productivo: produce hábitos, conductas, saberes y hasta formas de ser una persona.",
      "En Vigilar y castigar (1975) muestra un cambio histórico. Antes, el castigo era un espectáculo público y brutal sobre el cuerpo del condenado. Desde fines del siglo XVIII aparece otra lógica: encerrar, observar, corregir y entrenar. Nace la disciplina, que se aplica en prisiones, pero también en escuelas, fábricas, cuarteles y hospitales.",
      "El modelo de esta lógica es el panóptico, un diseño de cárcel ideado por Jeremy Bentham: una torre central desde la que se pueden ver todas las celdas, sin que los presos puedan ver si alguien los observa. Como nunca saben si están siendo vigilados, terminan vigilándose a sí mismos. El poder se vuelve automático.",
      "Las técnicas disciplinarias incluyen: distribuir los cuerpos en el espacio (filas, puestos asignados), controlar el tiempo (timbres, horarios), vigilar de forma jerárquica y examinar (pruebas, notas, rankings) para comparar a cada individuo con una norma. El resultado es la normalización: separar a los «normales» de los «desviados». Pero donde hay poder, dice Foucault, también hay resistencia.",
    ],
    lectura: {
      referencia: "Foucault, M. (1975). Vigilar y castigar, tercera parte, cap. III: «El panoptismo». México: Siglo XXI.",
      indicacion: "Lee la descripción del panóptico y dibuja un esquema simple. Anota qué efecto busca producir en quien está en la celda.",
    },
    memorice: [["Panóptico", "Vigilancia invisible"], ["Normalización", "Separar «normales» y «desviados»"], ["Poder productivo", "Produce conductas"], ["Examen", "Comparar con una norma"]],
    desafios: [
      sel("p1", "¿Cuál es el efecto principal que busca producir el panóptico?", [
        "Que los presos puedan escapar con mayor dificultad gracias a muros más altos.",
        "Que el vigilado interiorice la vigilancia y se controle a sí mismo.",
        "Que los guardias tengan mejores condiciones laborales.",
        "Que el castigo sea un espectáculo público.",
      ]),
      sel("p2", "Cuando Foucault dice que el poder es «productivo», quiere decir que…", [
        "El poder genera ganancias económicas para quienes lo tienen.",
        "El poder solo prohíbe y reprime.",
        "El poder genera conductas, hábitos, saberes y formas de ser, no solo prohíbe.",
        "El poder aumenta la productividad de las fábricas.",
      ]),
      sel("p3", "¿Cuál de las siguientes es una técnica disciplinaria en sentido foucaultiano?", [
        "Una conversación espontánea entre amigos en el recreo.",
        "Un ranking de notas que compara a cada estudiante con el promedio del curso.",
        "Una fiesta de fin de año.",
        "Una votación libre para elegir delegado.",
      ]),
      clasificar("p4", "🎁 Juego: ¿qué técnica disciplinaria es cada una?", ["Distribución del espacio", "Control del tiempo", "Vigilancia y examen"], it(
        "Puestos asignados en la sala",
        "Timbre de entrada y de recreo",
        "Ranking de notas publicado en el diario mural",
        "Filas para entrar a la sala",
        "Horario semanal dividido en bloques",
        "Cámaras en los pasillos")),
      abierta("p5",
        "Analiza tu colegio como un espacio disciplinario. Identifica al menos tres técnicas (uso del espacio, control del tiempo, vigilancia, examen) y explica qué tipo de estudiante buscan «producir». ¿Existen también formas de resistencia? Da un ejemplo.",
        "Identifica técnicas concretas y las vincula con los conceptos de Foucault (disciplina, normalización, resistencia)."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c05",
    numero: 5,
    titulo: "Biopoder: gobernar la vida",
    autor: "Michel Foucault (II)",
    objetivo: "Distinguir el poder soberano del biopoder y reconocer la biopolítica en políticas públicas.",
    texto: [
      "En Historia de la sexualidad I (1976), Foucault describe otro cambio. El poder del soberano clásico se resumía en el derecho de «hacer morir o dejar vivir»: el rey podía quitar la vida a sus súbditos. En la modernidad aparece un poder que funciona al revés: «hacer vivir y dejar morir». Su objetivo ya no es tanto matar como administrar, proteger y optimizar la vida.",
      "Foucault llama biopoder a esta forma de poder y distingue dos polos. Uno se dirige al cuerpo individual, para hacerlo útil y dócil: es la disciplina que vimos la clase anterior (anatomopolítica). El otro se dirige a la población como conjunto: natalidad, mortalidad, salud pública, higiene, longevidad. A este segundo polo lo llama biopolítica.",
      "La biopolítica necesita saberes nuevos: la estadística, la demografía, la medicina social. Los censos, las campañas de vacunación, las tasas de natalidad o las políticas de alimentación escolar son formas de conocer y gestionar a la población.",
      "El biopoder no es necesariamente «malo»: gracias a él vivimos más y mejor. Pero Foucault nos invita a preguntarnos quién decide qué vidas se protegen, cuáles se «dejan morir», y cuánta libertad estamos dispuestos a entregar a cambio de seguridad y salud.",
    ],
    lectura: {
      referencia: "Foucault, M. (1976). Historia de la sexualidad I. La voluntad de saber, cap. V: «Derecho de muerte y poder sobre la vida». México: Siglo XXI.",
      indicacion: "Busca en el texto la diferencia entre el poder soberano y el poder sobre la vida. Escríbela con tus palabras en dos líneas.",
    },
    memorice: [["Poder soberano", "Hacer morir o dejar vivir"], ["Biopoder", "Hacer vivir y dejar morir"], ["Biopolítica", "Gestiona la población"], ["Estadística", "Saber sobre la población"]],
    desafios: [
      sel("p1", "¿Qué diferencia al poder soberano clásico del biopoder?", [
        "El soberano «hace vivir y deja morir»; el biopoder «hace morir o deja vivir».",
        "El soberano «hace morir o deja vivir»; el biopoder «hace vivir y deja morir».",
        "Ambos funcionan exactamente igual.",
        "El biopoder solo existe en las dictaduras.",
      ]),
      sel("p2", "¿Cuál es el objeto principal de la biopolítica?", [
        "El cuerpo individual del condenado.",
        "La población como conjunto (salud, natalidad, mortalidad).",
        "Las fronteras del territorio nacional.",
        "La economía de mercado.",
      ]),
      sel("p3", "¿Cuál de estas medidas es un ejemplo de biopolítica?", [
        "Un censo nacional que registra natalidad y esperanza de vida.",
        "Un debate televisivo entre candidatos.",
        "Un concierto masivo.",
        "La redacción de un poema.",
      ]),
      clasificar("p4", "🎁 Juego: clasifica cada ejemplo según el tipo de poder.", ["Poder soberano", "Anatomopolítica (disciplina)", "Biopolítica"], it(
        "Campaña nacional de vacunación",
        "Ejecución pública ordenada por el rey",
        "Postura y horario exigidos a un obrero de fábrica",
        "Registro de las tasas de natalidad",
        "El derecho del monarca a quitar la vida a sus súbditos",
        "Ejercicios militares repetidos hasta la perfección")),
      abierta("p5",
        "Piensa en las medidas sanitarias durante la pandemia de COVID-19 en Chile (cuarentenas, pase de movilidad, vacunación masiva, toque de queda). Analízalas como biopoder: ¿qué buscaban gestionar? ¿Qué beneficios y qué riesgos ves desde la perspectiva de Foucault?",
        "Vincula medidas concretas con biopolítica/disciplina y evalúa beneficios y riesgos con argumentos."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c06",
    numero: 6,
    titulo: "Las tres dimensiones del poder",
    autor: "Steven Lukes",
    objetivo: "Diferenciar las tres dimensiones del poder y aplicarlas a casos concretos.",
    texto: [
      "El filósofo británico Steven Lukes publicó en 1974 un libro breve que cambió el debate: El poder: un enfoque radical. Allí propone que el poder tiene tres dimensiones, cada una más difícil de ver que la anterior.",
      "Primera dimensión (la de Dahl): el poder se observa en las decisiones. Hay un conflicto visible —por ejemplo, una votación— y quien gana tiene más poder. Es lo que vemos en las noticias.",
      "Segunda dimensión (propuesta por Bachrach y Baratz): el poder también consiste en controlar la agenda, es decir, en impedir que ciertos temas lleguen siquiera a discutirse. Son las «no-decisiones»: si un tema nunca entra a la tabla, nunca se pierde una votación sobre él.",
      "Tercera dimensión (el aporte de Lukes): el poder más eficaz es el que moldea los deseos, creencias y preferencias de las personas, de modo que ni siquiera haya conflicto. La gente acepta su situación porque la ve natural, inevitable o incluso deseable. El problema que abre Lukes es delicado: ¿cómo saber cuáles son los «intereses reales» de alguien si sus propios deseos podrían haber sido moldeados?",
    ],
    lectura: {
      referencia: "Lukes, S. (2007). El poder: un enfoque radical (2.ª ed.), cap. 1. Madrid: Siglo XXI.",
      indicacion: "Completa una tabla con las tres dimensiones: qué se observa, quién la propuso y un ejemplo.",
    },
    memorice: [["1.ª dimensión", "Decisiones visibles"], ["2.ª dimensión", "Control de agenda"], ["3.ª dimensión", "Moldear deseos"], ["No-decisión", "El tema nunca se discute"]],
    desafios: [
      sel("p1", "En el consejo de curso, el presidente nunca pone en tabla un tema que le incomoda, y por eso nunca se vota. Esto ilustra la…", [
        "Primera dimensión del poder.",
        "Segunda dimensión del poder.",
        "Tercera dimensión del poder.",
        "Ausencia total de poder.",
      ]),
      sel("p2", "La tercera dimensión del poder, según Lukes, consiste en…", [
        "Ganar votaciones con mayoría absoluta.",
        "Usar la violencia física para imponerse.",
        "Moldear los deseos y creencias de las personas para que no surja el conflicto.",
        "Redactar leyes en el Congreso.",
      ]),
      sel("p3", "Una votación en el Congreso en que un proyecto se aprueba 80 a 40 es un ejemplo típico de…", [
        "Primera dimensión: conflicto observable en una decisión.",
        "Segunda dimensión: control de agenda.",
        "Tercera dimensión: moldeamiento de preferencias.",
        "Biopoder.",
      ]),
      clasificar("p4", "🎁 Juego: ¿en qué dimensión del poder está cada caso?", ["1.ª dimensión", "2.ª dimensión", "3.ª dimensión"], it(
        "Personas convencidas de que su pobreza es «el destino, así no más»",
        "Votación del centro de estudiantes con un ganador claro",
        "Una directiva que nunca incluye en la tabla un tema incómodo",
        "Publicidad que nos hace desear cosas que no necesitamos",
        "Un debate en el Congreso entre dos propuestas",
        "Un medio que decide no informar sobre cierto conflicto")),
      abierta("p5",
        "Elige un tema (por ejemplo: uso del celular, publicidad, consumo, estereotipos de género, deporte, música) y explica cómo podría operar el poder en cada una de las tres dimensiones. ¿Cuál dimensión es la más difícil de detectar y por qué?",
        "Aplica correctamente las tres dimensiones al mismo tema y argumenta cuál es la menos visible."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c07",
    numero: 7,
    titulo: "Capital y violencia simbólica",
    autor: "Pierre Bourdieu",
    objetivo: "Explicar los conceptos de capital cultural y violencia simbólica, y aplicarlos a la escuela.",
    texto: [
      "El sociólogo francés Pierre Bourdieu (1930–2002) amplió la idea de capital. Además del capital económico (dinero, bienes), existe el capital cultural (conocimientos, forma de hablar, libros en casa, títulos), el capital social (redes de contactos) y el capital simbólico (prestigio, reconocimiento).",
      "Cada persona incorpora, desde la infancia, un habitus: un conjunto de disposiciones —gustos, maneras de moverse, de hablar, de pensar— que reflejan el lugar social donde creció. El habitus hace que ciertas cosas nos parezcan «naturales» y otras «raras» o «no para mí».",
      "Bourdieu llama violencia simbólica a la dominación que se ejerce con la complicidad de quienes la sufren, porque aceptan como naturales las categorías y valores de los grupos dominantes. No hay golpes ni amenazas: hay una jerarquía que se vive como evidente.",
      "La escuela es para Bourdieu un lugar clave. Aunque se presenta como neutral y meritocrática, tiende a premiar el capital cultural que algunos estudiantes ya traen de sus casas, y lo presenta como «talento» o «esfuerzo personal». Así, puede reproducir desigualdades mientras parece corregirlas.",
    ],
    lectura: {
      referencia: "Bourdieu, P. y Passeron, J.-C. (1964). Los herederos. Los estudiantes y la cultura, cap. 1. Buenos Aires: Siglo XXI.",
      indicacion: "Identifica qué ventajas tienen los «herederos» y por qué no se perciben como ventajas.",
    },
    memorice: [["Violencia simbólica", "Dominación aceptada"], ["Habitus", "Gustos y maneras aprendidas"], ["Capital cultural", "Saberes y títulos"], ["Escuela", "Puede reproducir desigualdad"]],
    desafios: [
      sel("p1", "La violencia simbólica es…", [
        "La violencia física representada en películas.",
        "Una dominación que se acepta como natural, con la complicidad de quienes la sufren.",
        "La destrucción de símbolos patrios.",
        "La agresión verbal en redes sociales.",
      ]),
      sel("p2", "¿Cuál de estos es un ejemplo de capital cultural?", [
        "Una cuenta bancaria con ahorros.",
        "Un auto nuevo.",
        "Haber crecido con muchos libros en casa y una forma de hablar valorada por la escuela.",
        "Tener muchos seguidores en redes sociales.",
      ]),
      sel("p3", "Según Bourdieu, la escuela puede…", [
        "Eliminar por completo todas las desigualdades sociales.",
        "Reproducir desigualdades presentándolas como diferencias de mérito o talento.",
        "No tener ninguna relación con las desigualdades.",
        "Distribuir el capital económico de forma igualitaria.",
      ]),
      emparejar("p4", "🎁 Juego: une cada concepto de Bourdieu con su ejemplo.", it("Capital económico", "Capital cultural", "Capital social", "Capital simbólico", "Habitus"), [
        "Red de contactos y «pitutos»",
        "Disposiciones incorporadas desde la infancia",
        "Dinero, ahorros y propiedades",
        "Prestigio y reconocimiento",
        "Títulos, libros en casa, forma de hablar"]),
      abierta("p5",
        "¿Es una prueba estandarizada de acceso a la universidad (como la PAES) una medida neutral del mérito? Responde usando los conceptos de capital cultural y violencia simbólica. Incluye al menos un argumento a favor de este tipo de pruebas y uno en contra.",
        "Usa ambos conceptos con precisión y presenta argumentos a favor y en contra antes de concluir."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c08",
    numero: 8,
    titulo: "El estado de excepción",
    autor: "Giorgio Agamben",
    objetivo: "Comprender la tesis de Agamben sobre el estado de excepción y evaluarla críticamente.",
    texto: [
      "El jurista alemán Carl Schmitt sostuvo que el soberano es quien decide sobre la excepción: quien puede suspender el orden jurídico normal en nombre de una emergencia. El filósofo italiano Giorgio Agamben (n. 1942) retoma esta idea para lanzar una advertencia.",
      "Para Agamben, el estado de excepción —suspender derechos para supuestamente proteger el orden— tiende a dejar de ser excepcional y a convertirse en una técnica normal de gobierno. Las medidas «temporales» se prolongan, se renuevan y terminan formando parte del paisaje.",
      "Agamben usa la figura antigua del homo sacer para hablar de la «nuda vida»: una vida despojada de protección jurídica, que puede ser eliminada o maltratada sin que eso sea considerado delito. Para él, el «campo» (de concentración, de refugiados, de detención) es el lugar donde la excepción se vuelve permanente y las personas quedan reducidas a nuda vida.",
      "La tesis de Agamben es polémica. Sus críticos señalan que exagera y que no distingue suficientemente entre democracias y dictaduras; sus intervenciones de 2020 contra las medidas sanitarias fueron muy cuestionadas. Sus defensores responden que su valor está en obligarnos a vigilar los poderes de emergencia, incluso cuando parecen justificados.",
    ],
    lectura: {
      referencia: "Agamben, G. (2003). Estado de excepción. Homo sacer II, 1, cap. 1: «El estado de excepción como paradigma de gobierno». Buenos Aires: Adriana Hidalgo.",
      indicacion: "Anota tres ejemplos históricos que menciona Agamben y qué tienen en común.",
    },
    memorice: [["Schmitt", "Soberano decide la excepción"], ["Estado de excepción", "Suspender el derecho"], ["Nuda vida", "Vida sin protección jurídica"], ["Homo sacer", "Figura del antiguo derecho romano"]],
    desafios: [
      sel("p1", "Según Carl Schmitt, retomado por Agamben, el soberano es…", [
        "Quien gana las elecciones con mayoría.",
        "Quien decide sobre el estado de excepción.",
        "Quien tiene más dinero en un país.",
        "El pueblo reunido en asamblea.",
      ]),
      sel("p2", "La tesis central de Agamben sobre el estado de excepción es que…", [
        "Nunca debe usarse bajo ninguna circunstancia.",
        "Solo existió en la Antigüedad romana.",
        "Tiende a volverse una técnica normal y permanente de gobierno.",
        "Fortalece siempre los derechos ciudadanos.",
      ]),
      sel("p3", "La «nuda vida» designa…", [
        "Una vida dedicada a la contemplación filosófica.",
        "Una vida despojada de protección jurídica.",
        "La vida en contacto con la naturaleza.",
        "La vida privada de los gobernantes.",
      ]),
      ordenar("p4", "🎁 Juego: ordena los pasos del argumento de Agamben, del primero al último.", it(
        "Las medidas se renuevan una y otra vez",
        "Se declara una emergencia o amenaza grave",
        "La excepción se vuelve una técnica normal de gobierno",
        "Se suspenden derechos «solo por un tiempo»")),
      abierta("p5",
        "Chile ha decretado estados de excepción constitucional en distintos momentos (por ejemplo, en octubre de 2019, durante la pandemia en 2020 y en la llamada Macrozona Sur). Elige uno, investiga brevemente cuál fue su justificación, y usa a Agamben para evaluar si existe el riesgo de que la excepción se vuelva normal. Presenta también al menos un argumento a favor de esa medida.",
        "Investiga con datos básicos correctos, aplica la tesis de Agamben y considera argumentos en ambos sentidos."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c09",
    numero: 9,
    titulo: "Rendimiento y psicopolítica",
    autor: "Byung-Chul Han",
    objetivo: "Analizar la crítica de Han a la sociedad del rendimiento y al poder «amable» de lo digital.",
    texto: [
      "El filósofo surcoreano-alemán Byung-Chul Han (n. 1959) sostiene que ya no vivimos en la sociedad disciplinaria que describía Foucault, regida por prohibiciones y el verbo «deber». Vivimos en una sociedad del rendimiento, regida por el verbo «poder»: «tú puedes», «sé tu mejor versión», «just do it».",
      "El sujeto del rendimiento no necesita un vigilante externo: se explota a sí mismo creyendo que se está realizando. Es a la vez amo y esclavo. Por eso, dice Han, las enfermedades típicas de nuestra época no son infecciosas sino neuronales: agotamiento, depresión, síndrome de burnout.",
      "En Psicopolítica (2014) agrega que el poder actual es «inteligente» o «amable»: en vez de prohibir, seduce; en vez de reprimir, nos invita a participar, compartir, comentar y dar «me gusta». Las plataformas digitales recopilan nuestros datos para conocer y orientar nuestras emociones y decisiones. La libertad misma se convierte en un medio de dominación, porque nos sentimos libres mientras hacemos exactamente lo que el sistema necesita.",
      "Han también recibe críticas: generaliza mucho, aporta poca evidencia empírica y a veces parece ignorar que muchas personas todavía viven bajo formas muy duras de control y coacción. Aun así, sus libros breves se han vuelto una referencia para pensar la vida digital.",
    ],
    lectura: {
      referencia: "Han, B.-C. (2012). La sociedad del cansancio, cap. «Más allá de la sociedad disciplinaria». Barcelona: Herder. Complemento: Psicopolítica (2014), cap. 1.",
      indicacion: "Haz un cuadro comparativo: sociedad disciplinaria (Foucault) vs. sociedad del rendimiento (Han).",
    },
    memorice: [["Han", "Sociedad del cansancio"], ["Rendimiento", "Autoexplotación"], ["Psicopolítica", "Poder que seduce"], ["Big data", "Conocer y orientar emociones"]],
    desafios: [
      sel("p1", "¿Qué diferencia a la sociedad del rendimiento de la sociedad disciplinaria, según Han?", [
        "En la sociedad del rendimiento hay más cárceles.",
        "En la sociedad del rendimiento el sujeto se autoexplota bajo la apariencia de libertad.",
        "La sociedad del rendimiento no tiene ninguna forma de poder.",
        "Son exactamente iguales.",
      ]),
      sel("p2", "El «poder inteligente» o psicopolítico se caracteriza por…", [
        "Prohibir y castigar con dureza.",
        "Seducir y aprovechar nuestras emociones y datos en vez de reprimir.",
        "Usar solo la fuerza militar.",
        "Basarse en la tradición.",
      ]),
      sel("p3", "¿Cuál es un buen ejemplo de psicopolítica?", [
        "Una app que te premia con «rachas» y te recomienda contenido según tus emociones para que no dejes de usarla.",
        "Un policía que multa a un conductor.",
        "Un rey medieval que cobra impuestos.",
        "Una votación a mano alzada.",
      ]),
      clasificar("p4", "🎁 Juego: ¿Foucault o Han? Clasifica cada rasgo.", ["Sociedad disciplinaria (Foucault)", "Sociedad del rendimiento (Han)"], it(
        "«Tú puedes», «sé tu mejor versión»",
        "«Debes», «no está permitido»",
        "Un vigilante externo que controla",
        "Autoexplotación que se vive como libertad",
        "Prisiones, cuarteles y fábricas",
        "Agotamiento, depresión y burnout")),
      abierta("p5",
        "Analiza una red social o aplicación que uses habitualmente. ¿Qué mecanismos usa para que sigas conectado/a? ¿Reconoces en ella la «psicopolítica» de Han? Finalmente, señala en qué aspecto NO estás de acuerdo con Han y por qué.",
        "Describe mecanismos concretos, los conecta con los conceptos de Han y formula una crítica propia argumentada."),
    ],
  },
  // ------------------------------------------------------------------
  {
    id: "c10",
    numero: 10,
    titulo: "Síntesis: el poder hoy",
    autor: "Desafío integrador",
    objetivo: "Integrar los conceptos del curso para analizar un caso actual desde varios autores.",
    texto: [
      "Llegamos al final del recorrido. Hemos visto que el poder puede entenderse como capacidad de imponerse (Dahl, Weber), como acción colectiva (Arendt), como red de técnicas que producen sujetos (Foucault), como algo que opera en tres niveles de visibilidad (Lukes), como dominación simbólica aceptada (Bourdieu), como suspensión del derecho (Agamben) o como seducción y autoexplotación (Han).",
      "Ninguno de estos autores tiene «la» respuesta. Cada uno ilumina algo y deja algo en la sombra. Weber nos ayuda a entender por qué obedecemos; Arendt, por qué las personas unidas pueden cambiar las cosas; Foucault, cómo la escuela o el hospital moldean nuestros cuerpos; Lukes, por qué a veces no protestamos; Bourdieu, por qué la desigualdad parece natural; Agamben, por qué hay que desconfiar de las emergencias permanentes; Han, por qué estamos tan cansados.",
      "Hoy aparecen nuevas formas de poder que ningún autor alcanzó a ver del todo: algoritmos que deciden qué noticias vemos, inteligencias artificiales, plataformas globales más grandes que muchos Estados, crisis climáticas que exigen decisiones colectivas. Las herramientas que aprendiste te sirven para analizarlas críticamente.",
      "En este desafío final elegirás un caso actual y lo analizarás con al menos tres autores del curso. No se trata de repetir definiciones, sino de mostrar que puedes usarlas para pensar.",
    ],
    lectura: {
      referencia: "Repaso de tus apuntes y lecturas de las clases 1 a 9. Para el caso, usa al menos una fuente periodística confiable.",
      indicacion: "Antes de escribir, haz un esquema: caso → autor 1 → autor 2 → autor 3 → tu conclusión.",
    },
    memorice: [["Poder sobre", "Imponerse"], ["Estado", "Monopolio de la violencia"], ["Panóptico", "Bentham"], ["No-decisión", "Control de agenda"]],
    desafios: [
      sel("p1", "¿Qué autor sostiene que la violencia puede destruir el poder, pero nunca crearlo?", [
        "Max Weber.",
        "Hannah Arendt.",
        "Byung-Chul Han.",
        "Pierre Bourdieu.",
      ]),
      sel("p2", "El concepto de «panóptico» como modelo de poder disciplinario corresponde a…", [
        "Michel Foucault.",
        "Steven Lukes.",
        "Giorgio Agamben.",
        "Robert Dahl.",
      ]),
      sel("p3", "¿Qué autor plantea que el poder más eficaz es el que moldea los deseos para que ni siquiera surja el conflicto?", [
        "Hannah Arendt.",
        "Max Weber.",
        "Steven Lukes.",
        "Carl Schmitt.",
      ]),
      emparejar("p4", "🎁 Juego final: une cada autor con su idea clave.", it("Max Weber", "Hannah Arendt", "Michel Foucault", "Steven Lukes", "Pierre Bourdieu", "Giorgio Agamben", "Byung-Chul Han"), [
        "Violencia simbólica",
        "Tres dimensiones del poder",
        "Tres tipos de dominación legítima",
        "Sociedad del cansancio",
        "Poder como acción concertada",
        "Estado de excepción y nuda vida",
        "Panóptico y biopoder"]),
      abierta("p5",
        "ENSAYO FINAL (350–500 palabras). Elige un caso actual de poder (por ejemplo: algoritmos en redes sociales, una movilización social, una institución educativa, la inteligencia artificial, un estado de excepción, la publicidad, el deporte profesional). Analízalo con al menos TRES autores del curso. Estructura: (1) presentación del caso con una fuente, (2) análisis con cada autor, (3) comparación entre ellos: ¿qué ilumina cada uno y qué deja fuera?, (4) conclusión con tu postura.",
        "Caso bien presentado y con fuente; uso preciso de tres autores; comparación crítica; conclusión propia y argumentada.",
        10, 300),
    ],
  },
];

export const claseById = (id) => CLASES.find((c) => c.id === id);
export const maxPuntosClase = (c) => c.desafios.reduce((s, d) => s + d.puntos, 0);
export const maxPuntosCurso = () => CLASES.reduce((s, c) => s + maxPuntosClase(c), 0);
