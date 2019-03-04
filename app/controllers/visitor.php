<?php
//Os pedidos de acesso s�o feitos por Request.js pela Scraper.js.

$subreddit = json_decode($_POST["subreddit"]);

ini_set('max_execution_time', 30);

$json = json_decode(file_get_contents('https://www.reddit.com/'. $subreddit->name . '/about.json'), true);
$subscribers = $json['data']['subscribers'];
$name = $json['data']['display_name_prefixed'];
$description = $json['data']['public_description'];
$description = str_replace(["\n", "\r"], ' ', $description);
$icon = $json['data']['community_icon'];
$nsfw = $json['data']['over18'];
$created = $json['data']['created'];

echo json_encode(
    array(
        "subscribers" => "$subscribers",
        "name" => $name,
        "description" => $description,
        "icon" => $icon,
        "nsfw" => $nsfw,
        "created" => $created
    )
);