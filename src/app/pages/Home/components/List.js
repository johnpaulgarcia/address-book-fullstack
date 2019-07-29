import React from 'react';
import {withStyles} from '@material-ui/styles';
import {Grid,List,ListItem} from '@material-ui/core';
import styles from './styles';
class Lists extends React.Component {
	render(){
		return(
				<Grid 
				 container
				 style={styles.list}
				>
					<List>
						<ListItem button>Harry Potter</ListItem>
					</List>

				</Grid>	
			)
	}
}

export default withStyles(styles)(Lists);