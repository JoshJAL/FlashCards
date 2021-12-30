import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { deleteDeck, listDecks } from '../utils/api';


export default function Deck() {
	const [decks, setDecks] = useState([]);
	const history = useHistory();

	useEffect(() => {
		setDecks([]);
		const abortController = new AbortController();

		async function loadDeck() {
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

		loadDeck();
		return () => abortController.abort();
	}, []);

	const deleteDeckHandler = async (deckId) => {
		const abortController = new AbortController();

		if (window.confirm('Delete this deck?\n\nYou will not be able to recover it.')) {
			await deleteDeck(deckId, abortController.signal);
		}
	}
	

	return (
		decks.map((deck) => (

				<div className='container'>
		
					<div style={{ margin: '10px 0'}} className='h5 row border rounded bg-light'>
		
						<div className='breadcrumbContainer' style={{ margin: '15px',}}>
							<Link to={'/'} className='text-primary'><span className="oi oi-home" /> Home</Link>
							<span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
							<span className='text-secondary'>{deck.name}</span>
						</div>
		
					</div>
		
					<div className='row' style={{ width: '100%', justifyContent: 'space-between', display: 'flex', margin: '10px 0'}}>
						<h3>{deck.name}</h3>
					</div>
		
					<div className='row' style={{ width: '100%', justifyContent: 'space-between', display: 'flex', margin: '10px 0'}}>
						<p>{deck.description}</p>
					</div>
		
					<div className='row' style={{ display: 'flex', width: '100%', justifyContent: 'space-between', margin: '10px 0' }}>
						<div>
		
							<button type='button' style={{marginRight: '5px'}} className='btn btn-secondary' onClick={() => history.push(`/decks/${deck.id}/cards/${deck.cards.id}/edit`)}>
								Edit
							</button>
							<button type='button' style={{ marginRight: '5px'}} className='btn btn-primary' onClick={() => history.push(`/decks/${deck.id}/study`)}>
								<span class="oi oi-book" style={{ marginRight: '5px' }} />
								Study
							</button>
							<button type='button' className='btn btn-primary' >
								<span class="oi oi-plus" style={{ marginRight: '5px' }} />
								Add Cards
							</button>
						</div>
					
						<button type='button' className='btn btn-danger' onClick={() => deleteDeckHandler(deck.id)}>
								<span class="oi oi-trash" />
						</button>
					</div>

					<div className='row' style={{ width: '100%', justifyContent: 'space-between', display: 'flex', margin: '10px 0'}}>
						<h2>Cards</h2>
					</div>
					
					<div className='row border rounded'>
						
					</div>
		
				</div>
			)
		))
}
