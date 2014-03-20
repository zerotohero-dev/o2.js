<?php
    namespace o2js\vcardapp\config\constants;

    /*
     * <!--
     *  This program is distributed under
     *  the terms of the MIT license.
     *  Please see the LICENSE file for details.
     *
     *  lastModified: 2012-03-03 08:36:26.620608
     * -->
     */

    class PageTitle {
        const ABSENT = 'o2js.com - VCard Demo';
        const INDEX  = 'o2js.com - Welcome to VCard Demo';
        const VCARD  = 'o2js.com - VCard Demo - Profile of "{0}"';
    };

    class PageEnum {
        const ABSENT = 0;
        const INDEX  = 1;
        const VCARD  = 2;
    };

    class ServiceKey {
        const USER_NAME = 'u';
    };

    class Path {
        const VCARD_DATA = '/o2.js/examples/vcardapp/include/persistence/data/{0}/vcard.html';
    };

    class RegExp {
        const TEMPLATE = '/({\d+})/i';
    };
?>
