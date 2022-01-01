import { useEffect, useState } from 'react';
import { readCard } from '../utils/api';

// custom hook to store data for card
const abortController = new AbortController();
export  function useCard(cardId) {
	const [isLoading, setIsLoading] = useState(true)
	const [card, setCard] = useState(null);

	async function loadCard() {
		try {
			const card = await readCard(cardId, abortController.signal)
			setCard(card)
			setIsLoading(false)
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetching aborted');
			} else {
				throw error;
			}
		}
	}

	useEffect(() => {
		setIsLoading(true)
		loadCard();
		return () => abortController.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [card, isLoading];
}
