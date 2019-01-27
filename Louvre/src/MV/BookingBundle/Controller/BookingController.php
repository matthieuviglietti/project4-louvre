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

    public function checkOrderAction(Request $request, Response $response, $date, $nbr){

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

        \Stripe\Stripe::setApiKey("sk_test_WFwsGVYMQgKdVdfI6ths0Gom");

        $token = $_POST['stripeToken'];
        $charge = \Stripe\Charge::create([
            'amount' => 1000,
            'currency' => 'eur',
            'source' => '$token',
            'receipt_email' => 'matthieu@example.com',
        ]);


        return $this->render('@MVBooking/Default/checkOrder.html.twig', array(
            'session' => $sessionId,
            "locale" => $locale,
            "date" => $date,
            "nbr" => $nbr,
            "users" => $listActiveUsers,
            "total" => $totalCost
        ));
    }
}