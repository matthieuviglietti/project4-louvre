<?php
namespace MV\BookingBundle\Email;

class MVMail
{
    private $mailer;

    public function __construct(\Swift_Mailer $mailer, \Twig_Environment $twig)
  {
    $this->mailer = $mailer;
    $this->twig   = $twig;
  }

    public function sendConfirmationEmail($email, $date, $listActiveUsers, $locale, $sessionId)
    {
        try{
            $message = (new \Swift_Message('Confirmation de votre paiement'))
                ->setFrom(['coucou@louvre.com' => 'Billetterie_louvre'])
                ->setTo($email)
                ->setBody($this->twig->render('@MVBooking/Emails/confirmation.html.twig',
                    ['email' => $email,
                        'date' => $date,
                        'users' => $listActiveUsers,
                        'locale' => $locale,
                        'session' => $sessionId]
                ),
                    'text/html'
                );

            // Send the message
            $this->mailer->send($message);

            return $email;

        }catch(\Exception $e){
            return null;
        }
    }

}