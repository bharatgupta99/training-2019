<?php
    session_start();
    $i = $_REQUEST['index'];
    array_splice($_SESSION['todoCollection'],$i,1);
    header("Location: todo.php");
?>