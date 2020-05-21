import React from 'react';

class Advertisement extends React.Component{
	getRandomInt = (min, max) => {
		//	as we are changing RANGE for Random numbers
		min = Math.ceil(min);
		max = Math.floor(max);
		return (Math.floor(Math.random() * (max - min + 1)) + min);
	};
	render(){
		const {index,repetition_frequency} = this.props;
		return(
			<div className="column is-one-third">
				<img
					className="ad"
					src={`http://localhost:3000/ads/?r=${this.getRandomInt(index+1,(index+repetition_frequency)-1)}`}
				/>
			</div>
		)
	}
}

export default Advertisement;