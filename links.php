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
        $dataId = 0;
        foreach ($data as $characterData){
            $dataId++;
            $character = $characterData['attributes'];
            $name = $character['name'];
            showImage($character, $name, $dataId);
        }
        echo "</div>";
    }
    

    function showImage($character, $name, $dataId){
        
        foreach($character as $attributeName => $attribute){
            if ($attributeName == 'image'){
                if ($attribute == null){
                    $srcImage = 'https://images7.alphacoders.com/135/thumb-1920-1353023.png';
                }else{
                    $srcImage = $attribute;
                }
                echo "<div class='container-img-info'><img src='$srcImage' class='img-info' id='$dataId' onclick='getCharacterData(this)'><p>$name $dataId</p></div>";
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