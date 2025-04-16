<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class Kernel extends BaseKernel
{
    use MicroKernelTrait;

    protected function configureContainer(ContainerBuilder $containerBuilder, LoaderInterface $loader): void
    {
        $loader->load(__DIR__.'/../config/{packages}/*.yaml', 'glob');
        $loader->load(__DIR__.'/../config/{packages}/'.$this->environment.'/*.yaml', 'glob');
        $loader->load(__DIR__.'/../config/services.yaml');
        $loader->load(__DIR__.'/../config/{services}_'.$this->environment.'.yaml', 'glob');
    }
}
