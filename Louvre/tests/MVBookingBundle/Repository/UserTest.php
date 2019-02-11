<?php

namespace Tests\MVBookingBundle\Repository;

use MV\BookingBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class UserRepositoryTest extends KernelTestCase
{
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;

    /**
     * {@inheritDoc}
     */
    protected function setUp()
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    public function testSelectUserOrder()
    {
        $users = $this->entityManager
            ->getRepository(User::class)
            ->selectUserOrder('JCoy89kC3Z')
        ;

        $this->assertCount(2, $users);
    }

    public function testCountUserDay(){

        $users = $this->entityManager
            ->getRepository(User::class)
            ->countUserDay('2019-02-21')
        ;

        $this->assertEquals(6, $users);
    }

    /**
     * {@inheritDoc}
     */
    protected function tearDown()
    {
        parent::tearDown();

        $this->entityManager->close();
        $this->entityManager = null; // avoid memory leaks
    }
}
