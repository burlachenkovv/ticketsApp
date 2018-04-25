import React from 'react';

const Currency = ({currencies, handler}) => {
	return(
		<div className="currency">
			{				
				currencies.map((item) => 
					<button	
						key={item.name}
						children={item.name}
						className={(item.active) ? "selected" : null}
						onClick={() => handler(item.name)}
					/>
				)
			}
		</div>
	);
}

export default Currency;