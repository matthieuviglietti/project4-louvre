<?php

namespace MV\BookingBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UserType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('date', DateType::class,[
                    'attr' => [ 'class' => 'date'],
                    'input' => 'datetime',
                    'widget' => 'single_text'
        ])
                ->add('name')
                ->add('firstName')
                ->add('country')
                ->add('birthDate', DateType::class, [
                    'years' => range(1900,2030)
                ])
                ->add('ticket', EntityType::class, [
                    'placeholder' => 'Sélectionner le ticket',
                    'class' => 'MV\BookingBundle\Entity\Ticket',
                    'mapped' => true,
                    'choice_translation_domain' => true
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
            'data_class' => 'MV\BookingBundle\Entity\User',
            'translation_domain' => 'messages'
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
