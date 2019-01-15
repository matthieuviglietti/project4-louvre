<?php

namespace MV\BookingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('MVBookingBundle:Default:index.html.twig');
    }
}
