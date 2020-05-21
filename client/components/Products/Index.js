import React from 'react';
import {getProducts} from './Actions';
import ProductCard from './ProductCard';
import EndOfContent from './EndOfContent';
import Progress from '../Modals/Progress';
import IdleMonitor from '../General/IdleMonitor';

class Products extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			products: [],
			next_page_products: [],
			current_page_index: 1,
			sort_by: '',
			ent_of_content: false,
			loading:false
		};
	}

	getProducts = (save_products = false) => {
		let {products,next_page_products,current_page_index,sort_by,end_of_content,loading,} = this.state;
		if( !end_of_content && !loading ){
			this.setState({loading:true},()=>{
				getProducts(current_page_index,sort_by).then( response => {
					if( response.success ){
						if( save_products ){	//	save for user to scroll down
							next_page_products = [...next_page_products,...response.products];
						}else{	//	add in catalogue right now
							products = [...products,...response.products];
						}
						
						end_of_content = response.end_of_content;
					}
					this.setState({products,next_page_products,end_of_content,loading:false,current_page_index:current_page_index+1},()=>{
						console.log("done",this.state)
					});
				})
				
			});
		}
	};
	getProductsFromSavedCatalogue = () => {
		let {products,next_page_products} = this.state;
		products = [...products,...next_page_products];
		next_page_products = [];
		this.setState({products,next_page_products});
	};
	handleSortOption = e => {
		let sort_by = e.target.value;
		this.setState({sort_by,current_page_index:1,end_of_content:false,products:[]}, () => {
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
			
			let {next_page_products} = this.state;
			if( next_page_products.length > 0 ){
				this.getProductsFromSavedCatalogue();
			}else{
				this.getProducts();
			}
			window.scrollTo(0, scroll_y+inner_height);
		}
	};
	isIdle = () => {
		let {next_page_products} = this.state;
		if( next_page_products.length === 0 ){
			this.getProducts(true);	//	get products but don't show them yet
		}
	};
	render(){
		//	get vars to render
		let {products,sort_by,end_of_content,loading} = this.state;
		return(
			<IdleMonitor isIdle={this.isIdle}>
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
					{loading ? <Progress loading={loading} /> : null}
					{/** SHOW IF NO MORE PRODUCTS **/}
					{end_of_content ? <EndOfContent/> : null}
				</div>
			</IdleMonitor>
		)
	}
}

export default Products;