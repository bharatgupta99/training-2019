<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $caption = $_POST['caption'];

    $sql = "INSERT INTO todoCollection (caption, isCompleted) VALUES ('$caption', false)";

    if ($conn->query($sql) === TRUE) {
        $sql = "SELECT * FROM todoCollection WHERE id=".$conn->insert_id;
        $return = [];
        $res = $conn->query($sql);
        if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
                array_push($return, ['id' => $row['id'], 'caption' => $row['caption'], 'isCompleted' => $row['isCompleted']]);
            }
        }
        echo json_encode($return);
    } else {    
        echo json_encode("Error " . $conn->error);
    }

    disconnect();
?>