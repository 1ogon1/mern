import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/auth.context";
import {useHttp} from "../hooks/http.hook";

export const CreatePage = () => {
	const history = useHistory()
	const context = useContext(AuthContext)
	const {request} = useHttp();
	const [link, setLink] = useState('');

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const pressHandler = async e => {
		if (e.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'POST', {from: link}, {
					Authorization: `Bearer ${context.token}`
				})
				history.push(`/detail/${data.link._id}`)
			} catch (e) {
			}
		}
	}

	return (
		<div className="row col s8 offset-s2" style={{paddingTop: '2rem'}}>
			<div className="input-field">
				<input
					placeholder="Вставте ссылку"
					id="link"
					type="text"
					className="validate"
					value={link}
					onKeyPress={pressHandler}
					onChange={e => setLink(e.target.value)}
				/>
				<label htmlFor="link">Введите ссылку</label>
			</div>
		</div>
	)
}
