   import React from 'react';
import styles from './styles.js';
import {withStyles} from '@material-ui/styles';
import {Grid,Typography,Button,TextField,Hidden,Modal,Tooltip} from '@material-ui/core';
import {PersonAdd,ExitToApp,GroupAdd,Menu,Search} from '@material-ui/icons';
import {logout,create,searchContact,getGroup,getByGroup} from '../../actions';
import {connect} from 'react-redux';

import {Group,Searched,AddContact} from './components';

class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			user: [],
			search:'',
			groupmodal: false,
		}
	}

	componentDidUpdate(){
		try{
			this.props.dispatch(getGroup(this.props.user.userid,this.props.user.token));
			this.props.dispatch(getByGroup(this.props.user.userid,this.props.user.token));
		}
		catch(err){}
	}

	logout = () => {
		this.props.dispatch(logout());
	}

	createModal = () => {
		this.props.dispatch(create(true));
	}

	search = keyword => {
		this.props.dispatch(searchContact(this.props.user.userid,this.props.user.token,keyword));
	}

	hideModal = () => this.setState({groupmodal: false})

	render(){
		let {user,classes} = this.props;
		return(
				<Grid
				 container
				 direction="row"
				 justify="space-between"
				 alignItems="center"
				 style={styles.header}
				>

					<Hidden xsDown><Grid item>
						<Typography variant="p" style={{color: '#fff',letterSpacing: '1.2px',fontSize: '1.2rem'}}>
							Address Book
						</Typography>
					</Grid></Hidden>

					<Hidden smUp><Grid item>
						<Typography variant="p" style={{color: '#fff',letterSpacing: '1.2px',fontSize: '1.2rem'}}>
							addr.bk
						</Typography>
					</Grid></Hidden>



					{user && <Grid item direction="row">

						<Hidden xsDown><Searched search={this.search}/></Hidden>

						<Hidden smUp><Button onClick={()=>this.setState({mobsearch:true})} style={styles.item}>
							<Search style={{color: '#fff'}}/>
						</Button></Hidden>
						<Tooltip title="Add Group">
						<Button onClick={()=>this.setState({groupmodal:true})} style={styles.item}>
							<GroupAdd style={{color: '#fff'}}/>
						</Button>
						</Tooltip>

						<Tooltip title="Add Contact">
						<Button onClick={()=>this.createModal()} style={styles.item}>
							<PersonAdd style={{color: '#fff'}}/>
						</Button>
						</Tooltip>

						<Tooltip title="Sign out">
						<Button onClick={()=>this.logout()} style={styles.item}>
							<ExitToApp style={{color: '#fff'}}/>
						</Button>
						</Tooltip>

					</Grid>}

					<Group hideModal={this.hideModal} open={this.state.groupmodal}/>
					<AddContact />
					<Hidden smUp><Modal open={this.state.mobsearch}>
						<Grid direction="column" style={{width: '100vw',height:'100vh'}} container alignItems="center" justify="center">
							<Searched search={this.search} />
							<Button onClick={()=>this.setState({mobsearch:false})} style={{margin: '20px 0'}} variant="contained" color="primary">Search</Button>
						</Grid>
					</Modal></Hidden>
					
					
				</Grid>
			)
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user.user
	}
}
export default connect(mapStateToProps)(withStyles(styles)(Header));
