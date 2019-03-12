<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body>
    <?php
        require "connection.php";

        $conn = connect("127.0.0.1", "root", "goldtree9", "todos");

        $sql = "SELECT * FROM todoCollection";
        $result = $conn->query($sql);
    ?>

<div class="heading d-flex justify-content-center align-items-center w-100">My Todo</div>

<div class="container mt-5 text-center">
    <form method="POST" action="submit.php">
        <input class="w-50 form-control ml-auto mr-auto" name="caption" type="text" placeholder="Todo here..." required><br>
        <button class="btn btn-primary mt-2" type="submit">Submit</button>
    </form>
</div>

    <div class="container w-50 mt-4">
        <ul>
            <?php 
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
            ?>

            <li class="d-flex justify-content-between mt-2">
                <div contenteditable="false" id="caption-<?php echo $row['id']; ?>" onfocusout=" focuslost(<?php echo $row['id']; ?>) ">
                    <?php if($row['isCompleted']) { ?>
                        <strike><?php echo $row['caption']; ?></strike>
                    <?php } else {?>
                        <?php echo $row['caption']; ?>
                    <?php } ?>    
                </div>
                <div>
                    <button class="btn btn-danger" id="remove-<?php echo $row['id']; ?>" onclick=" removeRemove(<?php echo $row['id']; ?>) ">Remove</button>
                    <?php if($row['isCompleted']) { ?>
                        <button class="btn btn-warning" id="strike-<?php echo $row['id']; ?>" onclick=" removeStrike(<?php echo $row['id']; ?>) " disabled>Strike</button>
                        <button class="btn btn-info" id="edit-<?php echo $row['id']; ?>" onclick=" edit(<?php echo $row['id']; ?>) " disabled>Edit</button>
                    <?php } else {?>
                        <button class="btn btn-warning" id="strike-<?php echo $row['id']; ?>" onclick=" removeStrike(<?php echo $row['id']; ?>) ">Strike</button>
                        <button class="btn btn-info" id="edit-<?php echo $row['id']; ?>" onclick=" edit(<?php echo $row['id']; ?>) ">Edit</button>
                    <?php } ?>
                    
                </div>
            </li>

            <?php   } 
                }
            ?>
        </ul>
    </div>

    <script>
        var t = null;
        function removeRemove(i) {
            location.href = 'remove.php?id=' + i;
        }
        function removeStrike(i) {
            location.href = 'done.php?id=' + i;
        }
        function edit(i) {
            let editBtn = document.getElementById("edit-" + i);
            let task = document.getElementById("caption-" + i);
            if (editBtn.innerHTML == "Edit") {
                t = task.innerHTML;
                task.setAttribute("contenteditable", true);
                task.focus();
                editBtn.innerHTML = "Save";
            } 
        }
        
        function focuslost(i) {
            let editBtn = document.getElementById("edit-" + i);
            let task = document.getElementById("caption-" + i);
            task.setAttribute("contenteditable", false);
            editBtn.innerHTML = "Edit";
            location.href = 'edit.php?caption=' + task.innerHTML + '&id=' + i;
        }

    </script>

    <?php
        disconnect();
    ?>

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