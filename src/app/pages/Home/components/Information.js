import React from 'react';
import {withStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import styles from './styles';
class Information extends React.Component {
	render(){
		return(
				<Grid 
				 container
				 style={styles.information}
				>

				</Grid>	
			)
	}
}

export default withStyles(styles)(Information);