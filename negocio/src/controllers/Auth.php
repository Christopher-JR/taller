<?php
namespace App\controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;

class Auth extends ServicioCURL {
    private const ENDPOINT = "/auth";
    
    public function iniciar(Request $request, Response $response, $args){
        $datos = $request->getbody();
        $respA = $this->ejecutarCURL($this::ENDPOINT . '/iniciar', 'POST', $datos);
        if($respA['resp']){
            $response->getBody()->write($respA['resp']);
        }

        return $response->withHeader('Content-type', 'Application/json')
            ->withStatus($respA['status']);
    }

    public function cerrar(Request $request, Response $response, $args){
        $datos = $request->getbody();
        $url = $this::ENDPOINT . "/cerrar/{$args['idUsuario']}";
        $respA = $this->ejecutarCurl($url,'PATCH');
        return $response->withStatus($respA['status']);
    }

    public function refrescar(Request $request, Response $response, $args){
        $datos = $request->getbody();
        $url = $this::ENDPOINT . "/refrescar";
        $respA = $this->ejecutarCurl($url,'PATCH', $datos);
        
        $response->getBody()->write($respA['resp']);
        
        return $response->withHeader('Content-type', 'Application/json')
                ->withStatus($respA['status']);
    }
}