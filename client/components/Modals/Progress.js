import React from 'react';

class Progress extends React.Component{
	render(){
		return(
			<div className="modal is-active animate">
				<div className="modal-background"/>
				<div className="modal-content is-clipped">
					<div className="columns">
						<div className="column is-3"/>
						<div className="column is-6">
							<progress className="progress is-large is-info" max="100">60%</progress>
							<h4 className="title is-4 is-spaced wq-note has-text-centered loading-text">Loading...</h4>
						</div>
						<div className="column is-3"/>
					</div>
				</div>
			</div>
		)
	}
}

export default Progress;