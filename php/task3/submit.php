<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php 
        $num = $_POST["number"];
        for ($x = 1; $x <= 10; $x++) {
            echo $num." x ".$x." = ".$num*$x."<br>";
        }
    ?>
</body>
</html>