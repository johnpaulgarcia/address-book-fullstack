import React from 'react';
import Router from './routes';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

const theme = createMuiTheme({
})

const App = () => {
	return(
		<Grid container direction="column" alignItems="center" justify="center">
			<Router />
		</Grid>
		)
}

export default App;