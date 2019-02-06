<?php

namespace MV\BookingBundle\Session;

class MVSession
{
    /**
     * @return bool|string
     */
    public function getIdOrder(){
        try{
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
        catch (\Exception $e){
            return false;
        }

    }

}