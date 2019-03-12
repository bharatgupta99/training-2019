<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $caption = $_POST['caption'];

    $sql = "INSERT INTO todoCollection (caption, isCompleted) VALUES ('$caption', false)";
    $res = $conn->query($sql);


    echo json_encode($conn->insert_id);

    
    disconnect();
?>