import React from 'react';
import {
			Select,
			MenuItem,
			Modal,
			Grid,
			Card,
			CardHeader,
			CardContent,
			Button,
			Typography,
			TextField,
			Paper,
			Container,
			Dialog,
			DialogTitle,
			InputLabel,
			Input

		} from '@material-ui/core';
import {

		create,
		addContact,
		updateContact,
		deleteContact

	} from '../../../actions';
import {

		Check,Clear,Edit,Close

	} from '@material-ui/icons';

import {connect} from 'react-redux';
import styles from '../styles';
class AddContact extends React.Component{
	constructor(props){
		 super(props);
		 this.originalState = {
			firstname: '',
			lastname: '',
			email: '',
			work_phone: '',
			mobile_phone: '',
			home_phone: '',
			city: '',
			state: '',
			country: '',
			postcode: '',
			once: false,
			confirm: false,
			groupid: undefined,
			title:"Add Contact",
			allow: false
		}
		this.state = this.originalState;
	}
	componentDidUpdate(){
		if(this.props.edit){
			let {firstname,lastname,email,work,mobile,home,city,state,country,postcode,groupid} = this.props.payload;
			if(!this.state.once){
				this.setState({

						firstname,
						lastname,
						email,
						work_phone:work,
						mobile_phone:mobile,
						home_phone:home,
						city,
						state,
						groupid,
						country,
						postcode,
						once: true,
						title: "Update Contact"

				})
			}
		}
	}

	handleInput = e => {
		let {value,name} = e.target;
		if(name.match(/phone/g)){
		  if(!value.match(/^[a-zA-Z]/)){
			var re = /^\(?([0-9]{2})\)?[-. ]?([0-9]{0,3})[-. ]?([0-9]{0,4})$/; 
			var subst = '(+$1) $2 $3'; 
			if(value.length<=16){
				value=value.replace(re, subst);
				this.setState({
					[name]:value.length > 1  ? value.replace(/  +/g,' ') : value.replace(/ +/g,'')
				})
			}
			}else{
				value=""
			}


		}
		else{

			this.setState({
				[name]:value.length > 1  ? value.replace(/  +/g,' ') : value.replace(/ +/g,'')
			})
		}
		
	}

	createModal = () => {

		this.setState(this.originalState);
		this.props.dispatch(create(false,false,null));
	}

	submit = async (e) => {
		e.preventDefault();
		let {firstname,lastname,email,work_phone,mobile_phone,home_phone,city,state,country,postcode} = this.state;
		let data = {
			first_name: firstname,
			last_name: lastname,
			email,
			work_phone,
			mobile_phone,
			home_phone,
			state_or_province: state,
			country,
			postal_code:postcode,
			city,
			userid: this.props.user.userid,
			groupid: this.state.groupid || 0
		}
		let token = this.props.user.token;
		if(this.props.edit){
			data.contactid = this.props.payload.contactid;
			let res = await this.props.dispatch(updateContact(data,token));
			if(res==="success"){
				this.setState(()=>{
					return this.originalState
				},()=>{
					this.createModal();
				})
			}
		}

		else {
			let res = await this.props.dispatch(addContact(data,token));
			if(res==="success"){
				this.setState({...this.originalState,title: "Contact Added"})
				setTimeout(()=>{this.setState({title:"Add Contact"})},800)
			}
		}
	}


	delete = async () => {
		let contactid = this.props.payload.contactid;
		let token = this.props.user.token;
		let res = await this.props.dispatch(deleteContact(contactid,token,this.props.user.userid));
		if(res==="success"){
			this.setState(()=>{
				return this.originalState
			},()=>{
				this.createModal();
			})
			
		}
	}

	confirmDelete = () => {
		this.setState({confirm: true})
	}

	changeGroup = name => e => {
		this.setState({
			[name]:e.target.value
		})
	}

