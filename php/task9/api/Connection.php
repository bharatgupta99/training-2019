<?php

    $conn = NULL;

    function connect($servername, $username, $password, $dbname) {
        
        if ($conn != NULL) {
            return $conn;
        }

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }

    function disconnect() {
        if ($conn != NULL) {
            $conn->close();
        }
    }

?>