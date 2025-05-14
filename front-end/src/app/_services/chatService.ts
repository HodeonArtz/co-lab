export async function fetchAndGetAllMessages() {
  const response = await fetch("http://localhost:3000/chat/messageslist");
  const data = await response.json();

  // Crea un Blob con el contenido del JSON
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  // Crea una URL del Blob
  const url = URL.createObjectURL(blob);
  return url;
}
