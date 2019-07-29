import React from 'react';
import Router from './routes';
import {Container,Header} from './global-components';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
})

const App = () => {
	return(
		<Container>
			<Header />
			<Router />
		</Container>
		)
}

export default App;