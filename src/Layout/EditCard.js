import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { updateCard } from '../utils/api';

import { useDeck } from '../Hooks/useDeck';
import { useCard } from '../Hooks/useCard';
import CardForm from './CardForm';


export default function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, isDeckLoading] = useDeck(deckId);
		const [card, isCardLoading] = useCard(cardId);

    const [formData, setFormData] = useState(null);
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

		useEffect(() => {
			if (!isCardLoading && card && !formData) {
				setFormData(card);
		}
		}, [card, formData, isCardLoading])

    const history = useHistory();
		const navigateToDeck = () => history.push(`/decks/${deckId}`);

		const handleSubmit = async (e) => {
			e.preventDefault();
			const abortController = new AbortController();
			await updateCard(formData, abortController.signal);
			navigateToDeck();
		}
		if (isDeckLoading || deck == null || formData == null || isCardLoading || card == null) {
			return <h4>Loading...</h4>
		}

    return (
        <div className='container'>

            <div style={{ margin: '10px 0'}} className='h5 row border rounded bg-light'>

                <div className='breadcrumbContainer' style={{ margin: '15px',}}>
                    <Link to={'/'} className='text-primary'><span className="oi oi-home" /> Home</Link>
                    <span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
                    <Link to={`/decks/${deckId}`} className='text-primary'>{deck.name}</Link>
										<span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
                    <span className='text-secondary'>Edit Card: { cardId }</span>
                </div>

            </div>

            <div>

                <div>
                    <h3>Edit Card</h3>
                </div>

            </div>

            <CardForm formData={formData} handleChange={handleChange} deckId={deckId} handleSubmit={handleSubmit} />

        </div>
    )
}
