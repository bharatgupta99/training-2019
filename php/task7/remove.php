<?php

    require "connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $id = $_REQUEST['id'];

    $sql = "DELETE FROM todoCollection WHERE id=$id";

    if ($conn->query($sql) === FALSE) {
        echo "Error deleting record: " . $conn->error;
    }

    disconnect();

    header("Location: index.php");

?>
