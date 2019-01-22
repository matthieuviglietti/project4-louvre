<?php

namespace MV\BookingBundle\DataFixtures\ORM;

use MV\BookingBundle\Entity\Ticket;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class LoadTickets extends Fixture
{
    public function load(ObjectManager $manager)
    {
    
            $ticket1 = new Ticket();
            $ticket1->setType('Journée');
            $ticket1->setCost(16);

            $manager->persist($ticket1);

            $ticket2 = new Ticket();
            $ticket2->setType('Demi-Journée');
            $ticket2->setCost(8);

            $manager->persist($ticket2);

            $ticket3 = new Ticket();
            $ticket3->setType('Journée Moins de 4 ans');
            $ticket3->setCost(0);

            $manager->persist($ticket3);

            $ticket4 = new Ticket();
            $ticket4->setType('Demi-Journée Moins de 4ans');
            $ticket4->setCost(0);

            $manager->persist($ticket4);

            $ticket5 = new Ticket();
            $ticket5->setType('Journée Sénior');
            $ticket5->setCost(12);

            $manager->persist($ticket5);

            $ticket6 = new Ticket();
            $ticket6->setType('Demi-Journée Sénior');
            $ticket6->setCost(6);

            $manager->persist($ticket6);

            $ticket7 = new Ticket();
            $ticket7->setType('Journée Enfant');
            $ticket7->setCost(8);

            $manager->persist($ticket7);

            $ticket8 = new Ticket();
            $ticket8->setType('Demi-Journée Enfant');
            $ticket8->setCost(4);
    
            $manager->persist($ticket8);

            $ticket9 = new Ticket();
            $ticket9->setType('Journée Tarif Réduit');
            $ticket9->setCost(10);
    
            $manager->persist($ticket9);

            $ticket10 = new Ticket();
            $ticket10->setType('Demi-Journée Tarif Réduit');
            $ticket10->setCost(5);
    
            $manager->persist($ticket10);

        $manager->flush();
    }
}