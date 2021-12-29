import { useEffect, useState } from 'react';
import { readDeck } from '../utils/api';

// custom hook to store data for deck
export  function useDeck(deckId) {
	const [isLoading, setIsLoading] = useState(true)
	const [deck, setDeck] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		setIsLoading(true)
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
	loadDeck();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [deck, isLoading];
}
