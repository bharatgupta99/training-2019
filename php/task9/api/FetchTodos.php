<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");
    
    $id = $_GET['id'];
    if ($id) {
        $sql = "SELECT * FROM todoCollection WHERE id=".$id;
    } else {
        $sql = "SELECT * FROM todoCollection";
    }
    $result = $conn->query($sql);

    $return = [];


    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            array_push($return, ['id' => $row['id'], "caption" => $row['caption'], "isCompleted" => $row['isCompleted']]);
        }
    }
    echo json_encode($return);
    
    disconnect();
?>