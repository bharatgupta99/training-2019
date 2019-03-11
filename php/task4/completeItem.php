<?php
    session_start();
    $i = $_REQUEST['index'];
    $_SESSION['todoCollection'][$i]['isCompleted'] = true;
    header("Location: todo.php");
?>