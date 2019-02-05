<?php

namespace MV\BookingBundle\Session;

class MVSession
{
    public function getIdOrder(){
        $characts = 'abcdefghijklmnopqrstuvwxyz';
        $characts .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $characts .= '1234567890';
        $code_random = '';

        for($i=0;$i < 10;$i++)
        {
            $code_random .= $characts[ rand() % strlen($characts) ];
        }
        return $code_random;
    }

}