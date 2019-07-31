import React from 'react';
import {HashRouter,Route} from 'react-router-dom';
import {Header} from '../global-components';
import {Home,Signin,Signup} from '../pages';
class Router extends React.Component<Props,State>{
	render(){
		return(

				<HashRouter>
					<Route path="/" component={Header} />
					<Route exact path="/" component={Home} />
					<Route path="/signin" component={Signin} />
				</HashRouter>

			)
	}
}

export default Router;