// =====================================================================
//  1) Pega aquí la configuración de tu app web de Firebase
//     (Consola Firebase → Configuración del proyecto → Tus apps → Web).
//     Estos valores NO son secretos: la seguridad la dan firestore.rules.
// =====================================================================
export const firebaseConfig = {
  apiKey: "AIzaSyCqKwFLQ5MEnpRjDxf-fPpwmrLsVfBxE4k",
  authDomain: "elpoderfilosofia.firebaseapp.com",
  projectId: "elpoderfilosofia",
  storageBucket: "elpoderfilosofia.firebasestorage.app",
  messagingSenderId: "455370954140",
  appId: "1:455370954140:web:d0fd9c60b41f330c982459",
};

// =====================================================================
//  2) Correos de docentes (deben coincidir con los de firestore.rules).
//     Esto solo controla qué se MUESTRA; la protección real está en las reglas.
// =====================================================================
export const DOCENTES = [
  "fdelgadillo@colegioquillotaterranova.cl",
];

// Opcional: restringir el ingreso a un dominio (ej. "@micolegio.cl"). Vacío = cualquiera.
export const DOMINIO_PERMITIDO = "";
