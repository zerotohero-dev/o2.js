<?php
/**
 * Updates the build number of the main file.
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-28 17:03:57.999283
 * -->
 */
function main() {
    $k_build_reg_exp = '@\.000\d*@';
    $k_o2_file_path = dirname(__DIR__).'/o2.js/o2.js';
    $k_marker = '.000';

    file_put_contents(
        $k_o2_file_path,
        preg_replace(
            $k_build_reg_exp,
            $k_marker.time(),
            file_get_contents($k_o2_file_path)
        )
    );
}

main();
