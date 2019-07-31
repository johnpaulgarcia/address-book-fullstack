import React from 'react';
import {Table,TableBody,TableHead,TableRow,TableCell,Hidden} from '@material-ui/core';
import {connect} from 'react-redux';
import {getContact} from '../../../actions';
class ContactTable extends React.Component<Props,State>{
	componentDidMount(){
		this.props.dispatch(getContact(this.props.user.userid,this.props.user.token));
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
										</TableRow>
									</TableHead>

									<TableBody>
												{
													this.props.contact ? this.props.contact.contact.map(key=>{
														return(

																<TableRow>
													<TableCell>{key.firstname}</TableCell>
													<TableCell>{key.lastname}</TableCell>
													<Hidden xsDown><TableCell>john.garcia@boom.camp</TableCell></Hidden>
													<Hidden xsDown><TableCell>+1 484-5555</TableCell></Hidden>
													<Hidden smDown><TableCell>+1 585-4545</TableCell></Hidden>
													<Hidden mdDown><TableCell>+1 686-1123</TableCell></Hidden>
													<Hidden mdDown><TableCell>Sorsogon</TableCell></Hidden>
													<Hidden mdDown><TableCell>Sorsogon</TableCell></Hidden>
													<Hidden mdDown><TableCell>4713</TableCell></Hidden>
													<Hidden mdDown><TableCell>PH</TableCell></Hidden>
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