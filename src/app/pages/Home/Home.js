import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {List,Information} from './components';
class Home extends React.Component{
	render(){
		return(
				<Grid
				 container
				 direction="row"
				 justify="center"
				 alignItems="start"
				 style={{width:'50vw'}}
				>

					<Grid item style={styles.content}>
						<List />
					</Grid>

					<Grid item style={styles.information}>
						<Information />
					</Grid>

				</Grid>
			)
	}
}

export default Home;