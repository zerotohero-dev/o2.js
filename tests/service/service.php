<?php

/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

$options = isset($_POST['options']) ? $_POST['options'] : (isset($_GET['options']) ? $_GET['options'] : 0);
$error = isset($_POST['error']) ? $_POST['error'] : (isset($_GET['error']) ? $_GET['error'] : 0);
$echo = isset($_POST['echo']) ? $_POST['echo'] : (isset($_GET['echo']) ? $_GET['echo'] : 0);

if ($options) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: *');
}

if ($error) {
    header('HTTP/1.1 500 Internal Server Error');
    exit;
}

if ($echo) {
    echo isset($_GET['data']) ? $_GET['data'] : $_POST['data'];
    exit;
}

echo '0';
?>
