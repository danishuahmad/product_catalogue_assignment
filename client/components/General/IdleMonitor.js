import React from 'react';

class Products extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			timeout_id: null
		};
	}
	componentDidMount() {
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
		window.removeEventListener("mousemove", this.resetTimer);
		window.removeEventListener("mousedown", this.resetTimer);
		window.removeEventListener("keypress", this.resetTimer);
		window.removeEventListener("DOMMouseScroll", this.resetTimer);
		window.removeEventListener("mousewheel", this.resetTimer);
		window.removeEventListener("touchmove", this.resetTimer);
		window.removeEventListener("MSPointerMove", this.resetTimer);
	}
	startTimer = () => {
		this.setState({
			timeout_id: window.setTimeout(this.isIdle, 7000)
		});
	};
	resetTimer = (e) => {
		let {timeout_id} = this.state;
		window.clearTimeout(timeout_id);
		this.isActive();
	};
	isIdle = () => {
		this.props.isIdle();
	};
	isActive = () => {
		this.startTimer();
	};
	render(){
		return(
			<div>
				{
					this.props.children
				}
			</div>
		)
	}
}

export default Products;