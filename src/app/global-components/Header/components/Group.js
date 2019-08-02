import React from 'react';
import {Modal,Card,CardHeader,CardContent,TextField,Button,Grid} from '@material-ui/core';
import {addGroup} from '../../../actions';
import {connect} from 'react-redux';
class Group extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			title: 'Add Group'
		}
	}

	saveGroup = async (e) => {
		e.preventDefault();
		let res = await this.props.dispatch(addGroup(this.props.user.userid,this.state.name,this.props.user.token));
		this.setState({title: res,name:''});
		setTimeout(()=>this.setState({title: "Add Group",name:''}),800);
	}

	setName = (e) => this.setState({name: e.target.value})

	render(){
		return(

				<Modal open={this.props.open}>	
					<Grid container direction="row" alignItems="center" justify="center" style={{width: '100vw',height:'100vh'}}>

							
									<Grid item xs={12} sm={7} md={6} lg={3}>
											<form onSubmit={this.saveGroup}>
											<Card>
												<CardHeader title={this.state.title} subheader="Group your contacts."/>
												<CardContent style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent:'center'}}>
													<TextField onInput={this.setName} fullWidth value={this.state.name} label="Group Name" autofocus/>
													<Grid container direction="row" alignItems="center" justify="space-between">

															<Button type="submit" style={{margin: '10px'}} variant="contained" color="primary">
																Create Group
															</Button>

															<Button onClick={()=>this.props.hideModal()} style={{margin: '10px'}} variant="contained" color="secondary">
																Cancel
															</Button>

													</Grid>
												</CardContent>
											</Card>
											</form>
									</Grid>
							

					</Grid>
					</Modal>

			)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
}

export default connect(mapStateToProps)(Group);