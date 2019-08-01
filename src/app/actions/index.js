import axios from 'axios';
import {REGISTER,LOGIN,ADD_CONTACT,GET_CONTACT,UPDATE_CONTACT,DELETE_CONTACT,SEARCH_CONTACT} from '../api';
import {USER_AUTH,USER_LOGOUT,AUTH_FAILED,CREATE_MODAL,CONTACT_UPDATED} from '../constants';
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

export const addContact = (data,token) => {
	return async function(dispatch){
		return await axios.post(ADD_CONTACT,{...data},{headers: {"Authorization": `Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch(getContact(data.userid,token));
				return "success";
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
}

export const getContact = (userid,token,sort) => {
	sort = sort ? "desc" : "asc";
	return async function(dispatch){
		return await axios.get(`${GET_CONTACT}/${userid}?sort=${sort}`,{headers: {"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch({
					type: CONTACT_UPDATED,
					contact: response.data
				})
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
}

export const searchContact = (userid,token,q) => {
	return async function(dispatch){
		return await axios.get(`${SEARCH_CONTACT}/${userid}?q=${q}`,{headers:{"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch({
					type: CONTACT_UPDATED,
					contact: response.data
				})
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
}

export const updateContact = (data,token) => {
	return async function(dispatch){
		return await axios.patch(UPDATE_CONTACT,data,{headers: {"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch(getContact(data.userid,token));
				return "success";
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
} 

export const deleteContact = (contactid,token,userid) => {
	return async function(dispatch){
		return await axios.post(DELETE_CONTACT,{contactid},{headers: {"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch(getContact(userid,token));
				return "success";
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
}

export const logout = () => {
	return {
		type: USER_LOGOUT,
		user: null
	}
}

export const create = (open,edit,payload) => {
	return {
		type: CREATE_MODAL,
		open,
		edit: edit ? true : false,
		payload: payload ? payload : undefined
	}
}

export const wipeError = () => {
	return {
		type: AUTH_FAILED,
		error: null
	}
}

