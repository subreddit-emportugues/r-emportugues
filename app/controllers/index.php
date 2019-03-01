<?php

require_once __DIR__."/../helpers/view_loader.php";

$html = loadTemplate("index");
$html = loadView("heading", $html);
$html = loadView("table", $html);
$html = loadView("progress", $html);
$html = loadView("panel", $html);
$html = loadView("notification", $html);

echo $html;