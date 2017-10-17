<?php
/**
 * Created by PhpStorm.
 * User: dasae
 * Date: 10/12/2017
 * Time: 1:36 PM
 */

namespace AppBundle\Services;


use AppBundle\Entity\Template;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Pagination\Paginator;

class TemplateService
{
    /**
     * @var EntityManager
     */
    private $_entityManager;

    public function __construct($entityManager) {
        $this->_entityManager = $entityManager;
    }

    private function getRepository() {
        return $this->_entityManager->getRepository(Template::class);
    }

    /**
     * @param int $page
     * @param int $pageSize
     * @return array
     */
    public function getTemplateList($page=0, $pageSize=10) {
        $query = $this->getRepository()->createQueryBuilder('t')
            ->getQuery();
        $paginator = new Paginator($query);
        $paginator->getQuery()
            ->setFirstResult($page * $pageSize)
            ->setMaxResults($pageSize);
        return array('total'=>$paginator->count(), 'data'=>$paginator->getIterator());
    }

    public function getTemplateById($templateId) {
        return $this->getRepository()->findOneById($templateId);
    }

    /**
     * @param Template $template
     */
    public function saveTemplate(Template $template) {
        $this->_entityManager->persist($template);
        $this->_entityManager->flush();
    }

    /**
     * @param Template $template
     */
    public function deleteTemplate(Template $template) {
        $this->_entityManager->remove($template);
        $this->_entityManager->flush();
    }

    public function getTemplateFields(Template $template) {

    }
}