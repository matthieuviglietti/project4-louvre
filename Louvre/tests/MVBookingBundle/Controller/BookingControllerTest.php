<?php

namespace Tests\MVBookingBundle\Controller;

use MV\BookingBundle\Controller\BookingController;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BookingControllerTest extends WebTestCase
{

    public function testRedirectAction(){

        $client = static::createClient();
        $crawler = $client->request('GET', '/');

        $this->assertTrue($client->getResponse()->isRedirect('/fr/home'));
    }

    public function testIndexAction()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/fr/home');

        $this->assertTrue($client->getResponse()->isSuccessful(), 'response status is 2xx');
        $link = $crawler->selectLink('drapeau_français')->link();
        $client->click($link);
    }

    public function testFormUsers()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/en/2019-02-21/4/users');

        $this->assertGreaterThan(
            0,
            $crawler->filter('input[id = mv_bookingbundle_form_user_3_date]')->count()
        );
    }

}
