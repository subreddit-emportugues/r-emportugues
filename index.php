<?php

ini_set('max_execution_time', 3600);

foreach (file('subreddits.txt', FILE_IGNORE_NEW_LINES) as &$line) {
    $json = json_decode(file_get_contents('https://www.reddit.com/'. $line . '/about.json'), true);
    $name = $json['data']['display_name_prefixed'];
    $description = $json['data']['public_description'];
    $subs = $json['data']['subscribers'];
    $subscribers[] = $subs;
    $names[] = $name;
    $descriptions[] = $description;
    sleep(1);
}

array_multisort($subscribers, SORT_DESC, $names, $descriptions);

for ($i = 0; $i < count($subscribers); $i++) {
    echo '| ' . $subscribers[$i] . ' | ' . $names[$i] . ' | ' . $descriptions[$i] . ' |<br>';
}