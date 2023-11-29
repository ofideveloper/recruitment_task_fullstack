import React, {useState, useEffect} from 'react'
import apiRoutes from '../../config/apiRoutes'
import useFetch from '../../hooks/useFetch'
import LoadingOrContent from '../../components/LoadingOrContent/LoadingOrContent'
import styled from 'styled-components'
import moment from 'moment'

import { useParams, useHistory } from 'react-router-dom';

const TableWrapper = styled.div`
	overflow: hidden;
	// padding-bottom: 10px;
`

const TableOuter = styled.div`
	overflow-x: scroll;
	padding-bottom: 20px;
	margin-bottom: -20px;
`

const Table = styled.table`
  min-width: 700px; // można zrobić też inaczej
`;

const TableCell = styled.td`
	padding: 2px 8px;
`

const TableRow = styled.tr`
  
`;

const TableCurrencyFlag = styled.img`
	width: 20px;
`

export default function Page({match}) {

	// TODO
	// if currentDay is a weekend, redirect to latest working day...
	
	let { params: {
		date: dateParam
	} } = match
	const history = useHistory()

	let [isWeekend, setIsWeekend] = useState(false)

	let [ currentDay, setDay ] = useState(`${moment().format('YYYY-MM-DD')}`)

	const { response: exchangeRatesToday, isLoading } = useFetch({ queryURL: apiRoutes.exchangeRates.get, initialData: [] })
	
	// TODO
	// - prevent to request weekend or holidays days
	const { response: exchangeRatesFromDate, isLoading: isLoadingCompare } = useFetch({ queryURL: dateParam ? `${apiRoutes.exchangeRates.get}/${dateParam}` : null, initialData: [] })

	let setDate = (newDate) => {
		let day = new Date(newDate)
		history.push(`/exchange-rates/${newDate}`)
	}

	useEffect(() => {
		let weekend = moment(currentDay)
	  }, [currentDay]);

	let renderCompareCurrencyBlock = ({ today, compare }) => {
		return <>
		{ compare ? (
			<><strong>{compare}</strong> <br/><small>(today: {today})</small></>
		) : (
			<>{ today }</>
		) }
		</>
	}

	const btnBuyHandler = (item) => {
		alert(`Buy ${item.code}, rate: ${item.exchangeSell} PLN `)
	}

	const btnSellHandler = (item) => {
		alert(`Sell ${item.code}, rate: ${item.exchangeBuy} PLN`)
	}

	let renderCurrencies = ({ today: data, compareWith: dataCompare }) => {
		return <TableWrapper>
			<TableOuter>
				<Table className="mt-4">
					<thead>
						<TableRow>
							<TableCell>&nbsp;</TableCell>
							<TableCell>Currency</TableCell>
							<TableCell>NBP avg exchange rate
							</TableCell>
							<TableCell>{ dataCompare ? 'Buy rate' : 'Buy'}</TableCell>
							<TableCell>{ dataCompare ? 'Sell rate' : 'Sell'}</TableCell>
							{ dateParam && dataCompare && <TableCell>Change rate</TableCell> }
							<TableCell></TableCell>
						</TableRow>
					</thead>
					
					<tbody>
						{ data.map((item, index) => {

							let compareWithItem = dataCompare && dataCompare.filter((compare) => compare.code === item.code)[0]

							let rate = (item.exchangeMid - compareWithItem?.exchangeMid).toFixed(4)
							
							return (
								<TableRow className="" key={ index }>
									<TableCell className="">
										{ item.flag && <TableCurrencyFlag className="w-4" src={ item.flag } alt={ item.currency } /> }
									</TableCell>
									<TableCell className="">{ item.code } | { item.currency }</TableCell>
									<TableCell className="">
										{ renderCompareCurrencyBlock({
											today: item.exchangeMid,
											compare: compareWithItem?.exchangeMid
										}) }
									</TableCell>
									<TableCell className="">
										{ renderCompareCurrencyBlock({
											today: item.exchangeSell,
											compare: compareWithItem?.exchangeSell
										}) }
									</TableCell>
									<TableCell className="">
										{ renderCompareCurrencyBlock({
											today: item.exchangeBuy,
											compare: compareWithItem?.exchangeBuy
										}) }
									</TableCell>
									{ dateParam && dataCompare && <TableCell> { isNaN(rate) ? '---' : rate } </TableCell> }
									<TableCell className="">
										{ item.exchangeSell && <button onClick={() => btnBuyHandler(item)} className="">Buy</button> }
										{ item.exchangeBuy && <button onClick={() => btnSellHandler(item)} className="ml-2">Sell</button> }
									</TableCell>
								</TableRow>
							)
						})}
					</tbody>
				</Table>
			</TableOuter>
		</TableWrapper>
	}
	
	return <div>
		<h2 className="text-center">Currency Exchange <strong className="">{ 'Telemedi Zadanko' }</strong> </h2>

		<div className="d-flex">
			<div className="div">Select date: <input type="date" id="start" defaultValue={dateParam ? dateParam : currentDay} onChange={ (e) => setDate(e.currentTarget.value) } min="2023-01-01" /></div>
		</div>

		{/* { dateParam && exchangeRatesFromParam } */}

		<LoadingOrContent isLoading={ isLoading || isLoadingCompare }>
			{ exchangeRatesToday ? (
				<div>
					<div className="div mt-4">
						{ dateParam ? 'Exchange rates at' : 'Current exchange rates' } { dateParam && <strong>{dateParam}</strong> }
					</div>
					{ renderCurrencies({
						today: exchangeRatesToday,
						compareWith: exchangeRatesFromDate || false
					}) }
				</div>
			) : <>{ 'oops :(' }</> }
		</LoadingOrContent>
	
	</div>
}