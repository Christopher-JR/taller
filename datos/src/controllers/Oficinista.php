<?php
namespace App\controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Oficinista extends Persona{

    const RECURSO = 'oficinista';
    const ROL = 2;

    /*public function __construct(ContainerInterface $c){
        $this->container=$c;
    }*/

    function create(Request $request, Response $response, $args) {
        $body = json_decode($request->getBody(), 1);
        
        $status = $this->createP(self::RECURSO, self::ROL, $body);

        return $response->withStatus($status);
    }

    function read(Request $request, Response $response, $args) {
        if(isset($args['id'])){
            $resp = $this->readP(self::RECURSO, $args['id']);
        }else{
            $resp = $this->readP(self::RECURSO);
        }
        
        $response->getBody()->write(json_encode($resp['resp']));
        return $response
                ->withHeader('Content-type', 'Application/json')
                ->withStatus($resp['status']);
    }
    
    function update(Request $request, Response $response, $args){
        $body = json_decode($request->getBody());
        $status = $this->updateP(self::RECURSO, $body, $args['id']);
        return $response->withStatus($status);   
    }

    function delete(Request $request, Response $response, $args){
        return $this->deleteP(self::RECURSO, $args['id']);
    }

    function filtrar(Request $request, Response $response, $args){
        if(isset($args['id'])){
            $resp = $this->filtrarP(self::RECURSO, $args['id']);
        }else{
            $resp = $this->filtrarP(self::RECURSO);
        }
        
        $response->getBody()->write(json_encode($resp['resp']));
        return $response
                ->withHeader('Content-type', 'Application/json')
                ->withStatus($resp['status']);
    }
}