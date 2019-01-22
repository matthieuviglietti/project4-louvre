<?php

namespace MV\BookingBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ticket
 *
 * @ORM\Table(name="ticket")
 * @ORM\Entity(repositoryClass="MV\BookingBundle\Repository\TicketRepository")
 */
class Ticket
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
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @var int
     *
     * @ORM\Column(name="cost", type="integer")
     */
    private $cost;

    /**
     * @ORM\OneToMany(targetEntity="MV\BookingBundle\Entity\User", mappedBy="ticket", cascade={"persist"})
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
     * Set type.
     *
     * @param string $type
     *
     * @return Ticket
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set cost.
     *
     * @param int $cost
     *
     * @return Ticket
     */
    public function setCost($cost)
    {
        $this->cost = $cost;

        return $this;
    }

    /**
     * Get cost.
     *
     * @return int
     */
    public function getCost()
    {
        return $this->cost;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->user = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add user.
     *
     * @param \MV\BookingBundle\Entity\User $user
     *
     * @return Ticket
     */
    public function addUser(\MV\BookingBundle\Entity\User $user)
    {
        $this->user[] = $user;

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

    public function __toString()
    {
        return $this->type;
    }
}
