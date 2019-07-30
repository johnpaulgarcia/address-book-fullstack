import axios from 'axios';
import {REGISTER,LOGIN} from '../api';
export const signup = async (user,password) => {
		return await axios.post(REGISTER,{user,password})
		.then(response=>{
			return response.data
		}).catch(err=>{
			return err.response.status
		})
}

export const login = async(user,password) => {
	return await axios.post(LOGIN,{user,password})
		.then(response=>{
			return response.data
		}).catch(err=>{
			return err.response.status
		})
}