import useSWR from 'swr';
import { jsonFetcher } from '../utils';

const useFetch = ({queryURL, initialData = false, options={}, fetcher = jsonFetcher}) => {
	const {data, error, isLoading, mutate} = useSWR(queryURL, fetcher, {
		fallbackData: initialData,
		...options
	});
	
	return {
		response: data,
		error,
		isLoading,
		mutate
	}
}

export default useFetch