import React from 'react';
import {HashRouter,Route} from 'react-router-dom';
import {Home} from '../pages';
const Router = () => {
	return(

			<HashRouter>
				<Route exact path="/" component={Home} />
			</HashRouter>

		)
}

export default Router;