<?php

namespace MV\BookingBundle\Cost;

use MV\BookingBundle\Entity\User;

class MVCheckCost
{
    public function checkCost($em, $sessionId)
    {
        $userRepository = $em->getRepository(User::class);

        $listActiveUsers = $userRepository->selectUserOrder($sessionId);

        $totalCost = intval(0);
        foreach ($listActiveUsers as $users) {
            $cost = intval($users->getTicket()->getCost());
            $totalCost += $cost;
        }

        return $totalCost;
    }
}