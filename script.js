
const CONFIG = {
  whatsapp: "", // Número con indicativo, sin + ni espacios
  instagram: "", // Usuario de Instagram, sin @
  direccion: "" // Dirección del negocio
};

const whatsappButton = document.querySelector("#whatsapp-button");
const bookingNote = document.querySelector("#booking-note");

document.querySelector("#year").textContent = new Date().getFullYear();

function abrirWhatsApp(mensaje) {
  if (!/^\d{10,15}$/.test(CONFIG.whatsapp)) {
    bookingNote.textContent =
      "El negocio debe configurar su número de WhatsApp.";
    return;
  }

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

whatsappButton.addEventListener("click", (event) => {
  event.preventDefault();
  abrirWhatsApp("Hola, quisiera reservar una cita en Royal Cuts.");
});
