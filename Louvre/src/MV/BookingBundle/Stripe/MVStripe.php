<?php
namespace MV\BookingBundle\Stripe;

use Symfony\Component\HttpFoundation\Request;

class MVStripe
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
            $message = (new Swift_Message('Wonderful Subject'))
                ->setFrom(['contact@louvre.com' => 'Billetterie_louvre'])
                ->setTo(['receiver@domain.org', 'other@domain.org' => 'A name'])
                ->setBody('Here is the message itself')
                ;

// Send the message
$result = $mailer->send($message);

            $message = "Paiement Réussi !";
            return $message;
        }
            
        catch(\Stripe\Error\Card $e) {
            $body = $e->getJsonBody();
            $err  = $body['error'];
            // The card has been declined
            $messageError = "Il y a eu une erreur, merci de réessayer !";
            return $messageError;
        }
    }
}