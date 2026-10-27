
const CONFIG = {
  nombre: "Royal Cuts",
  whatsapp: "", // Número con indicativo, solo números. Ej: 573001234567
  direccion: "", // Ej: Calle 30 # 20-15, Barranquilla
  dias: "Lunes a sábado",
  horario: "", // Ej: 9:00 a. m. - 8:00 p. m.
  instagram: "" // Usuario sin @. Ej: royalcuts
};

const whatsappButton = document.querySelector("#whatsapp-button");
const bookingNote = document.querySelector("#booking-note");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();
document.title = `${CONFIG.nombre} | Barbería Premium`;

const addressText = document.querySelector("#address-text");
const mapsLink = document.querySelector("#maps-link");
const businessDays = document.querySelector("#business-days");
const businessHours = document.querySelector("#business-hours");
const instagramLink = document.querySelector("#instagram-link");

// Mostrar la dirección
if (CONFIG.direccion.trim()) {
  addressText.textContent = CONFIG.direccion;
  mapsLink.href =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.direccion)}`;
  mapsLink.target = "_blank";
  mapsLink.rel = "noopener noreferrer";
} else {
  addressText.textContent = "Dirección por configurar";
  mapsLink.hidden = true;
}

// Mostrar los horarios
businessDays.textContent = CONFIG.dias;
businessHours.textContent = CONFIG.horario || "Horario por configurar";

// Configurar Instagram
const usuarioInstagram = CONFIG.instagram.replace(/^@/, "").trim();

if (usuarioInstagram) {
  instagramLink.href = `https://www.instagram.com/${usuarioInstagram}/`;
  instagramLink.target = "_blank";
  instagramLink.rel = "noopener noreferrer";
} else {
  instagramLink.hidden = true;
}

// Configurar reservas por WhatsApp
whatsappButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!/^\d{10,15}$/.test(CONFIG.whatsapp)) {
    bookingNote.textContent =
      "Esta plantilla necesita un número de WhatsApp válido para recibir reservas.";
    return;
  }

  const mensaje = encodeURIComponent(
    `Hola, quisiera reservar una cita en ${CONFIG.nombre}.`
  );

  window.open(
    `https://wa.me/${CONFIG.whatsapp}?text=${mensaje}`,
    "_blank",
    "noopener,noreferrer"
  );
});
