import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

import { useDeck } from '../Hooks/useDeck';
import CardForm from './CardForm';
import { createCard } from '../utils/api';
const initialFormState = {
	front: '',
	back: '',
};

export default function AddCard() {
    const { deckId } = useParams();
    const [ deck, isLoading ] = useDeck(deckId);
    const [formData, setFormData] = useState({ ...initialFormState });
		const history = useHistory();

		const handleSubmit = async (e) => {
			e.preventDefault();
			const abortController = new AbortController();
			await createCard(deckId, formData, abortController.signal);
			setFormData(initialFormState);
		}

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

		if (isLoading || deck == null) {
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
                    <span className='text-secondary'>Add Card</span>
                </div>

            </div>

            <div>

                <div>
                    <h3>{deck.name}: Add Card</h3>
                </div>

            </div>

            <CardForm deckId={deckId} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} />

        </div>
    )
}