	render(){
		let {firstname,lastname,email,work_phone,mobile_phone,home_phone,city,state,country,postcode} = this.state;
		
		return(	
				<Modal open={this.props.open}>
					<Grid container alignItems="center" justify="center" style={{height: '100vh',overflow: 'auto'}}>
						<Grid item xs={12} sm={7} md={5} lg={3}>
						<Card>
						<CardHeader title={this.state.title} subheader="Save your contacts."/>
						<form onSubmit={this.submit} style={{width: '100%',backgroundColor: '#fff'}}>
								{this.props.edit && (!this.state.allow ? <Button onClick={()=>this.setState({allow: true})}><Edit />Edit</Button>
																	: 
								
																	<Button onClick={()=>this.setState({allow: false})}><Close />Cancel Editting</Button>)
								}
						         <Grid container spacing={3} style={{padding: '10px'}}>
						         	<Grid item xs={12} sm={6}>
						         		 <TextField   
								            fullWidth
								            onInput={this.handleInput}
								            id="firstname"
								            label="First Name"
								            disabled={this.props.edit && !this.state.allow}
								            name="firstname"
								            autoComplete="firstname"
								            value={firstname}
								            autoFocus
								            required
								          />
						         	</Grid>

						         	<Grid item xs={12} sm={6}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            id="lastname"
								            label="Last Name"
								            disabled={this.props.edit && !this.state.allow}
								            name="lastname"
								            autoComplete="lastname"
								            value={lastname}
								            required
								          />
								     </Grid> 

								   <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            id="email"
								            disabled={this.props.edit && !this.state.allow}
								            label="Email Address"
								            name="email"
								            type="email"
								            autoComplete="email"
								            value={email}
								          />
						         	</Grid>

						         	 <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="work_phone"
								            label="Work Phone"
								            name="work_phone"
								            autoComplete="work_phone"
								            value={work_phone}
								          />
						         	</Grid>

						         	 <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="mobile_phone"
								            label="Mobile Phone"
								            name="mobile_phone"
								            autoComplete="mobile_phone"
								            value={mobile_phone}
								          />
						         	</Grid>

						         	 <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="home_phone"
								            label="Home Phone"
								            name="home_phone"
								            autoComplete="home_phone"
								            value={home_phone}
								          />
						         	</Grid>

						         	 <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="city"
								            label="City"
								            name="city"
								            autoComplete="city"
								            value={city}
								          />
						         	</Grid>


						         	 <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="state"
								            label="State/Province"
								            name="state"
								            autoComplete="state"
								            value={state}
								          />
						         	</Grid>

						         	 <Grid item xs={12} sm={8}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="country"
								            label="COUNTRY"
								            name="country"
								            autoComplete="country"
								            value={country}
								          />
						         	</Grid>

						         	<Grid item xs={12} sm={4}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
								            disabled={this.props.edit && !this.state.allow}
								            id="postcode"
								            label="POSTAL"
								            name="postcode"
								            autoComplete="postcode"
								            value={postcode}
								          />
						         	</Grid>
								{this.props.group &&
						         	<Grid item xs={12}>
										<InputLabel htmlFor="group">Contact Group</InputLabel>
										<Select 
											style={{width: '100%'}}
											disabled={this.props.edit && !this.state.allow}
											input={<Input id="group" />}
											onChange={this.changeGroup('groupid')}
											value={this.state.groupid}
											>
											{
												this.props.group.map(key=>{
													return (
															<MenuItem value={key.groupid}>{key.name}</MenuItem>
														)
												})
											}
										</Select>
						         	</Grid>

						         }

						         	<Grid item xs={12} sm={6}>
						         		<Button disabled={this.props.edit && !this.state.allow} type="submit" style={{width: '100%'}} variant="contained" color="primary">{this.props.edit ? "UPDATE" : "CREATE"}</Button>
						         	</Grid>

						         	<Grid item xs={12} sm={6}>
						         		<Button onClick={()=>this.createModal()} style={{width: '100%'}} variant="contained" color="secondary">CANCEL</Button>
						         	</Grid>
								{this.props.edit &&
						         	<Grid item xs={12} sm={12}>
						         		<Button disabled={this.props.edit && !this.state.allow} onClick={()=>this.confirmDelete()} style={{width: '100%'}} variant="contained" color="secondary">DELETE</Button>
						         	</Grid>
						         }


						         </Grid>

						</form>
						 </Card>
							
							<Dialog open={this.state.confirm}>
								<Grid container>
									<Grid item xs={12} sm={12} lg={12} style={{padding: '20px'}}>
										<DialogTitle>Delete Contact?</DialogTitle>
										<Grid container direction="row" alignItems="center" justify="space-between" spacing={5}>
											<Grid item>
												<Button onClick={()=>this.setState({confirm: false})}>
													<Clear />
												</Button>
											</Grid>

											<Grid item>
												<Button onClick={()=>this.delete()}>
													<Check />
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Dialog>

						</Grid>
						
					</Grid>

					
				</Modal>
			)
	}
}

const mapStateToProps = (state) => {
	return {

		user: state.user.user,
		group: state.group.groups,
		open: state.ui.open,
		edit: state.ui.edit,
		payload: state.ui.payload
	}
}

export default connect(mapStateToProps)(AddContact);