<?php
const API_URL = "https://api.potterdb.com/v1";
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['searchCharacter'])){
    $name = $_POST['searchCharacter'];
    
    // Función de consulta mejorada con mensajes de depuración
    function getContent($query) {
        $url = API_URL . "/characters?filter[name_cont]=" . urlencode($query);
        $result = file_get_contents($url);
        return json_decode($result, true);
    }


    function searchCharacter($data){
        echo "<div class='gallery'>";
        foreach ($data as $characterData){
            $character = $characterData['attributes'];
            $name = $character['name'];
            showImage($character, $name);
        }
        echo "</div>";
    }
    
    

    function showImage($character, $name){
        
        foreach($character as $attributeName => $attribute){
            if ($attributeName == 'image'){
                if ($attribute == null){
                    $srcImage = 'images/no-wizard-image.png';
                }else{
                    $srcImage = $attribute;
                }

                // Adaptamos las variables para que puedan ser interpretadas por JavaScript
                $characterJson = htmlspecialchars(json_encode($character), ENT_QUOTES, 'UTF-8');
                $nameEscaped = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
                echo "<div class='container-img-info'><img src='$srcImage' class='img-info' onclick='getCharacterData(\"$nameEscaped\", $characterJson)'><p>$name</p></div>";
            }
        }
    }

    $research = getContent($name);

    if (isset($_GET['fetch_array']) && $_GET['fetch_array'] === 'true') {
        header('Content-Type: application/json'); // Indicar que se enviará JSON
        echo json_encode($research); // Devolver el array como JSON
        exit; // Detener la ejecución para evitar enviar el resto del contenido
    }
    
    $researchData = $research['data'];
    $character = searchCharacter($researchData);
}
?>