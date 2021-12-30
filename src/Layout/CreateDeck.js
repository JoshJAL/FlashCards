import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function CreateDeck() {
    
    const initialFormState = {
        name: '',
        description: '',
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
            
            {/* Deck Form */}
            <form>
                <label htmlFor='name'>
                    Name:
                    <input 
                        className='form-control'
                        id='name'
                        type='text'
                        name='name'
                        placeholder='Deck Name'
                        style={{ width: '1075px', margin: '10px 0'}}
                        onChange={handleChange}
                        value={formData.name}
                    />
                </label>
                <br />
                <label htmlFor='description'>
                    Description
                    <textarea 
                        className='form-control'
                        id='description'
                        name='description'
                        rows='5'
                        style={{ width: '1075px', margin: '10px 0' }}
                        placeholder='Brief description of the deck'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            </form>

            <div className='row'>

                <button type='button' style={{ marginRight: '10px', marginLeft: '15px'}} className='btn btn-secondary' onClick={() => history.push('/')}>Cancel</button>
                <button type='button' className='btn btn-primary' onClick={() => history.push('/decks/:deckId')}>Submit</button>

            </div> 

        </div>
    )
}