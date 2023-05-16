<?php
// src/Utils.php

namespace App\Controller;

class Utils
{
    public static function valid_data($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data, ENT_QUOTES);

        // Allow some special characters commonly found in addresses
        /* $data = preg_replace('/[^a-zA-Z0-9\s\-\'.,#]/', '', $data); */

        return $data;
    }
}
