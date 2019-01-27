<?php
namespace MV\BookingBundle\Stripe;

use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class MVStripe extends Controller
{
    private $mailer;
    private $locale;
    private $currency;

    public function __construct(\Swift_Mailer $mailer, $locale, $currency)
  {
    $this->mailer   = $mailer;
    $this->locale   = $locale;
    $this->currency = $currency;
  }

    public function chargeStripe($amount, $request)
    {
        \Stripe\Stripe::setApiKey("sk_test_WFwsGVYMQgKdVdfI6ths0Gom");

        // Get the credit card details submitted by the form
        $token = $_POST['stripeToken'];
        $email = $_POST['stripeEmail'];

        // Create a charge: this will charge the user's card
        try {
            $charge = \Stripe\Charge::create(array(
                "amount" => $amount, // Amount in cents
                "currency" => $this->currency,
                "source" => $token,
                'receipt_email' => $email,
            ));
            $session = $request->getSession();
            $session->getFlashBag()->add('notice', 'Le paiement a réussi ! Merci');
            foreach ($session->getFlashBag()->get('notice', []) as $message){
            }
            return $this->redirectToRoute("mv_booking_confirmation", ['message' => $message]);

        } catch(\Stripe\Error\Card $e) {

            $this->addFlash("error","Une erreur est survenue merci de réessayer");
            return $this->redirectToRoute("mv_booking_checkOrder");
            // The card has been declined
        }
    }
}