const apiUrl = 'http://159.54.135.174/Apis/consultar_Tiendas.php';

// Configuración de la solicitud
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Realizar la solicitud usando fetch
fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Mostrar los datos en la consola
    console.log('Datos recibidos:', data);
  })
  .catch(error => {
    console.error(`Error al hacer la solicitud a ${apiUrl}:`, error);
  });
