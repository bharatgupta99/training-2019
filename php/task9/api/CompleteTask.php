<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $id = $_POST['id'];

    $sql = "UPDATE todoCollection SET isCompleted=1 WHERE id=".$id;
    $conn->query($sql);

    disconnect();
?>