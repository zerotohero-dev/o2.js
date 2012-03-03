<?php
    namespace o2js\vcardapp\business\manager;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-03 11:48:37.770219
     * -->
     */

    use \o2js\vcardapp\config\constants\Path;
    use \o2js\vcardapp\config\constants\RegExp;

    class VCardManager {
        public static function getVCardHtml($userName) {
            return file_get_contents(
                    $_SERVER['DOCUMENT_ROOT'
                ].preg_replace_callback(
                    RegExp::TEMPLATE,
                    function($match) use ($userName) {
                        return $userName;
                    },
                    Path::VCARD_DATA
                )
            );
        }
    };
?>