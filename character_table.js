function getCharacterData(name, character){
    try {
        // research ya es un objeto JSON, no necesitas fetch
        console.log("Nombre:", name);
        console.log("Datos del personaje:", character);
        document.write("<link rel='stylesheet' href='styles/table_style.css'>")
        document.write(generateCharacterTable(character)) 

        // Aquí puedes usar los datos del personaje como desees
        // Por ejemplo, mostrarlos en un modal o en un contenedor HTML
    } catch (error) {
        console.error('Hubo un problema al procesar los datos:', error);
        alert('No se pudo cargar la información del personaje.');
    }
}

// Función para generar la tabla con los datos del personaje
function generateCharacterTable(character) {
    let image = character['image']
    let tableHtml = `<div class='info'><img src="${image}" class="character-img"/>`
    tableHtml += '<table class="container">';
    for (let attributeName in character) {
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
    tableHtml += '</table></div>';
    return tableHtml;
}

