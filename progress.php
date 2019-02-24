<?php
    session_start();
    if(session_id() == '' || !isset($_SESSION["progress"])) {
        echo 'Estado: Parado'; 
    } else {
        echo $_SESSION["progress"];
    }