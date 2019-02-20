<?php

namespace MV\BookingBundle\Order;
use MV\BookingBundle\Entity\Command;

class MVCreateOrder
{
    public function createOrder($em, $sessionId, $amount, $email)
    {
        $createOrder = new Command();
        $createOrder->setSpecialKey($sessionId)
            ->setCharge($amount)
            ->setEmail($email);

        $em->persist($createOrder);
        $em->flush();

        return $createOrder;
    }

}