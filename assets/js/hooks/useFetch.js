import useSWR from 'swr';
import { jsonFetcher } from '../utils';

const useFetch = ({queryURL, initialData = false, options={}, fetcher = jsonFetcher}) => {
	const {data, error, isLoading, mutate} = useSWR(queryURL, fetcher, {
		fallbackData: initialData,
		...options
	});
	
	let pay = {
		response: data,
		error,
		isLoading,
		mutate
	}
	
	return pay
}

export default useFetch