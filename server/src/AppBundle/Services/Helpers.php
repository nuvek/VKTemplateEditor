<?php
/**
 * Created by PhpStorm.
 * User: dasae
 * Date: 10/9/2017
 * Time: 9:36 PM
 */

namespace AppBundle\Services;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Serializer;

class Helpers
{
    public function __construct()
    {
    }

    public function toJson($data) {
        $normalizer = array(new GetSetMethodNormalizer());
        $encoders = array('json'=>new JsonEncoder());
        $serializer = new Serializer($normalizer, $encoders);
        $json = $serializer->serialize($data, 'json');

        $response = new Response();
        $response->setContent($json);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}