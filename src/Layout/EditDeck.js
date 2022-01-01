import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import DeckForm from './DeckForm';
import { updateDeck } from '../utils/api';

import { useDeck } from '../Hooks/useDeck';

const initialFormState = {
	name: '',
	description: '',
};

export default function CreateDeck() {
	const history = useHistory();
	const { deckId } = useParams();
	const [deck, isLoading] = useDeck(deckId);


    const [formData, setFormData] = useState(null);
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

		useEffect(() => {
			if(!isLoading && deck && !formData) {
				setFormData(deck)
			}
		}, [deck, formData, isLoading])

		const onSubmit = async (e) => {
			e.preventDefault();
			const abortController = new AbortController();
			const deck = await updateDeck(formData, abortController.signal);
			history.push(`/decks/${deck.id}`);
		}

	return (
        <div className="container">
           <div style={{ margin: '10px 0'}} className='h5 row border rounded bg-light'>

                <div className='breadcrumbContainer' style={{ margin: '15px',}}>
                    <Link to={'/'} className='text-primary'><span className="oi oi-home" /> Home</Link>
                    <span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
                    <span className='text-secondary'>Edit Deck</span>
                </div>

            </div>

            <div>
                {/* Header */}
                <div>
                    <h3>Edit Deck</h3>
                </div>

            </div>

						<DeckForm handleChange={handleChange} formData={formData} onSubmit={onSubmit} />

        </div>
    )
}
