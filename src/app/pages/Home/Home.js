import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {List,Information} from './components';
class Home extends React.Component{
	componentDidMount(){
		let token = localStorage.getItem('token');
		if(!token)this.props.history.push('/signin');
	}
	render(){
		return(
				<Grid
				 container
				 direction="row"
				 justify="center"
				 alignItems="start"
				 style={{width:'inherit'}}
				>

					

				</Grid>
			)
	}
}

export default Home;