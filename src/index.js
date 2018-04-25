import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Flight from './Flight';
import Currency from './Currency';

import './css/index.css';
import { tickets } from './data/tickets.json';

class Tickets extends React.Component {
	constructor() {
		super();

		this.state = {
			transfers: [true, true, true, true],
			exchange: ["USD", "EUR"],
			currencies: [{
				name: "UAH",
				rate: 1,
				active: true,
			}],
		}
	}

	componentWillMount() {
		[...this.state.exchange].forEach((item) => {
				fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${item}&json`)
				.then(response => response.json())
				.then(data => {
					const result = {
						name: item,
						rate: data[0].rate,
						active: false,
					};

					this.setState({
						currencies: [...this.state.currencies, result]
					});
				})
		});
	}

	setTransfers(value) {
		this.setState((prevState) => {
			prevState.transfers[value] = !prevState.transfers[value];

			return ({
				transfers: prevState.transfers,
			})
		});
	}

	setCurrency(currency) {
		let currencies = this.state.currencies.map(({...item}) => {
			item.active = (item.name === currency) ? true : false;
			return item;
		});

		this.setState({
			currencies: currencies
		});
	}

	render() {
		const currency = this.state.currencies.find(({active}) => active);

		const sortedTickets = tickets.sort((a, b) => {
			const val1 = parseInt(a.departure_time.replace(":", ""), 10);
			const val2 = parseInt(b.departure_time.replace(":", ""), 10);
			
			return val1 - val2;
		});

		return(
			<div className="flex">
				<div className="select">
					<span>Currency</span>
						<Currency currencies={this.state.currencies} handler={this.setCurrency.bind(this)} />
					<span>Transfers</span>
					{
						this.state.transfers.map((item, i) => 
							<div className="transfers" key={i}>
								<input
									id={`ch-${i}`}
									type="checkbox"
									checked={this.state.transfers[i]}
									onChange={() => this.setTransfers(i)}
								/>
								<label htmlFor={`ch-${i}`}>
									{
										` ${(!i) ? "Without" : i} Transfer${(i > 1 || !i) ? "s" : ""}`	
									}
								</label>
							</div>
						)
					}
				</div>

				<div className="tickets">
					{
						sortedTickets.map((item, i) => {
							if(this.state.transfers[item.stops]) {
								return <Flight key={i} tickets={item} currency={currency} />
							}

							return null;
						})
					}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Tickets />,
	document.getElementById('root')
);

registerServiceWorker();
