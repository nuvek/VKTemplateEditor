<?php
/**
 * Created by PhpStorm.
 * User: dasae
 * Date: 10/9/2017
 * Time: 9:57 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Template;
use AppBundle\Services\Helpers;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TemplateController extends Controller
{
    /**
     * @Route("/templates", name="templates_list")
     */
    public function indexAction(Request $request)
    {
        /** @var Helpers $helpers */
        $helpers = $this->get('app.helpers');
        $pageIndex = $request->query->get('pageIndex');
        $pageSize = $request->query->get('pageSize');
        $templates = $this->get('app.template')->getTemplateList($pageIndex, $pageSize);
        return $helpers->toJson($templates);
    }

    /**
     * @Route("/template/save", name="templates_save")
     */
    public function saveAction(Request $request) {
        $data = json_decode($request->getContent(), true);
        $template = isset($data['id']) ? $this->get('app.template')->getTemplateById($data['id']) : new Template();
        /** @var Helpers $helpers */
        $helpers = $this->get('app.helpers');
        $form = $this->createFormBuilder($template, array('csrf_protection' => false))
            ->add('id', NumberType::class)
            ->add('title', TextType::class)
            ->add('description', TextType::class)
            ->add('content', TextType::class)
            ->getForm();
        $form->submit($data);

        if($form->isValid()) {
            $template = $form->getData();
            $this->get('app.template')->saveTemplate($template);
            return $helpers->toJson($template);
        }
        $response = $helpers->toJson(array('error'=>'No Data Found!'));
        $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        return $response;
    }

    /**
     * @Route("/templates/get/{id}")
     */
    public function getAction($id) {
        /** @var Helpers $helpers */
        $helpers = $this->get('app.helpers');
        $template = $this->get('app.template')->getTemplateById($id);
        return $helpers->toJson($template);
    }
}