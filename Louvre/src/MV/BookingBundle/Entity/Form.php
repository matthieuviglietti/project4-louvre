<?php

namespace MV\BookingBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Form
 *
 * @ORM\Table(name="form")
 * @ORM\Entity(repositoryClass="MV\BookingBundle\Repository\FormRepository")
 */
class Form
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

     /**
     * @ORM\OneToMany(targetEntity="MV\BookingBundle\Entity\User", mappedBy="form", cascade={"persist"})
     */
    private $user;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
    }

    
  

    /**
     * Add user.
     *
     * @param \MV\BookingBundle\Entity\User $user
     *
     * @return Form
     */
    public function addUser(\MV\BookingBundle\Entity\User $user)
    {
        $this->user[] = $user;
        $user->setForm($this);

        return $this;
    }

    /**
     * Remove user.
     *
     * @param \MV\BookingBundle\Entity\User $user
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeUser(\MV\BookingBundle\Entity\User $user)
    {
        return $this->user->removeElement($user);
    }

    /**
     * Get user.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUser()
    {
        return $this->user;
    }


    /**
     * Add ticket.
     *
     * @param \MV\BookingBundle\Entity\User $ticket
     *
     * @return Form
     */
    public function addTicket(\MV\BookingBundle\Entity\User $ticket)
    {
        $this->ticket[] = $ticket;

        return $this;
    }

    /**
     * Remove ticket.
     *
     * @param \MV\BookingBundle\Entity\User $ticket
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeTicket(\MV\BookingBundle\Entity\User $ticket)
    {
        return $this->ticket->removeElement($ticket);
    }

    /**
     * Get ticket.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTicket()
    {
        return $this->ticket;
    }
}
