<?php

namespace MV\BookingBundle\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('@MVBooking/Default/index.html.twig',array(
        'name' => $name));
    }

    public function translationAction(Request $request)
    {
        return $this->render('@MVBooking/Default/index.html.twig');
    }
}
