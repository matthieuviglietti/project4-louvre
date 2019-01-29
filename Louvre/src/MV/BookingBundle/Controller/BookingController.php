<?php

namespace MV\BookingBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MV\BookingBundle\Entity\User;
use MV\BookingBundle\Entity\Ticket;
use MV\BookingBundle\Entity\Basket;
use MV\BookingBundle\Form\UserType;
use MV\BookingBundle\Form\FormType;
use MV\BookingBundle\Entity\Form;
use MV\BookingBundle\Stripe\MVStripe;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Translation\Loader\ArrayLoader;

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

        $session = $request->getSession();
        $sessionId = $session->get('orderId');
        $userSession = new User;
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

           return $this->redirectToRoute('mv_booking_check', ['date' => $date, 'nbr' =>$nbr]);
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

    public function checkOrderAction(Request $request, $date, $nbr){

        $locale = $request->getLocale();
        
        $session = $request->getSession();
        $sessionId = $session->get('orderId');
       

        $em = $this->getDoctrine()->getManager();
        $userRepository = $em->getRepository(User::class);

        $listActiveUsers = $userRepository->selectUserOrder($sessionId);

        $totalCost = intval(0);
        foreach($listActiveUsers as $users){
            $cost = intval($users->getTicket()->getCost());
            $totalCost += $cost;
        }

        return $this->render('@MVBooking/Default/checkOrder.html.twig', array(
            'session' => $sessionId,
            "locale" => $locale,
            "date" => $date,
            "nbr" => $nbr,
            "users" => $listActiveUsers,
            "total" => $totalCost
        ));
    }

    public function StripeAction(Request $request, $amount){
        
        $this->container->get('mv_booking.stripe')->chargeStripe($amount, $request);
    
        $translator = new Translator('en_EN');
        $translator->addLoader('array', new ArrayLoader());
        $translator->addResource('array', [
                    'Your paiement was accepted, thank you. An email was send to' => 'le paiement a réussi, merci et un email a été envoyé à ',
                     ], 'fr_FR');
        $messageSuccessFrench = $translator->trans('Your paiement was accepted, thank you. An email was send to');
        
        $locale    = $request->getLocale();
        if($locale = 'fr'){
            $this->addFlash('notice', $messageSuccessFrench);
        }
        if($locale = 'en'){
            $this->addFlash('notice', 'Your paiement was accepted, thank you. An email was send to');
        }
       
        return $this->redirectToRoute('mv_booking_confirmation');
       
    }

    public function confirmationOrderAction(Request $request){

        return $this->render('@MVBooking/Default/confirmationOrder.html.twig', array(
          
        ));
    }
}