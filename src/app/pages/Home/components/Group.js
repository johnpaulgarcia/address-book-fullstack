import React from 'react';
import {Grid,Card,CardHeader,CardContent,Button} from '@material-ui/core';
import {connect} from 'react-redux';
class Group extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return(
				<Grid container direction="row" spacing={3} style={{height: '80vh',padding: '10px'}}>
						{
							this.props.groups.map(key=>{
								return(

										<Grid item xs={11} sm={2}>
											<Card>
												<CardHeader
												title={key.name}
												style={{backgroundColor: 'teal',color: '#fff'}}
												/>
												<CardContent>
													<Button>
														
													</Button>
												</CardContent>
											</Card>
									   </Grid>	

									)
							})
						}
				</Grid>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		groups: state.group.groups
	}
}

export default connect(mapStateToProps)(Group);