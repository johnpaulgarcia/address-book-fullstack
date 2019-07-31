import React from 'react';
import styles from './styles.js';
import {withStyles} from '@material-ui/styles';
import {Grid,Typography,Button} from '@material-ui/core';
import {PersonAdd,ExitToApp} from '@material-ui/icons';
import {logout,create} from '../../actions';
import {connect} from 'react-redux';
class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: []
		}
	}

	logout = () => {
		this.props.dispatch(logout());
	}

	createModal = () => {
		this.props.dispatch(create(true));
	}

	render(){
		let {user} = this.props;
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
