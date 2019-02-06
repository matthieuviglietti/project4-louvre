<?php

namespace MV\BookingBundle\Controller;

use MV\BookingBundle\Entity\Command;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use MV\BookingBundle\Entity\User;
use MV\BookingBundle\Entity\Ticket;
use MV\BookingBundle\Form\FormType;
use MV\BookingBundle\Entity\Form;
use Symfony\Component\HttpFoundation\JsonResponse;

class BookingController extends Controller
{

    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectAction(){
       return $this->redirectToRoute('mv_booking_homepage');
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(Request $request)
    {
        $session = $request->getSession();
        $orderId = $this->container->get('mv_booking.session')->getIdOrder();
        if($orderId != false){
            $session->set('orderId', $orderId);

            return $this->render('@MVBooking/Default/index.html.twig');
        }
        else{
            $request->getSession()->getFlashBag()->add('home', 'Une erreur est survenue merci de recharger la page et de nous contacter si le problème se répète');
            return $this->render('@MVBooking/Default/index.html.twig');
        }
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function translationAction(Request $request)
    {
        $locale = $request->getLocale();
        return $this->render('@MVBooking/Default/date.html.twig', array(
            "locale" => $locale,
        ));
    }

    /**
     * @param Request $request
     * @param $date
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function howManyAction(Request $request, $date){

        $locale = $request->getLocale();

        return $this->render('@MVBooking/Default/howMany.html.twig', array(
            "locale" => $locale,
            "date" => $date
        ));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function checkDateAction(Request $request){

        if($request->isMethod('GET')){
            $date = $request->query->get('date');
            $em = $this->getDoctrine()->getManager();
            $userRepository = $em->getRepository(User::class);
            $listVisitors = $userRepository->countUserDay($date);
            $listVisitors= count($listVisitors);
            $rest = (1000 - $listVisitors);
        
            if ($listVisitors < 1000){
            $response = new JsonResponse(true, 200, array("leftTickets" => $rest));
            return $response;
            }
            $response = new JsonResponse(false);
            return $response;
        }
    }

    /**
     * @param Request $request
     * @param $date
     * @param $nbr
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
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

           return $this->redirectToRoute('mv_booking_check', ['date' => $date]);
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

    /**
     * @param Request $request
     * @param $date
     * @param $nbr
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function checkOrderAction(Request $request, $date){

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
            "users" => $listActiveUsers,
            "total" => $totalCost
        ));
    }

    /**
     * @param Request $request
     * @param $id
     * @param $date
     * @param $nbr
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteUserAction(Request $request, $id, $date){

       $em = $this->getDoctrine()->getManager();
       $userToDelete = $em->getRepository(User::class)->find($id);
       $em->remove($userToDelete);
       $em->flush();

       $locale = $request->getLocale();

        if($locale == 'fr'){
            $request->getSession()->getFlashBag()->add('notice', 'Le visiteur a bien été supprimé');
            return $this->redirectToRoute('mv_booking_check', array(
                'locale' => $locale,
                'date' => $date,
            ));
        }
        if($locale == 'en'){
            $request->getSession()->getFlashBag()->add('notice', 'The visitor has been deleted');
            return $this->redirectToRoute('mv_booking_check', array(
                'date' => $date,
            ));
        }
    }

    /**
     * @param Request $request
     * @param $amount
     * @param $date
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function StripeAction(Request $request, $amount, $date){

        $em = $this->getDoctrine()->getManager();
        $userRepository = $em->getRepository(User::class);
        $session = $request->getSession();
        $sessionId = $session->get('orderId');
        $locale = $request->getLocale();

        $listActiveUsers = $userRepository->selectUserOrder($sessionId);

        $mail = $this->container->get('mv_booking.stripe')->chargeStripe($amount, $date, $listActiveUsers, $locale, $sessionId);

        if($mail['status'] == true ){
            $email = $mail['mail'];
            $createOrder = new Command();
            $createOrder->setSpecialKey($sessionId)
                ->setCharge($amount)
                ->setEmail($email);
            $em->persist($createOrder);
            $em->flush();
        }
        else{
                $request->getSession()->getFlashBag()->add('error', 'Une erreur est survenue merci de bien vouloir réessayer');

            return $this->redirectToRoute('mv_booking_check', array(
                'date' => $date,
            ));
        }

        return $this->redirectToRoute('mv_booking_confirmation', array(
            "email"=>$email
        ));
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function confirmationOrderAction(Request $request){

        $locale = $request->getLocale();

        return $this->render('@MVBooking/Default/confirmationOrder.html.twig', array(
          'locale' => $locale
        ));
    }

    /**
     * @param Request $request
     * @param $sessionId
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
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