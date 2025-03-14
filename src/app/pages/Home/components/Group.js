import React from 'react';
import {Grid,Card,CardHeader,CardContent,Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {create} from '../../../actions';
class Group extends React.Component {
	manage = (data) => {
		this.props.dispatch(create(true,true,data));
	}

	render(){
		return(
				<Grid container direction="row" spacing={1} style={{height: 'fit-content',padding: '10px'}}>
						{
							this.props.bygroup ? Object.keys(this.props.bygroup).map(key=>{
								return(

										<Grid item xs={12} sm={4} lg={2}>
											<Card style={{height: 'fit-content'}}>
												<CardHeader
												title={key}
								 				style={{backgroundColor: 'teal',color: '#fff'}}
												/>
												<CardContent style={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'start',
												}}>
													{this.props.bygroup[key].map(key=>{
														return(
																<Button  
																	onClick={()=>this.manage(key)}
																	style={{
																		fontSize: '0.8rem',
																		color: '#444',
																		textTransform: 'capitalize'
																	}}
																	>
																	{key.firstname} {key.lastname}
																</Button>
															)
													})	}
												</CardContent>
											</Card>
									   </Grid>	

									)
							}): ''
						}
				</Grid>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		bygroup: state.gcontact.bygroup
	}
}

export default connect(mapStateToProps)(Group);