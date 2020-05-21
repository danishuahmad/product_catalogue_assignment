import React from 'react';

class IdleMonitor extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			timeout_id: null  //	we will store timer id here
		};
	}
	componentDidMount() {
		//	listen to all events that may suggest an activity by user
		window.addEventListener("mousemove", this.resetTimer);
		window.addEventListener("mousedown", this.resetTimer);
		window.addEventListener("keypress", this.resetTimer);
		window.addEventListener("DOMMouseScroll", this.resetTimer);
		window.addEventListener("mousewheel", this.resetTimer);
		window.addEventListener("touchmove", this.resetTimer);
		window.addEventListener("MSPointerMove", this.resetTimer);
		this.startTimer();
	}
	componentWillUnmount() {
		// component/window closing -> stop listening to
		window.removeEventListener("mousemove", this.resetTimer);
		window.removeEventListener("mousedown", this.resetTimer);
		window.removeEventListener("keypress", this.resetTimer);
		window.removeEventListener("DOMMouseScroll", this.resetTimer);
		window.removeEventListener("mousewheel", this.resetTimer);
		window.removeEventListener("touchmove", this.resetTimer);
		window.removeEventListener("MSPointerMove", this.resetTimer);
	}
	startTimer = () => {	//	timer started to check if user is idle
		this.setState({
			timeout_id: window.setTimeout(this.isIdle, 7000)
		});
	};
	resetTimer = (e) => {	//	some activity done by user
		let {timeout_id} = this.state;
		window.clearTimeout(timeout_id);
		this.isActive();
	};
	isIdle = () => {	//	timed out -> tell the Interactive Component to do something
		this.props.isIdle();
	};
	isActive = () => {	//	restart timer -> to listen again after some activity
		this.startTimer();
	};
	render(){	//	render the component it is encapsulating to
		return(
			<div>{this.props.children}</div>
		)
	}
}

export default IdleMonitor;