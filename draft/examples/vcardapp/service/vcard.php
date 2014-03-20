<?php
    namespace o2js\vcardapp\rpc\service;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-08 08:04:46.842332
     * -->
     */

    include("../include/config/constants.php");
    include("../include/business/manager/VCardManager.php");

    use o2js\vcardapp\config\constants\ServiceKey;
    use o2js\vcardapp\business\manager\VCardManager;

    echo VCardManager::getVCardHtml($_GET[ServiceKey::USER_NAME]);
?>
