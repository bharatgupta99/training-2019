<?php

    require "connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $caption = $_POST["caption"];
    
    $sql = "INSERT INTO todoCollection (caption, isCompleted) VALUES ('" .$caption."', false)";

    if ($conn->query($sql) == FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    disconnect();

    header("Location: index.php");
    
?>