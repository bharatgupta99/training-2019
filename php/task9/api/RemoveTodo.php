<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $id = $_POST['id'];

    $sql = "DELETE FROM todoCollection WHERE id=".$id;
    $conn->query($sql);

    disconnect();
?>