import axios from 'axios';
import {REGISTER,LOGIN,ADD_CONTACT,GET_CONTACT,UPDATE_CONTACT,DELETE_CONTACT,SEARCH_CONTACT,GET_GROUP,ADD_GROUP,GETBY_GROUP} from '../api';
import {USER_AUTH,USER_LOGOUT,AUTH_FAILED,CREATE_MODAL,CONTACT_UPDATED,GROUP_UPDATED,BY_GROUP} from '../constants';
export const signup = (user,password) => {
		return async function(dispatch){
			return await axios.post(REGISTER,{user,password},{timeout: 1000})
				.then(response=>{
					dispatch({
						type: USER_AUTH,
						user: response.data
					})

					return "success"
				})

				.catch(err=>{
					let error = err.response.status === 403 ? "Username already exists!." : `Ooops. Sorry for inconvenience. error_code:${err.response.status}`
					return error
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

				return "success"
			})

			.catch(err=>{
				let error = err.response.status === 403 ? "Please review your credentials." : `Ooops. Sorry for inconvenience. error_code:${err.response.status}`
				return error;
			})
	}
}

export const addContact = (data,token) => {
	return async function(dispatch){
		return await axios.post(ADD_CONTACT,{...data},{headers: {"Authorization": `Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch(getContact(data.userid,token));
				dispatch(getByGroup(data.userid,token));
				return "success";
			})
			.catch(err=>{
				return "Error adding contact";
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
				dispatch(getByGroup(data.userid,token));
				return "success";
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
} 

export const getByGroup = (userid,token) =>{
	return async function(dispatch){
		return axios.get(`${GETBY_GROUP}/${userid}`,{headers:{"Authorization":`Bearer ${token}`}}).then(response=>{
			dispatch({
				type: BY_GROUP,
				bygroup: response.data.groups
			})
		})
		.catch(err=>{
			console.log(err);
		})
	}
}

export const deleteContact = (contactid,token,userid) => {
	return async function(dispatch){
		return await axios.post(DELETE_CONTACT,{contactid},{headers: {"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch(getContact(userid,token));
				dispatch(getByGroup(userid,token));
				return "success";
			})
			.catch(err=>{
				console.log(err.message);
			})
	}
}


export const getGroup = (userid,token) => {
	return async function(dispatch){
		return await axios.get(`${GET_GROUP}/${userid}`,{headers:{"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				console.log("Groups",response.data);
				dispatch({
					type: GROUP_UPDATED,
					groups: response.data
				})
			})
			.catch(err=>{
				console.log(err.message);
			})

	}
}

export const addGroup = (userid,name,token) => {
	return async function(dispatch){
		return await axios.post(ADD_GROUP,{userid,name},{headers: {"Authorization":`Bearer ${token}`}},{timeout: 1000})
			.then(response=>{
				dispatch(getGroup());
				return "Group Added"
			})
			.catch(err=>{
				console.log(err);
				return "Failed to Add"
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

