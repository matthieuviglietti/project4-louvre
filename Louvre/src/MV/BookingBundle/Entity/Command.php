<?php

namespace MV\BookingBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Command
 *
 * @ORM\Table(name="command")
 * @ORM\Entity(repositoryClass="MV\BookingBundle\Repository\CommandRepository")
 */
class Command
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
     * @ORM\Column(name="specialKey", type="string", length=255, unique=true)
     */
    private $specialKey;

    /**
     * @var int
     *
     * @ORM\Column(name="charge", type="integer")
     */
    private $charge;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     */
    private $email;

    /**
     * @ORM\OneToMany(targetEntity="MV\BookingBundle\Entity\User", mappedBy="command", cascade={"persist"})
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
     * Set specialKey.
     *
     * @param string $specialKey
     *
     * @return Command
     */
    public function setSpecialKey($specialKey)
    {
        $this->specialKey = $specialKey;

        return $this;
    }

    /**
     * Get specialKey.
     *
     * @return string
     */
    public function getSpecialKey()
    {
        return $this->specialKey;
    }

    /**
     * Set charge.
     *
     * @param int $charge
     *
     * @return Command
     */
    public function setCharge($charge)
    {
        $this->charge = $charge;

        return $this;
    }

    /**
     * Get charge.
     *
     * @return int
     */
    public function getCharge()
    {
        return $this->charge;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return Command
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
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
     * @return Command
     */
    public function addUser(\MV\BookingBundle\Entity\User $user)
    {
        $this->user[] = $user;

        $user->setCommand(null);

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
}
