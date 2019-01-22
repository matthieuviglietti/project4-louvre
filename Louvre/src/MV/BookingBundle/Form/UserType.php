<?php

namespace MV\BookingBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class UserType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name')
                ->add('firstName')
                ->add('country')
                ->add('birthDate', DateType::class, [
                    'years' => range(1919,2020)
                ])
                ->add('ticket', EntityType::class, [
                    'placeholder' => 'Sélectionner le ticket',
                    'class' => 'MV\BookingBundle\Entity\Ticket',
                    'mapped' => true,
                ])
                ->add('submit', SubmitType::class, [
                    'attr' => ['class' => 'save']
                    ])
                ->add('sessionKey', TextType::class, [
                    'label' => false,
                    'attr' => ['class' => 'session']
                ]);
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'MV\BookingBundle\Entity\User'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'mv_bookingbundle_user';
    }


}
