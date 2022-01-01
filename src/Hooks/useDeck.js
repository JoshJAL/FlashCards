import { useEffect, useState } from 'react';
import { readDeck } from '../utils/api';

// custom hook to store data for deck
const abortController = new AbortController();
export  function useDeck(deckId) {
	const [isLoading, setIsLoading] = useState(true)
	const [deck, setDeck] = useState(null);

	async function loadDeck() {
		try {
			const deck = await readDeck(deckId, abortController.signal)
			setDeck(deck)
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
		loadDeck();
		return () => abortController.abort();
	}, [deckId]);

	const refetch = () => loadDeck();

	return [deck, isLoading, refetch];
}
