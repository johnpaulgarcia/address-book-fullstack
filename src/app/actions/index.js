import axios from 'axios';
import {REGISTER,LOGIN} from '../api';
import {USER_AUTH,AUTH_FAILED} from '../constants';
export const signup = (user,password) => {
		return async function(dispatch){
			return await axios.post(REGISTER,{user,password},{timeout: 1000})
				.then(response=>{
					dispatch({
						type: USER_AUTH,
						user: response.data
					})
				})

				.catch(err=>{
					let error = err.response.status === 403 ? "Please review your credentials." : `Ooops. Sorry for inconvenience. error_code:${err.response.status}`
					dispatch({
						type: AUTH_FAILED,
						error
					})
				})
		}
}

export const login = (user,password) => {
	return async function(dispatch){
		return await axios.post(LOGIN,{user,password},{timeout: 1000})
			.then(response=>{
				dispatch({
					type: USER_AUTH,
					user: response.data
				})
			})

			.catch(err=>{
				let error = err.response.status === 403 ? "Please review your credentials." : `Ooops. Sorry for inconvenience. error_code:${err.response.status}`
				dispatch({
					type: AUTH_FAILED,
					error
				})
			})
	}
}

export const logout = () => {
	return {
		type: USER_AUTH,
		user: null
	}
}

export const wipeError = () => {
	return {
		type: AUTH_FAILED,
		error: null
	}
}