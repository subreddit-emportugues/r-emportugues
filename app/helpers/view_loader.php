<?php

require_once "file_loader.php";

function loadTemplate($template) {
    return loadFile(__DIR__."/../views/{$template}.html");
}

function loadView($view, $html) {
    return str_replace("{% {$view} %}", loadFile(__DIR__."/../views/{$view}.html"), $html);
}