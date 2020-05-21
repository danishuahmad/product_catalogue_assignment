import axios from 'axios';

//	PLEASE CHANGE
const PRODUCTS_LIMIT = 50;

export const getProducts = (current_page,sort_by) => {
	//	parse params to be sent
	let params = {
		_page:current_page,
		_limit:PRODUCTS_LIMIT
	};
	if( sort_by ){	//	if sort option left default
		params = {...params,_sort:sort_by}
	}
	//	send request now
	return axios.get('http://localhost:3000/api/products', {params})
		.then(function (response) {	//	success
			let end_of_content = false;
			if( response.data.length === 0 ){	//	no more products -> mark as end to stop further requests
				end_of_content = true;
			}
			return {success:true,products: response.data, end_of_content};
			
		}).catch(function (error) {
			// TODO: display handle error
			return {success:false};
		})
};