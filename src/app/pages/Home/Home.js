import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/styles';
import {Grid,Card,Typography,Table,TableBody,TableHead,TableRow,TableCell,Hidden} from '@material-ui/core';
import {List,Information} from './components';
class Home extends React.Component{
	componentDidMount(){
		let token = localStorage.getItem('token');
		if(!token)this.props.history.push('/signin');
	}
	render(){
		return(
				<Grid
				 container
				 direction="row"
				 justify="center"
				 alignItems="center"
				 style={{width:'inherit',height: '90vh'}}
				>

					<Grid item lg={11} xs={12} sm={11} md={11}>
						<Card style={{height: '80vh'}}>
							
								<Table>
									<TableHead>
										<TableRow>
											
												<TableCell>First Name</TableCell>											
												<TableCell>Last Name</TableCell>
												<Hidden xsDown><TableCell>Email</TableCell></Hidden>
												<Hidden xsDown><TableCell>Work Phone</TableCell></Hidden>
												<Hidden smDown><TableCell>Mobile Phone</TableCell></Hidden>
												<Hidden mdDown><TableCell>Home Phone</TableCell></Hidden>
												<Hidden mdDown><TableCell>City</TableCell></Hidden>
												<Hidden mdDown><TableCell>State/Province</TableCell></Hidden>
												<Hidden mdDown><TableCell>Postal Code</TableCell></Hidden>
												<Hidden mdDown><TableCell>Country</TableCell></Hidden>
										</TableRow>
									</TableHead>

									<TableBody>
												<TableRow>
													<TableCell>John</TableCell>
													<TableCell>Garcia</TableCell>
												</TableRow>
										</TableBody>
								</Table>
							
						</Card>
					</Grid>

				</Grid>
			)
	}
}

export default Home;