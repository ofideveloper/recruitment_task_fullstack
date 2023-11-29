<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class ExchangeRatesController extends AbstractController
{

	public function getCantorExchangeData() {
		return <<<XML
		[
			{
				"flag": "https://flagcdn.com/80x60/eu.png",
				"code":"EUR",
				"isActive":true,
				"sellSpread":0.07,
				"buySpread":-0.05
			},
			{
				"flag": "https://flagcdn.com/80x60/us.png",
				"code":"USD",
				"isActive":true,
				"sellSpread":0.07,
				"buySpread":-0.05
			},
			{
				"flag": "https://flagcdn.com/80x60/cz.png",
				"code":"CZK",
				"isActive":true,
				"buySpread":false,
				"sellSpread":0.15
			},
			{
				"flag": "https://flagcdn.com/80x60/id.png",
				"code":"IDR",
				"isActive":true,
				"buySpread":false,
				"sellSpread":0.15
			},
			{
				"flag": "https://flagcdn.com/80x60/br.png",
				"code":"BRL",
				"isActive":true,
				"buySpread":false,
				"sellSpread":0.15
			}
		]
		
		XML;
	}

	public function exchangeRates(Request $request): Response
    {

		$apiData = null;

		$reqDate = $request->attributes->get('date');

		if ($reqDate) {
			$apiData = file_get_contents("https://api.nbp.pl/api/exchangerates/tables//A/".$reqDate."?format=json");
		} else {
			$apiData = file_get_contents("https://api.nbp.pl/api/exchangerates/tables/A/?format=json");
		}
        // $responseContent = $req;
		$cantorExchangeData = $this->getCantorExchangeData();
		$cantorExchangeDataDecoded = json_decode($cantorExchangeData, true);

		$apiDataDecoded = json_decode($apiData, true);
		$apiCurrencies = $apiDataDecoded[0]['rates'];

		$data = array();
		
		if ($apiCurrencies && count($apiCurrencies) > 0) {
			foreach ($apiCurrencies as $apiCurrencyKey => $apiCurrencyVal ) {
				foreach ( $cantorExchangeDataDecoded as $k => $v ) {
					if ( $v['code'] === $apiCurrencyVal['code'] ) {
						array_push($data, [
							'flag' => $v['flag'],
							'currency' => $apiCurrencyVal['currency'],
							'code' => $apiCurrencyVal['code'],
							'exchangeMid' => $apiCurrencyVal['mid'],
							'exchangeBuy' => ($v['buySpread'] ? round($apiCurrencyVal['mid'] + $v['buySpread'], 4) : False),
							'exchangeSell' => ($v['sellSpread'] ? round($apiCurrencyVal['mid'] + $v['sellSpread'], 4) : False),
							'sth' => $request->attributes->get('date')
						]); 
					}
				  }
			}
		}
		

        return new Response(
            json_encode($data),

            Response::HTTP_OK,
            ['Content-type' => 'application/json']
        );
    }

}
