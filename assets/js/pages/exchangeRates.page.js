import React from 'react'
import apiRoutes from '../config/apiRoutes'
import useFetch from '../hooks/useFetch'
import LoadingOrContent from '../components/LoadingOrContent/LoadingOrContent'

export default function Page() {

	const { response: currencies, isLoading, mutate: mutateGetCurrencies } = useFetch({ queryURL: apiRoutes.exchangeRates.get, initialData: [] })

	let renderCurrencies = (data) => {
		return <>
			{ data.rates.map((item, index) => <li key={ index }>{ item.code }</li>) }
		</>
	}
	
	return <div>
		<h2 className="text-center">Page...</h2>

		<LoadingOrContent isLoading={ isLoading }>
			Content loaded!

			{ currencies && currencies[0]?.rates ? renderCurrencies(currencies[0]) : <>noo</> }
		</LoadingOrContent>
	
	</div>
}