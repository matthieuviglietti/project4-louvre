<?php

namespace MV\CoreBundle\Controller;
	
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('@MVCore/default/index.html.twig');
    }
}
