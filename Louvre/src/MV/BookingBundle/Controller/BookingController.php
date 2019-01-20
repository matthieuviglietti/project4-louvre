<?php

namespace MV\BookingBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MV\BookingBundle\Entity\User;
use MV\BookingBundle\Form\UserType;

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

    public function addUserAction(Request $request, $date, $nbr){
        $locale = $request->getLocale();
        $user = new User;
        $form = $this->createForm(UserType::class, $user);

        if ($request->isMethod('POST') && $form->handleRequest($request)->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
           // return $this->redirectToRoute('', array('id' => $advert->getId()));
          }
            return $this->render('@MVBooking/Default/users.html.twig', array(
                "form" => $form->createView(),
                "locale" => $locale,
                "date" => $date,
                "nbr" => $nbr
            ));
    }
    
}
