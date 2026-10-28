// CONFIGURACIÓN DEL NEGOCIO: completa estos datos antes de publicar para un cliente real.
const CONFIG = {
  nombre: "Royal Cuts",
  whatsapp: "", // Formato internacional, solo números. Ejemplo Colombia: 573001234567
  direccion: "",
  dias: "Lunes a sábado",
  horario: "",
  instagram: "" // Usuario sin @
};

const $ = (selector) => document.querySelector(selector);
const year = $("#year");
const whatsappButton = $("#whatsapp-button");
const bookingNote = $("#booking-note");
const addressText = $("#address-text");
const mapsLink = $("#maps-link");
const businessDays = $("#business-days");
const businessHours = $("#business-hours");
const instagramLink = $("#instagram-link");
const menuToggle = $("#menu-toggle");
const mainNav = $("#main-nav");

if (year) year.textContent = new Date().getFullYear();
document.title = `${CONFIG.nombre} — The Art of Grooming`;

if (businessDays) businessDays.textContent = CONFIG.dias;
if (businessHours) businessHours.textContent = CONFIG.horario || "Horario por configurar";

if (CONFIG.direccion.trim()) {
  addressText.textContent = CONFIG.direccion;
  mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.direccion)}`;
  mapsLink.target = "_blank";
  mapsLink.rel = "noopener noreferrer";
} else {
  addressText.textContent = "Dirección por configurar";
  mapsLink.hidden = true;
}

const usuarioInstagram = CONFIG.instagram.replace(/^@/, "").trim();
if (usuarioInstagram) {
  instagramLink.href = `https://www.instagram.com/${usuarioInstagram}/`;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
} else {
  instagramLink.hidden = true;
}

if (whatsappButton) {
  whatsappButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!/^\d{10,15}$/.test(CONFIG.whatsapp)) {
      bookingNote.textContent = "Demo de portafolio: configura el número de WhatsApp del negocio para activar las reservas.";
      bookingNote.classList.add("booking-note-alert");
      return;
    }
    const message = encodeURIComponent(`Hola, quisiera reservar una cita en ${CONFIG.nombre}.`);
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  });
}

// Menú móvil accesible.
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", isOpen);
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("menu-open");
    });
  });
}

// Animaciones discretas al aparecer en pantalla; contenido visible si el navegador no lo soporta.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
