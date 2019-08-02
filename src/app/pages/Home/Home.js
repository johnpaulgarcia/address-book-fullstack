import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/styles';
import {Grid,Card,Typography,FormControlLabel,Switch} from '@material-ui/core';
import {ContactTable,Group} from './components';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			listview: true
		}
	}

	switchView = () => {
		this.setState({
			listview:!this.state.listview
		})
	}

	render(){
		 if(!this.props.user){
	        	return <Redirect to="/signin"/>
	         }
		return(
				<Grid
				 container
				 direction="row"
				 justify="center"
				 alignItems="center"
				 style={{width:'inherit',height: '90vh'}}
				>

					<Grid item xs={12}>
						<Card style={{height: '90vh',overflow: 'auto'}}>
							<FormControlLabel
							style={{padding: '0 10px'}}
							control={
								<Switch 
								checked={this.state.listview}
								onChange={()=>this.switchView()}
								color="primary"
								/>
							}
							label={this.state.listview ? "List" : "Groups"}
							/>
							{this.state.listview ? <ContactTable /> : <Group />}
						</Card>
					</Grid>

				</Grid>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
	}
}
export default connect(mapStateToProps)(Home);