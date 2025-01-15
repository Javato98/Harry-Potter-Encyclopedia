<?php
const API_URL = "https://api.potterdb.com/v1";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["search_$type"])) {
    $name = $_POST["search_$type"];
    
    // Función de consulta mejorada con mensajes de depuración
    function getContent($query, $type) {
        $url = API_URL . "/$type?filter[name_cont]=" . urlencode($query);
        $result = file_get_contents($url);
        return json_decode($result, true);
    }


    function searchitem($data, $type){
        echo "<div class='gallery'>";
        foreach ($data as $itemData){
            $item = $itemData['attributes'];
            $name = $item['name'];
            showImage($item, $name, $type);
        }
        echo "</div>";
    }
    
    

    function showImage($item, $name, $type){
        
        foreach($item as $attributeName => $attribute){
            if ($attributeName == 'image'){
                if ($attribute == null){
                    $srcImage = "../images/no-$type-image.png";
                }else{
                    $srcImage = $attribute;
                }

                // Adaptamos las variables para que puedan ser interpretadas por JavaScript
                $itemJson = htmlspecialchars(json_encode($item), ENT_QUOTES, 'UTF-8');
                $nameEscaped = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
                echo "<div class='container-img-info'><img src='$srcImage' class='img-info' onclick='getitemData(\"$nameEscaped\", $itemJson, \"$type\")'><p>$name</p></div>";
            }
        }
    }

    $research = getContent($name, $type);

    if (isset($_GET['fetch_array']) && $_GET['fetch_array'] === 'true') {
        header('Content-Type: application/json'); // Indicar que se enviará JSON
        echo json_encode($research); // Devolver el array como JSON
        exit; // Detener la ejecución para evitar enviar el resto del contenido
    }
    
    $researchData = $research['data'];
    $item = searchitem($researchData, $type);
}
?>