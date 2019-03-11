<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <title>Document</title>
</head>

<body>
    <?php   
        if (!isset($_SESSION["todoCollection"]))
        $_SESSION["todoCollection"] = [];
    ?>

    <div class="heading d-flex justify-content-center align-items-center w-100">My Todo</div>

    <div class="container mt-5 text-center">
        <form method="POST" action="storeItem.php">
            <input class="w-50 form-control ml-auto mr-auto" name="item" type="text" placeholder="Todo here..." required><br>
            <button class="btn btn-primary mt-2" type="submit">Submit</button>
        </form>
    </div>

    <div class="container w-50 mt-4">
        <ul>
            <?php for($i = 0; $i < sizeof($_SESSION["todoCollection"]); $i++) { ?>
            <li class="d-flex justify-content-between mt-2">
                <div contenteditable="false" id="caption-<?php echo $i ?>">
                    <?php if($_SESSION["todoCollection"][$i]["isCompleted"]) { ?>
                        <strike><?php echo $_SESSION["todoCollection"][$i]["caption"]; ?></strike>
                    <?php } else {?>
                        <?php echo $_SESSION["todoCollection"][$i]["caption"]; ?>
                    <?php } ?>    
                </div>
                <div>
                    <button class="btn btn-danger" id="remove-<?php echo $i ?>" onclick=" removeRemove(<?php echo $i; ?>) ">Remove</button>
                    <?php if($_SESSION["todoCollection"][$i]["isCompleted"]) { ?>
                        <button class="btn btn-warning" id="strike-<?php echo $i ?>" onclick=" removeStrike(<?php echo $i; ?>) " disabled>Strike</button>
                        <button class="btn btn-info" id="edit-<?php echo $i ?>" onclick=" edit(<?php echo $i; ?>) " disabled>Edit</button>
                    <?php } else {?>
                        <button class="btn btn-warning" id="strike-<?php echo $i ?>" onclick=" removeStrike(<?php echo $i; ?>) ">Strike</button>
                        <button class="btn btn-info" id="edit-<?php echo $i ?>" onclick=" edit(<?php echo $i; ?>) ">Edit</button>
                    <?php } ?>
                    
                </div>
            </li>
            <?php } ?>
        </ul>
    </div>

    <script>
        function removeRemove(i) {
            location.href = 'removeItem.php?index=' + i;
        }
        function removeStrike(i) {
            location.href = 'completeItem.php?index=' + i;
        }
        function edit(i) {
            var editBtn = document.getElementById("edit-" + i);
            var task = document.getElementById("caption-" + i);
            if (editBtn.innerHTML == "Edit") {
                task.setAttribute("contenteditable", true);
                task.focus();
                editBtn.innerHTML = "Save";
            } else {
                task.setAttribute("contenteditable", false);
                editBtn.innerHTML = "Edit";
                location.href = 'editItem.php?caption=' + task.innerHTML + '&index=' + i;
            }
        }
    </script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</body>

</html>