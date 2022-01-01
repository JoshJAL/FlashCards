import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DeckForm from './DeckForm';
import { createDeck } from '../utils/api';
const initialFormState = {
	name: '',
	description: '',
};

export default function CreateDeck() {
	const history = useHistory();
	const [formData, setFormData] = useState({ ...initialFormState });
	const handleChange = ({ target }) => {
			setFormData({
					...formData,
					[target.name]: target.value,
			});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const abortController = new AbortController();
		const deck = await createDeck(formData, abortController.signal);
		history.push(`/decks/${deck.id}`);
	}

	return (
        <div className="container">
           <div style={{ margin: '10px 0'}} className='h5 row border rounded bg-light'>

                <div className='breadcrumbContainer' style={{ margin: '15px',}}>
                    <Link to={'/'} className='text-primary'><span className="oi oi-home" /> Home</Link>
                    <span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
                    <span className='text-secondary'>Create Deck</span>
                </div>

            </div>

            <div>
                {/* Header */}
                <div>
                    <h3>Create Deck</h3>
                </div>

            </div>

						<DeckForm handleChange={handleChange} formData={formData} onSubmit={onSubmit} />

        </div>
    )
}
