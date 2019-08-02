import React from 'react';
import {TextField} from '@material-ui/core';
class Search extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			search: ''
		}
	}

	search = (e) => {
		e.persist();
		this.setState(()=>{
			return {search:e.target.value}
		},()=>{
			let {search} = this.state;
			this.props.search(search);
		})
	}

	render(){
		return(	
				<TextField 
					onInput={this.search} 
					value={this.state.search} 
					placeholder="Search Contacts" 
				    InputProps={{style:{color: 'white',borderBottom: '1px solid white'}}}
				/>
			)
	}
}

export default Search;