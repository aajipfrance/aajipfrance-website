// Configuration EmailJS - Exemple
// Copiez ce fichier vers config.js et remplissez vos vraies données
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "VOTRE_API_PUBLIC_KEY_ICI",
    SERVICE_ID: "VOTRE_SERVICE_ID_ICI",
    TEMPLATE_ID: "VOTRE_TEMPLATE_ID_ICI",
    TO_EMAIL: "votre-email@gmail.com"
};

// Exporter la configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}
