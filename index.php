

<?php

require 'links.php';

?>


<link rel="stylesheet" href="styles/table_style.css">
<link rel="stylesheet" href="styles/styles.css">
<script src="character_table.js"></script>


<form action="" method="POST">
    <input type="text" name="searchCharacter">
    <input type="submit" name="send">
</form>


<!--     
function showCharacter($character){
        echo "<table class='container'>";
        foreach($character as $attributeName => $attribute){
            if (is_array($attribute)){
                echo "<tr><td>$attributeName</td><td><ul>";
                foreach ($attribute as $dataAttribute){
                    echo "<li>$dataAttribute</li>";
                }
                echo '</ul></td></tr>';
            } elseif ($attributeName != 'image') {
                echo "<tr><td><strong>$attributeName</strong></td><td><span>$attribute</span></td></tr>";
            }
        }
        echo "</table>";
    } -->