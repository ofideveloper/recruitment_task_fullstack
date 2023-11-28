<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class ExchangeRatesController extends AbstractController
{

	public function getCurrenciesData() {
		return <<<XML
		[
			{
					
				code: 'EUR',
				isActive: true,
				sellSpread: 0.07,
				buySpread: -0.05
			},
			{
				code: 'USD',
				isActive: true,
				sellSpread: 0.07,
				buySpread: -0.05
			},
			{
				code: 'CZK',
				isActive: true,
				buySpread: false,
				sellSpread: 0.15,
			},
			{
				code: 'IDR',
				isActive: true,
				buySpread: false,
				sellSpread: 0.15,
			},
			{
				code: 'BRL',
				isActive: true,
				buySpread: false,
				sellSpread: 0.15,
			}
		]
		
		XML;
	}

	public function exchangeRates(Request $request): Response
    {
        $req = file_get_contents("https://api.nbp.pl/api/exchangerates/tables/A/?format=json");
        // $responseContent = $req;
		$currenciesData = $this->getCurrenciesData();
		$currenciesDataDecoded = json_decode($currenciesData, true);

		$data = array();
		
        return new Response(
            $req,
            Response::HTTP_OK,
            ['Content-type' => 'application/json']
        );
    }

}
