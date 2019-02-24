<?php

ini_set('max_execution_time', 3600);

session_start();
$_SESSION["progress"] = 'Estado: Iniciando...';
session_write_close();

$progress = 0;

$lines = file('subreddits.txt', FILE_IGNORE_NEW_LINES);
$total = count($lines);

foreach ($lines as &$line) {
    $json = json_decode(file_get_contents('https://www.reddit.com/'. $line . '/about.json'), true);
    $subscribers[] = $json['data']['subscribers'];
    $names[] = $json['data']['display_name_prefixed'];
    $descriptions[] = str_replace("\n", ' ', $json['data']['public_description']);
    $progress = $progress + 1;
    session_start();
    $_SESSION["progress"] = $progress . '/' . $total . ' (' . round((($progress / $total) * 100), 1, PHP_ROUND_HALF_UP) . '%)';
    session_write_close();
    sleep(1);
}

array_multisort($subscribers, SORT_DESC, $names, $descriptions);

for ($i = 0; $i < count($subscribers); $i++) {
    echo '| ' . $subscribers[$i] . ' | ' . $names[$i] . ' | ' . $descriptions[$i] . ' |' . "\n";
}