<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $id = $_POST['id'];

    $sql = "DELETE FROM todoCollection WHERE id=".$id;
    if ($conn->query($sql) === TRUE) {
        echo json_encode("Success");
    } else {
        echo json_encode("Error" . $conn->error);
    }

    disconnect();
?>