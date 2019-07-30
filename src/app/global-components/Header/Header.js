import React from 'react';
import styles from './styles.js';
import {withStyles} from '@material-ui/styles';
import {Grid,Typography,Button} from '@material-ui/core';
import {PersonAdd,ExitToApp} from '@material-ui/icons';
class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			token: ''
		}
	}
	logout = () => {
		localStorage.removeItem('token');
		this.props.history.push('/signin');
	}

	render(){
		let token = localStorage.getItem('token');
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

					{token && <Grid item direction="row">
						<Button style={styles.item}>
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

export default withStyles(styles)(Header);
