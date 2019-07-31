import React from 'react';
import Router from './routes';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {Provider} from 'react-redux';
import {configureStore} from './store';
import {PersistGate} from 'redux-persist/integration/react';
const {store,persistor} = configureStore();

const theme = createMuiTheme({
})

const App = () => {
	return(
		
		<Grid container direction="column" alignItems="center" justify="center">
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router />
			</PersistGate>
		</Provider>
		</Grid>
		
		)
}

export default App;