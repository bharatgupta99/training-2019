<?php

    $file = file_get_contents('todoCollection.txt');
    $todoCollection = unserialize($file);


    $todo = $_POST['todo'];

    array_push($todoCollection, ['caption' => $todo, 'isCompleted' => false]);

    $todos = serialize($todoCollection);

    file_put_contents('todoCollection.txt', $todos);

    header('Location: index.php')

?>