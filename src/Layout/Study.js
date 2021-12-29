import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDeck } from '../Hooks/useDeck';

export default function Study() {
	const { deckId } = useParams();
	const [deck, isLoading] = useDeck(deckId);
	const [cardIndex, setCardIndex] = useState(0);
	const [cardSide, setCardSide] = useState('front');

	const onNextClick = (event) => {
		event.preventDefault();
		setCardSide(() => {
			setCardIndex((prev) =>{
				const nextIndex = prev + 1
				if (nextIndex > deck.cards.length - 1) {
					return 0;
				}

				return nextIndex;
			});
			return 'front';
		});
	}

	if (isLoading || deck == null) {
		return <h4>Loading...</h4>
	}

	return (

		/* Breadcrumb */

		<div className='container'>
			<div style={{ margin: '10px 0'}} className='h5 row border rounded bg-light'>

				<div className='breadcrumbContainer' style={{ margin: '15px',}}>
					<Link to={'/'} className='text-primary'><span className="oi oi-home" /> Home</Link>
					<span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
					<Link to={`/decks/${deckId}`} className='text-primary'>{deck.name}</Link>
					<span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
					<span className='text-secondary'>Study</span>
				</div>

			</div>


				<div>
					{/* Header */}
					<div style={{ width: '100%', justifyContent: 'space-between', display: 'flex', margin: '10px 0'}} className='row'>
						<h3>Study: {deck.name}</h3>
					</div>

					<div className='container border roudned'>

						{/* Card Header */}
						<div style={{ width: '100%', justifyContent: 'space-between', display: 'flex', margin: '10px 0'}} className='row'>
							<h4>Card { cardIndex + 1 } of {deck.cards.length}</h4>
						</div>

						{/* Card Body */}
						<div className='row' style={{ width: '100%', margin: '10px 0' }}>
							<p>
								{deck.cards[cardIndex][cardSide]}
							</p>
						</div>

						<div className='row' style={{ margin: '10px 0' }}>
							<button type='button' className='btn btn-secondary' onClick={() => setCardSide((prev) => prev === 'front' ? 'back' : 'front')}>
								Flip
							</button>
							{cardSide==='back' ? (<button type='button' className='btn btn-primary' onClick={onNextClick}>
								Next
							</button>) : null }
						</div>

					</div>
				</div>
		</div>
	)
}