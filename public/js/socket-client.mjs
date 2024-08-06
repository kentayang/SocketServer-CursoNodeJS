const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const client_socket = io();

client_socket.on("connect", () => {
  console.log("Conectado");

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

client_socket.on("disconnect", () => {
  console.log("Desconectado del servidor");

  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

client_socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "ABC123",
    fecha: new Date().getTime(),
  };
  client_socket.emit("enviar-mensaje", payload, (id) => {
    console.log("Desde el server", id);
  });
});
