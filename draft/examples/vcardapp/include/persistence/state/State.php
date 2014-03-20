<?php
    namespace o2js\vcardapp\state;

    use o2js\vcardapp\config\constants\PageEnum;
    use o2js\vcardapp\config\constants\PageTitle;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-03 12:29:10.789728
     * -->
     */

    class State {
        public static $currentPageTitle = PageTitle::ABSENT;
        public static $currentPageEnum  = PageEnum::ABSENT;
    };
?>
