<?php

    require "Connection.php";

    $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

    $caption = $_POST['caption'];
    $id = $_POST['id'];

    $sql = "UPDATE todoCollection SET caption='".$caption."' WHERE id=".$id;
    $res = $conn->query($sql);
    
    disconnect();
?>