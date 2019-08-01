import React from 'react';
import {Modal,Grid,Card,Button,Typography,TextField,Paper,Container} from '@material-ui/core';
import {create,addContact} from '../../../actions';
import {connect} from 'react-redux';
import styles from './styles';
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
			once: false
		}
		this.state = this.originalState;
	}

	componentDidUpdate(){
		if(this.props.edit){
			let {firstname,lastname,email,work,mobile,home,city,state,country,postcode} = this.props.payload;
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
						country,
						postcode,
						once: true

				})
			}
		}
	}

	handleInput = e => {
		let {value,name} = e.target;
		this.setState({
			[name]:value.length > 1 ? value.replace(/  +/g,' ') : value.replace(/ +/g,'')
		})
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
			userid: this.props.user.userid
		}

		if(this.props.edit){
			data.contactid = this.props.payload.contactid;
			console.log(data);
		}

		else {
			let res = await this.props.dispatch(addContact(data,this.props.user.token));
			if(res==="success"){
				this.setState(this.originalState)
			}
		}
	}

	render(){
		let {firstname,lastname,email,work_phone,mobile_phone,home_phone,city,state,country,postcode} = this.state;
		
		return(	
				<Modal open={this.props.open}>
					<Container maxWidth="xs">
						<br />
						<form onSubmit={this.submit} style={{width: '100%',backgroundColor: '#fff'}}>
						         <Grid container spacing={3} style={{padding: '10px'}}>
						         	<Grid item xs={12} sm={6}>
						         		 <TextField   
								            fullWidth
								            onInput={this.handleInput}
								            id="firstname"
								            label="First Name"
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
								            label="Email Address"
								            name="email"
								            autoComplete="email"
								            value={email}
								          />
						         	</Grid>

						         	 <Grid item xs={12}>
						         		 <TextField
								            fullWidth
								            onInput={this.handleInput}
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
								            id="postcode"
								            label="POSTAL"
								            name="postcode"
								            autoComplete="postcode"
								            value={postcode}
								          />
						         	</Grid>

						         	<Grid item xs={12} sm={6}>
						         		<Button type="submit" style={{width: '100%'}} variant="contained" color="primary">{this.props.edit ? "UPDATE" : "CREATE"}</Button>
						         	</Grid>

						         	<Grid item xs={12} sm={6}>
						         		<Button onClick={()=>this.createModal()} style={{width: '100%'}} variant="contained" color="secondary">CANCEL</Button>
						         	</Grid>
								{this.props.edit &&
						         	<Grid item xs={12} sm={12}>
						         		<Button onClick={()=>this.createModal()} style={{width: '100%'}} variant="contained" color="secondary">DELETE</Button>
						         	</Grid>
						         }


						         </Grid>
						</form>
					</Container>
				</Modal>
			)
	}
}

const mapStateToProps = (state) => {
	return {

		user: state.user.user,
		open: state.ui.open,
		edit: state.ui.edit,
		payload: state.ui.payload
	}
}

export default connect(mapStateToProps)(AddContact);