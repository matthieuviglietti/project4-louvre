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

    public function sendConfirmationEmail($email)
    {
        $message = (new \Swift_Message('Confirmation de votre paiement'))
                ->setFrom(['contact@louvre.com' => 'Billetterie_louvre'])
                ->setTo($email)
                ->setBody($this->twig->render(
                    '@MVBooking/Emails/confirmation.html.twig',
                    ['email' => $email]
                ),
                'text/html'
            );

            // Send the message
           $this->mailer->send($message); 
        }
}