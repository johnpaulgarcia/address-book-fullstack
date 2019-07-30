import React from 'react';
import styles from './styles';
import {Link} from 'react-router-dom';
import {TextField,Grid,Button,Typography,Card} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {signup,login} from '../../actions';
class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			error: false,
			username: '',
			password: '',
			usernameErr: false,
			passwordErr: false,
			message: ''
		}
	}

		handleInput = value => e => {
			e.persist();
			this.setState(()=>{
				return{
					[value]:e.target.value,
					[`${value}Err`]: e.target.value ? false : true
				}
			})
		}

		register = async () => {
			let {username,password} = this.state;
			if(username && password){
				let data = await signup(this.state.username,this.state.password);
				data.userid && localStorage.setItem('token',data.token);
				let token = localStorage.getItem('token');
		    	if(token)this.props.history.push('/');
			}
		}

		submit = async (e) => {
			e.preventDefault();
			let {username,password} = this.state;
			if(username && password){
				let data = await login(this.state.username,this.state.password);
				data.userid && localStorage.setItem('token',data.token);
				let token = localStorage.getItem('token');
		    	if(token)this.props.history.push('/')
		    	if(data===403)this.setState({message: "Please review your login information."})
		    	if(data===500)this.setState({message: "Internal Server Error"});
		    	setTimeout(()=>{
		    		this.setState({message: ''})
		    	},1500)
			}
			
		}
	render(){
	        let {usernameErr,passwordErr} = this.state;
			return(
					<Grid
					  container
					  xs={10}
					  md={5}
					  sm={5}
					  lg={3}
					  xl={3}
					>
					<form onSubmit={this.submit} style={styles.form}>
						<Typography variant="h6">Create Account or Login</Typography>
						
						<TextField 
						onBlur={this.handleInput('username')} 
						onInput={this.handleInput('username')} 
						value={this.state.username} 
						helperText={usernameErr && <p style={styles.error}>Username is required</p>} 
						style={styles.input} 
						fullWidth 
						label="Username"
						required
						/>

						<TextField 
						onBlur={this.handleInput('password')} 
						onInput={this.handleInput('password')} 
						value={this.state.password} 
						helperText={passwordErr && <p style={styles.error}>Password is required</p>} 
						style={styles.input} 
						fullWidth 
						label="Password"
						required
						/>

						<Grid 
						container 
						direction="row" 
						justify="space-between" 
						style={{marginLeft:'2px'}}
						>
							<Button onClick={()=>this.register()} style={styles.btn} variant="contained" color="secondary">Register</Button>
							<Button type="submit" style={styles.btn} variant="contained" color="primary">Login</Button>
						</Grid>
						
						</form>

						{this.state.message && <Card style={{position: 'absolute',left: 0,right: 0,height: '40px',fontSize: '15px',letterSpacing: '1.2px',display: 'flex',alignItems: 'center',justifyContent: 'center',color: 'red'}}>

								Message: {this.state.message}

						</Card>}
					</Grid>
				);
		}
}

export default withStyles(styles)(Signin);