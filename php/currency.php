<?php
$url = 'https://www.cbr.ru/scripts/XML_daily.asp';
if (isset($_GET["chart"])) {
    $date = 'date_req1=01/01/2021&date_req2=01/06/2021';
    if (isset($_GET["start"]) && isset($_GET["end"])) {
        $start = (new DateTime($_GET["start"]))->format('d/m/Y');
        $end = (new DateTime($_GET["end"]))->format('d/m/Y');
        $date = 'date_req1='.$start.'&date_req2='.$end;
    }
    $url = 'https://www.cbr.ru/scripts/XML_dynamic.asp?'.$date.'&VAL_NM_RQ=R01235';
}

$res = file_get_contents($url, false, stream_context_create(array(
    'http' => array(
        'method'  => 'GET',
        'header'  => 'Content-type: text/xml'
    )
)));

$xml = simplexml_load_string($res);
$array = json_encode($xml);

echo $array;