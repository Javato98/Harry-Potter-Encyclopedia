function getCharacterData(){
    fetch('links.php?fetch_array=true') // Añadimos el parámetro a la URL
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response // Convertir respuesta a JSON
    })
    .then(array => {
        console.log(array); // ["valor1", "valor2", "valor3"]
        alert("Array recibido: " + array.join(', '));
    })
    .catch(error => {
        console.error('Hubo un problema:', error);
        alert('No se pudo cargar el array.');
    });
}

// Función para generar la tabla con los datos del personaje
function generateCharacterTable(character) {
    var tableHtml = '<table class="container">';
    for (var attributeName in character) {
        if (character.hasOwnProperty(attributeName)) {
            var attribute = character[attributeName];
            if (Array.isArray(attribute)) {
                tableHtml += `<tr><td>${attributeName}</td><td><ul>`;
                attribute.forEach(dataAttribute => {
                    tableHtml += `<li>${dataAttribute}</li>`;
                });
                tableHtml += '</ul></td></tr>';
            } else {
                tableHtml += `<tr><td><strong>${attributeName}</strong></td><td><span>${attribute}</span></td></tr>`;
            }
        }
    }
    tableHtml += '</table>';
    return tableHtml;
}

