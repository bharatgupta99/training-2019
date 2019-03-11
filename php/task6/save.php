<?php
    $content = $_POST['content'];
    $file = fopen("content.txt", "w");
    fwrite($file, $content);
    fclose($file);

    header("Location: index.php")
?>