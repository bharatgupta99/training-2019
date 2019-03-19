<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $id = $_POST['id'];
    $isCompleted = $_POST['isCompleted'];

    if ($isCompleted == "0") {
        $sql = "UPDATE todoCollection SET isCompleted=0 WHERE id=".$id;
    } else {
        $sql = "UPDATE todoCollection SET isCompleted=1 WHERE id=".$id;
    }
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode("Success"); 
    } else {
        echo json_encode("Updation Error " . $conn->error);
    }


    disconnect();
?>