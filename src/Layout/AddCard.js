import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

import { useDeck } from '../Hooks/useDeck';

export default function AddCard() {

    const { deckId } = useParams();
    const { deck, isLoading } = useDeck(deckId);
    
    const initialFormState = {
        front: '',
        back: '',
    };

    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
        setFormData({
            ...formData, 
            [target.name]: target.value,
        });
    };

    const history = useHistory();

    return (
        <div className='container'>

            <div style={{ margin: '10px 0'}} className='h5 row border rounded bg-light'>

                <div className='breadcrumbContainer' style={{ margin: '15px',}}>
                    <Link to={'/'} className='text-primary'><span className="oi oi-home" /> Home</Link>
                    <span style={{ margin: '0 5px'}} className='text-secondary'>/</span>
                    <Link to={`/decks/${deckId}`} className='text-primary'>{deck.name}</Link>
                    <span className='text-secondary'>Add Card</span>
                </div>

            </div> 

            <div>

                <div>
                    <h3>{deck.name}: Add Card</h3>
                </div>

            </div>

            <form style={{ width: '100%'}}>
                <label style={{ width: '100%'}} htmlFor='front'>
                    Front
                    <input
                        className='form-control'
                        id='front'
                        type='text'
                        name='front'
                        placeholder='Front side of card'
                        style={{ margin: '10px 0' }}
                        onChange={handleChange}
                        value={formData.front}
                    />
                </label>
                <br />
                <label style={{ width: '100%' }} htmlFor='back'>
                    Back
                    <input 
                        className='form-control'
                        id='back'
                        type='text'
                        name='back'
                        placeholder='Back side of the card'
                        style={{ margin: '10px 0' }}
                        onChange={handleChange}
                        value={formData.back}
                    />
                </label>
            </form>

            <div className='row'>

                <button type='button' style={{ marginRight: '10px', marginLeft: '15px' }} className='btn btn-secondary'>
                    Done
                </button>
                <button type='button' className='btn btn-primary'>
                    Save
                </button>

            </div>

        </div>
    )
}