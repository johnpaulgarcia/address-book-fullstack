import React from 'react';
import {Table,TableBody,TableHead,TableRow,TableCell,Hidden,Button} from '@material-ui/core';
import {Settings,ArrowDropDown,ArrowDropUp} from '@material-ui/icons';
import {connect} from 'react-redux';
import {getContact,create} from '../../../actions';
import AddContact from './AddContact';
class ContactTable extends React.Component<Props,State>{

	constructor(props){
		super(props);
		this.state = {
			sort: false
		}
	}

	componentDidMount(){
		this.props.dispatch(getContact(this.props.user.userid,this.props.user.token));
	}

	manage = (data) => {
		this.props.dispatch(create(true,true,data));
	}

	sort = () => {
		this.setState(()=>{
			return {
				sort: !this.state.sort
			}
		},()=>{
			let {sort} = this.state;
			this.props.dispatch(getContact(this.props.user.userid,this.props.user.token,sort));
		})
	}

	render(){
		return(
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
												<TableCell><Button onClick={()=>this.sort()}>{this.state.sort ? <ArrowDropUp /> : <ArrowDropDown />}<pre>Last Name</pre></Button></TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
												{
													this.props.contact ? this.props.contact.contact.map(key=>{
														return(

																<TableRow>
													<TableCell>{key.firstname}</TableCell>
													<TableCell>{key.lastname}</TableCell>
													<Hidden xsDown><TableCell>{key.email}</TableCell></Hidden>
													<Hidden xsDown><TableCell>{key.work}</TableCell></Hidden>
													<Hidden smDown><TableCell>{key.mobile}</TableCell></Hidden>
													<Hidden mdDown><TableCell>{key.home}</TableCell></Hidden>
													<Hidden mdDown><TableCell>{key.city}</TableCell></Hidden>
													<Hidden mdDown><TableCell>{key.state}</TableCell></Hidden>
													<Hidden mdDown><TableCell>{key.postcode}</TableCell></Hidden>
													<Hidden mdDown><TableCell>{key.country}</TableCell></Hidden>
													<TableCell><Button onClick={()=>this.manage(key)}><Settings/></Button></TableCell>
												</TableRow>

															)
													}) : <div />

												}
										</TableBody>
								</Table>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		contact: state.contact.contact,
		user: state.user.user
	}
}

export default connect(mapStateToProps)(ContactTable);