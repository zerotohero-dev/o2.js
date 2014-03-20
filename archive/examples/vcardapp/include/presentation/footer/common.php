<?php
    namespace o2js\vcardapp\presentation\footer;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-07 09:42:47.082004
     * -->
     */

     use \o2js\vcardapp\state\State;
     use \o2js\vcardapp\config\constants\PageEnum;
     $pageEnum = State::$currentPageEnum;

     if($pageEnum === PageEnum::INDEX) {
         require("include/presentation/script/index.php");
     }
?>
</body>
</html>