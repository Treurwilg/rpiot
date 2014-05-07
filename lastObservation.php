<?php
    $db = new PDO("mysql:dbname=pi;host=localhost","root","GJdI8045");    
    $rows = $db->query("select observationtime, temp_celsius from Temp1
            where observationtime = (select max(observationtime) from Temp1) ");
    $a = array();
    foreach ($rows as $row) {
      $a[0] = $row["observationtime"];
      $a[1] = $row["temp_celsius"];
    }
    $json = json_encode($a);
    print $json;
?>


