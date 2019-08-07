import React from 'react';
import {Modal,Card,CardHeader,CardContent,TextField,Button,Grid,Divider,Typography} from '@material-ui/core';
import {DeleteForever,KeyboardBackspace,Save,Edit} from '@material-ui/icons';
import {addGroup,deleteGroup,updateGroup} from '../../../actions';
import {connect} from 'react-redux';
class Group extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			title: 'Add Group',
			onAdd: true,
			groupname: '',
			editgroup: false,
			activeGroup: {
				groupid: '',
				name: ''
			}
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
					this.props.groups.map(key=>{
						return(

									<Grid container direction="row" alignItems="center" justify="space-between" style={{overflow: 'auto'}}>					
										<Grid item xs={6}>
											<Card style={{padding: '5px'}}>{key.name}</Card>
										</Grid>
										<Grid item xs={6}>
											<Grid container direction="row" alignItems="flex-end" justify="flex-end">
												<Button onClick={()=>this.modalEdit(key)}><Edit /></Button>
												<Button onClick={()=>this.deleteGroup(key)}><DeleteForever /></Button>	
											</Grid>
										</Grid>	
									</Grid>
							)
					})
				}
				</React.Fragment>
			)
	}

	deleteGroup = (group) => {
		let token = this.props.user.token;
		let userid = this.props.user.userid;
		let groupid = group.groupid;
		this.props.dispatch(deleteGroup(userid,groupid,token));
	}

	modalEdit = (group) => {
		this.setState({editgroup:true,activeGroup:{groupid:group.groupid,name:group.name}});
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

	submitChangeGroup = async () => {
		let token = this.props.user.token;
		let userid = this.props.user.userid;
		let {groupid,name} = this.state.activeGroup;
		let res = await this.props.dispatch(updateGroup(userid,groupid,name,token));
		if(res==="success"){
			this.setState({editgroup: false});
		}
	}

	handleInput = (e) => {
		this.setState({
			activeGroup: {
				groupid: this.state.activeGroup.groupid,
				name: e.target.value
			}
		})
	}

	render(){
		return(
			<React.Fragment>
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

					<Modal open={this.state.editgroup}>
										 <Grid container direction="row" alignItems="center" justify="center" style={{height: '100vh'}}>	
											<Card>
											<Grid item xs={12}>
												<TextField onInput={this.handleInput} value={this.state.activeGroup.name} InputProps={{border:'1px solid white'}} style={{padding: '5px'}}/>
											</Grid>	
											</Card>
											<Button onClick={()=>this.submitChangeGroup()} variant="contained" color="secondary">OK</Button>
										</Grid>
										</Modal>
					</React.Fragment>

			)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		groups: state.group.groups
	}
}

export default connect(mapStateToProps)(Group);