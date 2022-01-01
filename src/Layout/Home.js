import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { deleteDeck, listDecks } from '../utils/api';

const abortController = new AbortController();
function Decks() {
	const [decks, setDecks] = useState([]);
	const history = useHistory();
	async function loadDecks() {
		try {
			const res = await listDecks(abortController.signal);
			setDecks(res);
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetching aborted');
			} else {
				throw error;
			}
		}
	}
	useEffect(() => {
		setDecks([]);

		loadDecks();
		return () => abortController.abort();
	}, []);

	const deleteHandler = async (deckId) => {
		const abortController = new AbortController();

		if (window.confirm('Delete this deck?\n\nYou will not be able to recover it.')) {
			await deleteDeck(deckId, abortController.signal);
			await loadDecks();
		}
	}

	return (
		decks.map((deck) => (
			<div key={deck.id} className='container border rounded' style={{ margin: '10px 0' }}>

				{/* header */}
				<div className='row' style={{ width: '100%', justifyContent: 'space-between', display: 'flex', margin: '10px 0' }}>
					<h4>
						{deck.name}
					</h4>

					<span className='text-secondary'>
						{deck.cards.length} cards
					</span>
				</div>

				{/* body */}
				<div className='row' style={{ width: '100%', margin: '10px 0' }}>
					<p>
						{deck.description}
					</p>
				</div>

				{/* footer (buttons) */}
				<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', margin: '10px 0' }}>
					<div>

						<button type='button' style={{ marginRight: '5px'}} className='btn btn-secondary' onClick={() => history.push(`/decks/${deck.id}`)}>
							<span className="oi oi-eye" style={{ marginRight: '5px' }}/>
							View
						</button>

						<button type='button' className='btn btn-primary' onClick={() => history.push(`/decks/${deck.id}/study`)}>
							<span className="oi oi-book" style={{ marginRight: '5px' }} />
							Study
						</button>

					</div>

					<button type='button' className='btn btn-danger' onClick={() => deleteHandler(deck.id)}>
						<span className="oi oi-trash" />
					</button>

				</div>

			</div>
		))
	)

}

export default function Home() {
	const history = useHistory();
	return (
		<div className='container'>
			<button type='button' className='btn btn-secondary' onClick={() => history.push('/decks/new')}>
			<span className="oi oi-plus" style={{ marginRight: '5px' }} />
				Create Deck
			</button>
			<Decks />
		</div>
	);
}
