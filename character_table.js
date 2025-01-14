function getitemData(name, item){
    try {
        // research ya es un objeto JSON, no necesitas fetch
        console.log("Nombre:", name);
        console.log("Datos del personaje:", item);
        document.write("<link rel='stylesheet' href='../styles/table_style.css'>")
        document.write(generateitemTable(item)) 

        // Aquí puedes usar los datos del personaje como desees
        // Por ejemplo, mostrarlos en un modal o en un contenedor HTML
    } catch (error) {
        console.error('Hubo un problema al procesar los datos:', error);
        alert('No se pudo cargar la información del personaje.');
    }
}

// Función para generar la tabla con los datos del personaje
function generateitemTable(item) {
    let image = item['image']
    let tableHtml = `<div class='info'><img src="${image}" class="item-img"/>`
    tableHtml += '<table class="container">';
    for (let attributeName in item) {
        if (item.hasOwnProperty(attributeName)) {
            let attribute = item[attributeName];

            if (attribute == '' || attribute == null || attributeName == 'image'){
                continue
            }

            if (Array.isArray(attribute)) {
                let listTags = ['<li>', '</li>', '<ul>', '</ul>']
                if (attribute.length <= 1){
                    listTags[0] = '<span>'
                    listTags[1] = '</span>'
                    listTags[2] = ''
                    listTags[3] = ''
                }
                    
                tableHtml += `<tr><td class="attribute-name">${prepareStr(attributeName)}</td><td>${listTags[2]}`;
                attribute.forEach(dataAttribute => {
                    tableHtml += `${listTags[0]}${dataAttribute}${listTags[1]}`;
                });
                tableHtml += `${listTags[3]}</td></tr>`;
            } else {
                if (attributeName == "wiki"){
                    attribute = `<a href="${attribute}" class="link">Pincha aquí para más información sobre ${item['name']}</a>`
                }
                tableHtml += `<tr><td class="attribute-name">${prepareStr(attributeName)}</td><td><span>${prepareStr(attribute)}</span></td></tr>`;
            }

        }
    }
    tableHtml += '</table></div>';
    return tableHtml;
}
    


function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function removeDash(str) {
    str = (str.includes('-')) ? str.replace(/-/g, ' ') :
          (str.includes('_')) ? str.replace(/_/g, ' ') : str;

    return str
}

function prepareStr(str){
    str = capitalizeFirstLetter(str)
    str = removeDash(str)
    return str
}

