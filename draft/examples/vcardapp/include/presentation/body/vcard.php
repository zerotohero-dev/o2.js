<?php
    namespace o2js\vcardapp\presentation\body;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-03 14:38:33.326135
     * -->
     */

    use o2js\vcardapp\config\constants\ServiceKey;
    use o2js\vcardapp\business\manager\VCardManager;
?>
<div id="VCardContainer">
<?php
    echo VCardManager::getVCardHtml($_GET[ServiceKey::USER_NAME]);
?>
</div>