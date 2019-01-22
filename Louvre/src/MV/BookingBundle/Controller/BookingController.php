<?php

namespace MV\BookingBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MV\BookingBundle\Entity\User;
use MV\BookingBundle\Entity\Ticket;
use MV\BookingBundle\Form\UserType;
use MV\BookingBundle\Form\FormType;
use MV\BookingBundle\Entity\Form;
use Symfony\Component\HttpFoundation\Session\Session;

class BookingController extends Controller
{
    public function indexAction(Request $request)
    {
        $session = $request->getSession();
        $em = $this->getDoctrine()->getManager();
        $userRepository = $em->getRepository(User::class);
        $orderId = $userRepository->getIdOrder();
        $session->set('orderId', $orderId);
        

        return $this->render('@MVBooking/Default/index.html.twig');
    }

    public function translationAction(Request $request)
    {
        $locale = $request->getLocale();
        return $this->render('@MVBooking/Default/date.html.twig', array(
            "locale" => $locale,
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
        $userSession = new User;
        

        $session = $request->getSession();
        $sessionId = $session->get('orderId');
        $userSession->setSessionKey($sessionId);

        $userForm = new Form;

        for ($i= 1; $i<=$nbr; $i++){
            $userForm->addUser(new User);
        }
       
        $form = $this->createForm(FormType::class, $userForm);


        if ($request->isMethod('POST') && $form->handleRequest($request)->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($userForm);
            $em->flush();
          }

          $em = $this->getDoctrine()->getManager();
          $ticketRepository = $em->getRepository(Ticket::class);
          $listTickets = $ticketRepository->findAll();
        
            return $this->render('@MVBooking/Default/users.html.twig', array(
                "form" => $form->createView(),
                "locale" => $locale,
                "date" => $date,
                "nbr" => $nbr,
                "session" => $sessionId,
                "listTickets" => $listTickets
            ));
    }

    public function checkOrder(Request $request, $date, $nbr){

        $locale = $request->getLocale();

        return $this->render('@MVBooking/Default/checkOrder.html.twig', array(
            "form" => $form->createView(),
            "locale" => $locale,
            "date" => $date,
            "nbr" => $nbr,
            "session" => $sessionId
        ));
    }
    
}