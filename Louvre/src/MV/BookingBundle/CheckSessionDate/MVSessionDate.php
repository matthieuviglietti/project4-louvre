<?php

namespace MV\BookingBundle\CheckSessionDate;

use Symfony\Component\HttpFoundation\Request;

class MVSessionDate
{
    public function checkSessionDate(Request $request, $date)
    {
        $status = false;
            try{
                $session = $request->getSession();
                $sessionDate = $session->get('selectedDate');

                if ($sessionDate == $date){
                    $status = true;

                    return $status;
                }
            }
            catch (\Exception $e){
                return $status;
            }
    }
}