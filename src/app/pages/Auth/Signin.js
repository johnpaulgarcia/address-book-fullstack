import React from 'react';
import styles from './styles';
import {Link,Redirect} from 'react-router-dom';
import {TextField,Grid,Button,Typography,Card} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import {signup,login,wipeError} from '../../actions';
import {connect} from 'react-redux';
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

		componentDidUpdate(){
			let {autherror} = this.props;
			if(autherror && autherror !== this.state.message){
				this.setState(()=>{
					return {
						message: autherror
					}
				})
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
		register = () => {
			let {username,password} = this.state;
			this.props.dispatch(signup(username,password));
		}

		submit = (e) => {
			e.preventDefault();
			let {username,password} = this.state;
			this.props.dispatch(login(username,password))	
		}
	render(){
	        let {usernameErr,passwordErr,message} = this.state;
	         if(this.props.user){
	        	return <Redirect to="/"/>
	         }
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

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		autherror: state.user.error
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Signin));