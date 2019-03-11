<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="submit.php" class="container mt-3 text-center"> 
    <div class="form-group">
        <input type="text" class="form-control w-50 ml-auto mr-auto" id="exampleInputPassword1" placeholder="Todo" name="todo">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <?php

        $file = file_get_contents('todoCollection.txt');
        $todoCollection = unserialize($file);

        if (empty($todoCollection)) {
            file_put_contents('todoCollection.txt', serialize([]));
        }
    ?>
    <ul>
        <?php for ($i = 0; $i < sizeof($todoCollection); $i++) { ?>
            <li><?php echo $todoCollection[$i]['caption'] ?></li>
        <?php } ?>
    </ul>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>