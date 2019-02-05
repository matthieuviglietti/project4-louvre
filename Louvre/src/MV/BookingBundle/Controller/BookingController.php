<?php

namespace MV\BookingBundle\Controller;
use MV\BookingBundle\Entity\Command;
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
use Symfony\Component\HttpFoundation\JsonResponse;

class BookingController extends Controller
{

    public function redirectAction(){
       return $this->redirectToRoute('mv_booking_homepage'
       );
    }

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

    public function checkDateAction(Request $request){

        if($request->isMethod('GET')){
            $date = $request->query->get('date');
            $em = $this->getDoctrine()->getManager();
            $userRepository = $em->getRepository(User::class);
            $listVisitors = $userRepository->countUserDay($date);
            $listVisitors= count($listVisitors);
        
            if ($listVisitors < 1000){
            $response = new JsonResponse(true);
            return $response;
            }
            $response = new JsonResponse(false);
            return $response;
        }
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

    public function deleteUserAction(Request $request, $id, $date, $nbr){

       $em = $this->getDoctrine()->getManager();
       $userToDelete = $em->getRepository(User::class)->find($id);
       $em->remove($userToDelete);
       $em->flush();

       $locale = $request->getLocale();
       
        $request->getSession()->getFlashBag()->add('notice', 'Le visiteur a bien été supprimé');

        if($locale == 'fr'){
            return $this->redirectToRoute('mv_booking_check', array(
                'locale' => $locale,
                'date' => $date,
                'nbr' => $nbr
            ));
        }
        if($locale == 'en'){
            return $this->redirectToRoute('mv_booking_check', array(
                'date' => $date,
                'nbr' => $nbr
            ));
        }

    }

    public function StripeAction(Request $request, $amount, $date){

        $em = $this->getDoctrine()->getManager();
        $userRepository = $em->getRepository(User::class);
        $session = $request->getSession();
        $sessionId = $session->get('orderId');
        $locale = $request->getLocale();

        $listActiveUsers = $userRepository->selectUserOrder($sessionId);

        $mail= $this->container->get('mv_booking.stripe')->chargeStripe($amount, $date, $listActiveUsers, $locale, $sessionId);

        $createOrder = new Command();
        $createOrder->setSpecialKey($sessionId)
                    ->setCharge($amount)
                    ->setEmail($mail);
        $em->persist($createOrder);
        $em->flush();
       
        return $this->redirectToRoute('mv_booking_confirmation');
    }

    public function confirmationOrderAction(Request $request){

        $locale = $request->getLocale();

        return $this->render('@MVBooking/Default/confirmationOrder.html.twig', array(
          'locale' => $locale
        ));
    }

    public function cancelOrderAction(Request $request, $sessionId){

        $em = $this->getDoctrine()->getManager();
        $OrderToDelete = $em->getRepository(User::class)->findBy(
            ['sessionKey' => $sessionId]
        );
        foreach ($OrderToDelete as $order){
            $em->remove($order);
        }
        $em->flush();

        $request->getSession()->getFlashBag()->add('notice', 'La commande a bien été annulée');
        return $this->redirectToRoute('mv_booking_homepage');
    }
}