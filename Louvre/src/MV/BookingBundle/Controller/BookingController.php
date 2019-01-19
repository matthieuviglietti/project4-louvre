<?php

namespace MV\BookingBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MV\BookingBundle\Entity\User;

class BookingController extends Controller
{
    public function indexAction()
    {
        return $this->render('@MVBooking/Default/index.html.twig');
    }

    public function translationAction(Request $request)
    {
        $locale = $request->getLocale();
        return $this->render('@MVBooking/Default/date.html.twig', array(
            "locale" => $locale
        ));
    }

    public function howManyAction(Request $request, $date){
        $locale = $request->getLocale();
        return $this->render('@MVBooking/Default/howMany.html.twig', array(
            "locale" => $locale,
            "date" => $date
        ));
    }

    public function userAction(Request $request, $date, $nbr){
        $locale = $request->getLocale();
        $user = new User;
            return $this->render('@MVBooking/Default/users.html.twig', array(
                "locale" => $locale,
                "date" => $date,
                "nbr" => $nbr
            ));
    }
    
}
