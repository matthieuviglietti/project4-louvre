<?php
namespace MV\BookingBundle\Purge;
use MV\BookingBundle\Entity\User;

use Doctrine\ORM\EntityManager;

class MVPurgeUser
{
    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function purgeUserWithoutOrder()
    {
        $em = $this->em;
        $UsersToDelete = $em->getRepository(User::class)->findAloneUser();

        foreach ($UsersToDelete as $users){
            $em->remove($users);
        };
        $em->flush();

        return  $UsersToDelete;
    }
}