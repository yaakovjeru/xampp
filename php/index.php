<?php
$handle = fopen ("file.csv","r");
$counter = 0;
$max = 60;

$new_arr = array();

function clean($string) {
    $string = str_replace(array('[\', \']', '"'), '', $string);
    $string = preg_replace('/\[.*\]/U', '', $string);
    $string = strtolower(trim($string, '-'));
    $string = '"'.$string.'"';
    return $string;
 }

while ($data = fgetcsv ($handle, 1000, ";") and ($counter < $max)) {
    //$data = array_map("utf8_encode", $data); //added
    $num = count ($data);
    for ($c=0; $c < $num; $c++) {
        $row = explode('|', $data[0]);
        $mispar_mosah = $row[0];
        $shem_mosah = $row[1];
        $cod_sug_mosah = $row[2];
        $sug_mosah = $row[3];
        $ktovet = $row[4];
        $yishuv = $row[5];
        $telephone = $row[6];
        $mikud = $row[7];
        $cod_miktzoa = preg_replace("/[^0-9]/", "", $row[8]);
        $miktzoa = $row[9];
        $menahel_miktzoa = $row[10];
        $rasham_havarot = $row[11];
        if(in_array($cod_miktzoa, array(190, 194, 170, 172, 173, 21, 160))){
            //print_r($row);
            if (array_search($mispar_mosah, array_column($new_arr, 0)) !== FALSE) {
                $new_arr[$mispar_mosah][9] = clean($new_arr[$mispar_mosah][9]." ".$row[9]);
                //$new_arr[$mispar_mosah][9] = $new_arr[$counter][9].' '.$row[9];
            } else {
                $new_arr[$mispar_mosah] = $row;
            }
            
            //echo $sql = "INSERT INTO list_professional (name, phone, address, ) VALUES ()";
        }
    }
    $counter++;
}

print_r($new_arr);

// Array
// (
//     [0] => mispar_mosah
//     [1] => shem_mosah
//     [2] => cod_sug_mosah
//     [3] => sug_mosah
//     [4] => ktovet
//     [5] => yishuv
//     [6] => telephone
//     [7] => mikud
//     [8] => cod_miktzoa
//     [9] => miktzoa
//     [10] => menahel_miktzoa
//     [11] => rasham_havarot
// )