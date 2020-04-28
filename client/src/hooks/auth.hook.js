import {useCallback, useState, useEffect} from 'react'

const storageProps = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [ready, setReady] = useState(false)
	const [userId, setUserId] = useState(null)

	const login = useCallback((jwt, id) => {
		setToken(jwt)
		setUserId(id)

		localStorage.setItem(storageProps, JSON.stringify({
			userId: id, token: jwt
		}))
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)

		localStorage.removeItem(storageProps)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageProps))

		if (data && data.token) {
			login(data.token, data.userId)
		}
		setReady(true)
	}, [login])

	return {login, logout, token, userId, ready}
}
