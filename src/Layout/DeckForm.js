import React from 'react';
import { useHistory, } from 'react-router-dom';


export default function DeckForm({ onSubmit, formData, handleChange }) {
	const history = useHistory();

	return (
		<div>
		{/* Deck Form */}
				<form style={{ width: '100% '}}>
				<label style={{ width: '100%'}} htmlFor='name'>
						Name:
						<input
								className='form-control'
								id='name'
								type='text'
								name='name'
								placeholder='Deck Name'
								style={{ margin: '10px 0'}}
								onChange={handleChange}
								// check for formData.name with optional chaining
								// if it doesn't exist, null coalesce to a new empty string
								value={formData?.name ?? ''}
						/>
				</label>
				<br />
				<label style={{ width: '100%' }} htmlFor='description'>
						Description
						<textarea
								className='form-control'
								id='description'
								name='description'
								rows='5'
								style={{ width: '100%', margin: '10px 0' }}
								placeholder='Brief description of the deck'
								value={formData?.description ?? ''}
								onChange={handleChange}
						/>
				</label>
		</form>

		<div className='row'>

				<button type='button' style={{ marginRight: '10px', marginLeft: '15px'}} className='btn btn-secondary' onClick={() => history.push('/')}>Cancel</button>
				<button type='button' className='btn btn-primary' onClick={onSubmit}>Submit</button>

		</div>
	</div>
	)
}
