import React from 'react';
import {Modal,Card,CardHeader,CardContent,TextField,Button,Grid,Divider,Typography} from '@material-ui/core';
import {DeleteForever,KeyboardBackspace,Save,Edit} from '@material-ui/icons';
import {addGroup} from '../../../actions';
import {connect} from 'react-redux';
class Group extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			title: 'Add Group',
			onAdd: true,
			groupname: ''
		}
	}

	saveGroup = async (e) => {
		e.preventDefault();
		let res = await this.props.dispatch(addGroup(this.props.user.userid,this.state.name,this.props.user.token));
		this.setState({title: res,name:''});
		setTimeout(()=>this.setState({title: "Add Group",name:''}),800);
	}

	setName = (e) => this.setState({name: e.target.value})

	changeGroupName = (e) => {
		this.setState({
			groupname: e.target.value
		})
	}

	submitChangeGroup = (e) => {
		e.preventDefault();
	}

	viewList = () => {
		return(
			<React.Fragment>
				{
					Object.keys(this.props.bygroup).map(key=>{
						return(

									<Grid container direction="row" alignItems="center" justify="space-between" style={{overflow: 'auto'}}>					
										<Grid item xs={6}>
											<Card style={{padding: '5px'}}>{key}</Card>
										</Grid>
										<Grid item xs={6}>
											<Grid container direction="row" alignItems="flex-end" justify="flex-end">
												<Button><Edit /></Button>
												<Button><DeleteForever /></Button>	
											</Grid>
										</Grid>	
									</Grid>
									
							)
					})
				}
				</React.Fragment>
			)
	}

	addGroup = () => {
		return(
			<React.Fragment>
			<TextField onInput={this.setName} fullWidth value={this.state.name} label="Group Name" autofocus required/>
			<Grid container direction="row" alignItems="center" justify="space-between">

					<Button type="submit" style={{margin: '10px'}} variant="contained" color="primary">
						Create Group
					</Button>

					<Button onClick={()=>this.setState({onAdd:false,title:'List'})} style={{margin: '10px'}} variant="contained" color="primary">
						View List
					</Button>

					<Button onClick={()=>this.props.hideModal()} style={{margin: '10px'}} variant="contained" color="secondary">
						Cancel
					</Button>
			</Grid>
			</React.Fragment>
		)
	}

	render(){
		return(

				<Modal open={this.props.open}>	
					<Grid container direction="row" alignItems="center" justify="center" style={{width: '100vw',height:'100vh'}}>

							
									<Grid item xs={12} sm={7} md={6} lg={3}>
											<form onSubmit={this.saveGroup}>
											<Card>
												{!this.state.onAdd && <Button onClick={()=>this.setState({onAdd:true})}><KeyboardBackspace style={{padding: '5px'}}/></Button>}
												<CardHeader title={this.state.title} subheader="Group your contacts."/>
												<CardContent style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent:'center'}}>
													{this.state.onAdd ?
														
														this.addGroup()

														:

														this.viewList()
													}
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
		user: state.user.user,
		bygroup: state.gcontact.bygroup
	}
}

export default connect(mapStateToProps)(Group);