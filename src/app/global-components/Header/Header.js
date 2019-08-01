import React from 'react';
import styles from './styles.js';
import {withStyles} from '@material-ui/styles';
import {Grid,Typography,Button,TextField} from '@material-ui/core';
import {PersonAdd,ExitToApp} from '@material-ui/icons';
import {logout,create,searchContact} from '../../actions';
import {connect} from 'react-redux';
class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: [],
			search:''
		}
	}

	logout = () => {
		this.props.dispatch(logout());
	}

	createModal = () => {
		this.props.dispatch(create(true));
	}

	search = (e) => {
		e.persist();
		this.setState(()=>{
			return {search:e.target.value}
		},()=>{
			let {search} = this.state;
			this.props.dispatch(searchContact(this.props.user.userid,this.props.user.token,search));
		})
	}

	render(){
		let {user,classes} = this.props;
		return(
				<Grid
				 container
				 direction="row"
				 justify="space-between"
				 alignItems="center"
				 style={styles.header}
				>

					<Grid item>
						<Typography variant="p" style={{color: '#fff',letterSpacing: '1.2px',fontSize: '1.2rem'}}>
							Address Book
						</Typography>
					</Grid>

					{user && <Grid item direction="row">

						<TextField onInput={this.search} value={this.state.search} className={classes.searchbar} placeholder="Search Contacts" 
						InputProps={{style:{color: 'white'}}}
						/>

						<Button onClick={()=>this.createModal()} style={styles.item}>
							<PersonAdd style={{color: '#fff'}}/>
						</Button>

						<Button onClick={()=>this.logout()} style={styles.item}>
							<ExitToApp style={{color: '#fff'}}/>
						</Button>

					</Grid>}
					
				</Grid>
			)
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
}
export default connect(mapStateToProps)(withStyles(styles)(Header));
