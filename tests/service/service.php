<?php

/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

$options = isset($_POST['options']) ? $_POST['options'] : 0;
$error = isset($_POST['error']) ? $_POST['error'] : 0;

if ($error) {
    header('HTTP/1.1 500 Internal Server Error');
}

if ($options) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: *');
}

echo '0';
?>
