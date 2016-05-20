<?php
/**
    @name: 数据库中读取Question并获得php数组数据
    @time: 2016/5/20 21:26
**/
require_once('core/class.sqlite3.php');

function readQuestion($db_path, $uid){
	$data = new SQlite( $db_path );
	$msg = $data -> getlist("SELECT * FROM chapter1 where uid=$uid");
    // 获得记录
	$json_parameters  = json_decode($msg[0]['parameters'], true);
    $json_connections = json_decode($msg[0]['connections'], true);
    $json_multiEnable = json_decode($msg[0]['multiEnable'], true);
    $json_questionMsg = json_decode($msg[0]['questionMsg'], true);
    // JSONstring转数组
    $json_data = array(
        "parameters"  => $json_parameters,
        "connections" => $json_connections,
        "multiEnable" => $json_multiEnable,
        "questionMsg" => $json_questionMsg
    );
    // 创建新的数组
    var_dump($json_data);
}

readQuestion('database/books/400/9001.sqlite',4009001);
?>
