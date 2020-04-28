import React, {useCallback, useContext, useEffect, useState} from "react";
import {LiksList} from "../components/LiksList";
import {Loader} from "../components/Loader";
import {AuthContext} from "../context/auth.context";
import {useHttp} from "../hooks/http.hook";

export const LinksPage = () => {
	const [links, setLinks] = useState([])
	const {loading, request} = useHttp()
	const {token} = useContext(AuthContext)

	const fetchLiks = useCallback(async () => {
		try {
			const fetch = await request('/api/link', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setLinks(fetch)
		} catch (e) {
		}
	}, [token, request])

	useEffect(() => {
		fetchLiks()
	}, [fetchLiks])

	if (loading) {
		return <Loader/>
	}

	return (
		<>
			{!loading && <LiksList links={links}/>}
		</>
	)
}
