import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/styles';
import {Grid,Card,Typography,Table,TableHead,TableRow,TableCell,Hidden} from '@material-ui/core';
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

					<Grid item lg={10} xs={12} sm={10} md={10}>
						<Card style={{height: '80vh'}}>
							
								<Table>
									<TableHead>
										<TableRow>
											
												<TableCell>First Name</TableCell>											
												<TableCell>Last Name</TableCell>
												<Hidden xsDown><TableCell>Email</TableCell></Hidden>
												<Hidden xsDown><TableCell>Work Phone</TableCell></Hidden>
										</TableRow>
									</TableHead>
								</Table>
							
						</Card>
					</Grid>

				</Grid>
			)
	}
}

export default Home;