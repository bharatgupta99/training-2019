<?php
    session_start();
    $i = $_REQUEST['index'];
    $caption = $_REQUEST['caption'];
    $_SESSION['todoCollection'][$i]['caption'] = $caption;
    header("Location: todo.php");
?>