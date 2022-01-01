import React from 'react'
import { useHistory, } from 'react-router-dom';

export default function CardForm({ deckId, formData, handleChange, handleSubmit }) {
const history = useHistory();
const navigateToDeck = () => history.push(`/decks/${deckId}`);

return (
	<div>
		<form style={{ width: '100%' }}>
			<label style={{ width: '100%' }} htmlFor='front'>
					Front
					<textarea
							className='form-control'
							id='font'
							type='text'
							name='front'
							placeholder=''
							style={{ margin: '10px 0' }}
							onChange={handleChange}
							value={formData.front}
					/>
			</label>
			<br />
			<label style={{ width: '100%' }} htmlFor='back'>
					Back
					<textarea
							className='form-control'
							id='back'
							type='text'
							name='back'
							placeholder=''
							style={{ margin: '10px 0' }}
							onChange={handleChange}
							value={formData.back}
					/>
			</label>
		</form>

		<div className='row'>

			<button type='button' style={{ marginRight: '10px', marginLeft: '15px' }} className='btn btn-secondary' onClick={navigateToDeck}>
					Cancel
			</button>

			<button type='button' className='btn btn-primary' onClick={handleSubmit}>
					Submit
			</button>

		</div>
	</div>
	)
}
