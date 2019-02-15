<?php
namespace MV\BookingBundle\Stripe;

class MVStripe
{
    private $mail;
    private $locale;
    private $currency;

    public function __construct($mail, $locale, $currency)
  {
    $this->mail     = $mail;
    $this->locale   = $locale;
    $this->currency = $currency;
  }

    /**
     * @param $amount
     * @param $date
     * @param $listActiveUsers
     * @param $locale
     * @param $sessionId
     * @return array|bool
     */
    public function chargeStripe($amount, $date, $listActiveUsers, $locale, $sessionId)
    {
        $status = false;
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
            $status = true;
            $mail = $this->mail->sendConfirmationEmail($email, $date, $listActiveUsers, $locale, $sessionId, $amount);

            if($mail != false){
                return array(
                    "mail"=> $mail,
                    "status"=> $status);
            }
            else{
                return false;
            }
        }
            
        catch(\Stripe\Error\Card $e) {
            $body = $e->getJsonBody();
            $err  = $body['error'];
            // The card has been declined
            console.log($e->getMessage());
            return $status;
        }
        
    }
}