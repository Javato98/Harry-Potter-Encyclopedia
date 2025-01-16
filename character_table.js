function getitemData(name, item, itemType){
    try {
        // research ya es un objeto JSON, no necesitas fetch
        console.log("Nombre:", name);
        console.log("Datos del ítem:", item);
        document.write("<link rel='stylesheet' href='../styles/table_style.css'>")
        document.write(generateitemTable(item, itemType)) 
        

        // Aquí puedes usar los datos del personaje como desees
        // Por ejemplo, mostrarlos en un modal o en un contenedor HTML
    } catch (error) {
        console.error('Hubo un problema al procesar los datos:', error);
        alert('No se pudo cargar la información del personaje.');
    }
}

// Función para generar la tabla con los datos del personaje
function generateitemTable(item, itemType) {
    let image = item['image']
    if (image == null){
        switch (itemType){
            case "characters":
                image = "../images/no-characters-image.png"
                break
            case "spells":
                image = "../images/no-spells-image.png"
                break
            case "potions":
                image = "../images/no-potions-image.png"
                break
        }
    }
    let tableHtml = `<div class='info'><img src="${image}" class="item-img"/>`
    tableHtml += '<table class="container">';
    let countID = 0
    for (let attributeName in item) {
        countID ++
        if (item.hasOwnProperty(attributeName)) {
            let attribute = item[attributeName];

            if (attribute == '' || attribute == null || attributeName == 'image'){
                continue
            }

            if (Array.isArray(attribute) && attribute.length > 1) {
                let listTags = ['<li>', '</li>', '<ul>', '</ul>']
                if (attribute.length <= 1){
                    listTags[0] = '<span>'
                    listTags[1] = '</span>'
                    listTags[2] = ''
                    listTags[3] = ''
                }
                    
                tableHtml += `<tr><td class="attribute-name" onclick="tDdropdown(${countID})">${prepareStr(attributeName)}</td><td class="dropdown" id="${countID}">${listTags[2]}`;
                attribute.forEach(dataAttribute => {
                    tableHtml += `${listTags[0]}${dataAttribute}${listTags[1]}`;
                });
                tableHtml += `${listTags[3]}</td></tr>`;

            } else {
                if (Array.isArray(attribute)){
                    attribute = attribute[0]
                }
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


function tDdropdown(countID) {

    let dropdown = document.getElementById(countID)
  
    if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    } else {
    dropdown.style.display = "block";
    }
};