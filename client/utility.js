export const timeAgo = (date) => {
	try{
		date = new Date(date);
		let difference = (new Date()-date)/1000;
		let label = null;
		if( difference < 60 ){	//	we are dealing with seconds here
			if( difference < 10 ){difference = 'few';}
			return `${difference} seconds ago`;
		}else if( difference < 3600 ){ //  we are dealing with minutes
			difference = difference/60;
			label = 'minute';
		}else if( difference < 86400 ){  //  we are dealing with hours
			difference = difference/3600;
			label = 'hour';
		}else if( difference < 604800 ){	//	we are dealing with days
			difference = difference/86400;
			label = 'day';
		}else if( difference < 604800 + 43200 ){	//	week || letting half day to merge with week
			return '1 week ago';
		}else {	// more than a week ||return formatted date
			let day = date.getDate();
			day = day < 10 ? '0'+day:day;	//	append 0 if less than 10
			let month = date.getMonth();
			month = month < 10 ? '0'+month:month; //	append 0 if less than 10
			return `${month}-${day}-${date.getFullYear()}`;	//	DD-MM-YYYY
		}
		difference = Math.floor(difference);
		return `${difference} ${label}${difference>1?'s':''} ago`;	//	making plural just in case
	}catch(e){
		return 'Some time ago';	//	some error occurred
	}
};