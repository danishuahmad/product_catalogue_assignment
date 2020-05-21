import React from 'react';
import {timeAgo} from '../../utility';

class ProductCard extends React.Component{
	render(){
		const {index,id,date,size,face,price} = this.props;
		return(
			<div key={id} tabIndex={index} className="column is-one-third">
				
				<div className="card product">
					<div className="card-content">
						<div className="content">
							<time dateTime="2016-1-1">
								{timeAgo(date)}
							</time>
						</div>
						<div className="media">
							<div className="media-content has-text-centered">
								<p className="title" style={{'fontSize':`${size}px`}}>
									{face}
								</p>
								<p className="subtitle is-6">{id}</p>
							</div>
						</div>
					</div>
					<div className="price-tag">
						<p>${Number(price/100).toFixed(2)}</p>
					</div>
				</div>
			</div>
		)
	}
}

export default ProductCard;