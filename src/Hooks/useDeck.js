import { useCallback, useEffect,  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { readDeck } from '../utils/api';

// custom hook to store data for deck
export  function useDeck(deckId) {
	const [isLoading, setIsLoading] = useState(true)
	const [deck, setDeck] = useState(null);
	const location = useLocation();

	const loadDeck = useCallback(async (controller) => {
		try {
			const res = await readDeck(deckId, controller.signal)
			setDeck(() => res)
			setIsLoading(false)
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetching aborted');
			} else {
				throw error;
			}
		}
	}, [deckId])

	useEffect(() => {
		const controller = new AbortController();
		if (isLoading) {
			return
		}

		setIsLoading(true)
		loadDeck(controller);

		return () => {
			controller.abort();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	useEffect(() => {
		const controller = new AbortController();
		loadDeck(controller);
	}, [location.pathname, loadDeck])

	return [deck, isLoading, loadDeck];
}
