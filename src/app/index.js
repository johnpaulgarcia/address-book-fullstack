import React from 'react';
import Router from './routes';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {Provider} from 'react-redux';
import {configureStore} from './store';
const theme = createMuiTheme({
})

const App = () => {
	return(
		
		<Grid container direction="column" alignItems="center" justify="center">
		<Provider store={configureStore()}>
			<Router />
		</Provider>
		</Grid>
		
		)
}

export default App;