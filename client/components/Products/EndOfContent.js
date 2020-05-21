import React from 'react';

class EndOfContent extends React.Component{
	render(){
		return(
			<div className="modal is-active">
				<div className="modal-background"/>
				<div className="modal-content is-clipped">
					<div className="columns">
						<div className="column is-3"/>
						<div className="column is-6">
							<progress className="progress is-large is-info" max="100">60%</progress>
						</div>
						<div className="column is-3"/>
					</div>
				</div>
			</div>
		)
	}
}

export default EndOfContent;