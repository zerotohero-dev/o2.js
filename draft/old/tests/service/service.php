<?php
/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 */

/**
 *
 */
class Request {

    /**
     *
     */
    public static function get_item($name) {
        return isset($_POST[$name]) ? $_POST[$name] : (
                isset($_GET[$name]) ? $_GET[$name] : null
            );
    }
}

/**
 *
 */
class PageController {

    /**
     *
     */
    public static function load_page() {
        $options = Request::get_item('options');
        $error = Request::get_item('error');
        $echo = Request::get_item('echo');
        $wait = Request::get_item('wait');

        if($wait) {
            sleep(5);
        }

        if ($options) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
            header('Access-Control-Max-Age: 1000');
            header('Access-Control-Allow-Headers: *');
        }

        if ($error) {
            header('HTTP/1.1 500 Internal Server Error');
            return;
        }

        if ($echo) {
            echo Request::get_item('data');
            return;
        }

        echo '0';
    }
}

PageController::load_page();
?>
