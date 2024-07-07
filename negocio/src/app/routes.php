<?php
namespace App\controllers;
use Slim\Routing\RouteCollectorProxy;

// Cliente
$app->group('/api', function (RouteCollectorProxy $api) {
    $api->group('/cliente', function(RouteCollectorProxy $cliente){
        $cliente->post('', Cliente::class . ':create');
        //$cliente->get('/{id}', Cliente::class . ':buscar');
        $cliente->get('/read[/{id}]', Cliente::class . ':read');
        $cliente->get('/filtro', Cliente::class . ':filtrar');
        $cliente->put('/{id}', Cliente::class . ':update');
        $cliente->delete('/{id}', Cliente::class . ':delete');
    });
    // Técnico
    $api->group('/tecnico', function(RouteCollectorProxy $tecnico){
        $tecnico->post('', Cliente::class . ':create');
        //$cliente->get('/{id}', Tecnico::class . ':buscar');
        $tecnico->get('/read[/{id}]', Tecnico::class . ':read');
        $tecnico->get('/filtro', Tecnico::class . ':filtrar');
        $tecnico->put('/{id}', Tecnico::class . ':update');
        $tecnico->delete('/{id}', Tecnico::class . ':delete');
    });

    //Artefacto
    $api->group('/artefacto', function(RouteCollectorProxy $artefacto){
        $artefacto->post('', Artefacto::class . ':create');
        //$artefacto->get('/{id}', Artefacto::class . ':buscar');
        $artefacto->get('/read[/{id}]', Artefacto::class . ':read');
        $artefacto->get('/filtro', Artefacto::class . ':filtrar');
        $artefacto->put('/{id}', Artefacto::class . ':update');
        $artefacto->delete('/{id}', Artefacto::class . ':delete');    
    });

    // Autenticacion
    $api->group('/auth',function(RouteCollectorProxy $auth){
        $auth->post('/iniciar', Auth::class . ':iniciar'); 
        $auth->patch('/cerrar/{idUsuario}', Auth::class . ':cerrar');
        $auth->patch('/refresh', Auth::class . ':refrescar'); 
    });

    // Usuario
    $api->group('/usr',function(RouteCollectorProxy $usr){
        $usr->patch('/reset/passw/{idUsuario}', Usuario::class . ':resetPassw'); 
        $usr->patch('/change/passw/{idUsuario}', Usuario::class . ':changePassw');
        $usr->patch('/change/rol/{idUsuario}', Usuario::class . ':changeRol'); 
    });
});