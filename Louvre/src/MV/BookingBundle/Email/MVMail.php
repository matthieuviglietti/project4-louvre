<?php
namespace MV\BookingBundle\Email;

class MVMail
{
    private $mailer;

    /**
     * MVMail constructor.
     * @param \Swift_Mailer $mailer
     * @param \Twig_Environment $twig
     */
    public function __construct(\Swift_Mailer $mailer, \Twig_Environment $twig)
  {
    $this->mailer = $mailer;
    $this->twig   = $twig;
  }

    /**
     * @param $email
     * @param $date
     * @param $listActiveUsers
     * @param $locale
     * @param $sessionId
     * @param $amount
     * @return bool
     */
    public function sendConfirmationEmail($email, $date, $listActiveUsers, $locale, $sessionId, $amount)
    {
        try{
            $amount = $amount/100;
            $message = (new \Swift_Message('Tickets - Louvre'))
                ->setFrom(['contact@louvre.com' => 'Billetterie_louvre'])
                ->setTo($email)
                ->setBody($this->twig->render('@MVBooking/Emails/confirmation.html.twig',
                    ['email' => $email,
                        'date' => $date,
                        'users' => $listActiveUsers,
                        'locale' => $locale,
                        'session' => $sessionId,
                        'total'=> $amount]
                ),
                    'text/html'
                );

            // Send the message
            $this->mailer->send($message);

            return $email;

        }catch(\Exception $e){
            return false;
        }
    }

}