<?php

function main() {
    $k_build_reg_exp = '@#\d*#@';
    $k_o2_file_path = dirname(__DIR__).'/o2.js/o2.js';
    $k_hash = '#';

    file_put_contents(
        $k_o2_file_path,
        preg_replace(
            $k_build_reg_exp,
            $k_hash.time().$k_hash,
            file_get_contents($k_o2_file_path)
        )
    );
}

main();
