import React from 'react';
import {getProducts} from './Actions';
import ProductCard from './ProductCard';
import EndOfContent from './EndOfContent';
import Progress from '../Modals/Progress';

class Products extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			products: [],
			next_page: [],
			current_page_index: 1,
			sort_by: '',
			ent_of_content: false,
			loading:false
		};
	}

	getProducts = () => {
		let {sort_by,end_of_content,products,loading,current_page_index} = this.state;
		if( !end_of_content && !loading ){
			this.setState({loading:true,current_page_index:current_page_index+1},()=>{
				getProducts(current_page_index,sort_by).then( response => {
					if( response.success ){
						products = [...products,...response.products];
						end_of_content = response.end_of_content;
					}
					this.setState({products,end_of_content,loading:false},()=>{
						console.log("done",this.state)
					});
				})
				
			});
		}
	};
	handleSortOption = e => {
		let sort_by = e.target.value;
		this.setState({sort_by,current_page_index:1}, () => {
			this.getProducts();
		});
		this.setState({sort_by});
	};
	componentDidMount() {
		this.getProducts();
		window.addEventListener('scroll', this.handleScroll);
	}
	
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	
	handleScroll = () => {
		let scroll_y = Math.ceil(window.scrollY);	//	get scroll position
		let inner_height = Math.ceil(window.innerHeight);	//	get content height
		let product_container = document.getElementById("product_container");
		if (
			(scroll_y+inner_height >= product_container.offsetHeight)
			&& product_container.offsetHeight > 0
		) {	//	check if scrolled to bottom
			this.getProducts();
			window.scrollTo(0, scroll_y+inner_height);
		}
	};
	
	render(){
		//	get vars to render
		let {products,sort_by,end_of_content,loading} = this.state;
		return(
			<div className="container">
				
				<div className="column is-full">
					<h2 className="title is-1 is-spaced wq-note has-text-centered">
						Products
					</h2>
				</div>
				<div className="column is-full">
					<h5 className="title is-1 is-spaced wq-note has-text-centered">
						Filters
					</h5>
					<div className="column">
						<form>
							{/** SELECT FOR SORTING || CONTROLLED **/}
							<div className="select" tabIndex={0}>
								<select onChange={this.handleSortOption} value={sort_by}>
									<option value={''} disabled={true}>Sort by</option>
									<option value={'size'}>size</option>
									<option value={'price'}>price</option>
									<option value={'id'}>id</option>
								</select>
							</div>
						</form>
					</div>
				</div>
				<div className="columns is-multiline" id="product_container">
					{/** PRODUCT **/}
					{
						products.map( (product,index) =>
							<ProductCard
								key={product.id}
								index={index}
								id={product.id}
								date={product.date}
								face={product.face}
								size={product.size}
								price={product.price}
							/>
						)
					}
				</div>
				{/** SHOW PROGRESS BAR WHILE FETCHING PRODUCTS **/}
				{
					console.log(loading)
				}
				{loading ? <Progress /> : null}
				{/** SHOW IF NO MORE PRODUCTS **/}
				{end_of_content ? <EndOfContent/> : null}
			</div>
		)
	}
}

export default Products;