import React from 'react';
import styles from './styles';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
const Container = ({children}) => {
	return(
			<Grid
			 container
			 direction="column"
			 justify="start"
			 alignItems="center"
			 style={styles.container}>
				{children}
			</Grid>
		)
}
export default withStyles(styles)(Container);