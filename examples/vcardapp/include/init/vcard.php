<?php
    namespace o2js\vcardapp\init;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-03 14:34:34.133571
     * -->
     */

    use \o2js\vcardapp\state\State;
    use \o2js\vcardapp\config\constants\PageTitle;
    use \o2js\vcardapp\config\constants\PageEnum;

    State::$currentPageTitle = PageTitle::VCARD;
    State::$currentPageEnum  = PageEnum::VCARD;
?>
