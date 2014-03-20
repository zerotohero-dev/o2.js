<?php
    namespace o2js\vcardapp\presentation\header;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-03 13:01:20.069558
     * -->
     */

    use \o2js\vcardapp\state\State;

    $pageTitle = State::$currentPageTitle;
?>
<!DOCTYPE HTML>
<html>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <title><?php echo  $pageTitle; ?></title>
    <link rel="Stylesheet" type="text/css" href="/vcardapp/css/main.css" />
<head>
</head>
<body>
