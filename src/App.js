import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
// import uuid from 'uuid';

class App extends Component {
	state = {
		value: '',
		results: [],
		error: false
	};

	handleFetch = e => {
		e.preventDefault();
		let search = this.state.value.toLowerCase();

		if (search === '') {
			this.setState(prevState => ({
				error: !prevState.error
			}));
		} else {
			axios
				.get(
					`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
				)
				.then(response => {
					const { search: results } = response.data.query;
					// console.log(results);
					this.setState(prevState => ({
						value: '',
						results: prevState.results.concat(results),
						error: false
					}));
				})
				.catch(e => {
					console.log(e);
					this.setState(prevState => ({
						error: !prevState.error
					}));
				});
		}
	};

	handleChange = e => {
		let search = e.target.value;
		this.setState({
			value: search
		});
	};
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col">
							<img
								src="https://raw.githubusercontent.com/john-smilga/js-wikiAPI-setup/master/img/wiki.png"
								className="img-fluid d-block mx-auto my-4"
								width="200"
								alt="img"
							/>

							{this.state.error && (
								<div className=" alert alert-danger text-capitalize text-center">
									Please enter a valid value
								</div>
							)}
							<form className="my-3">
								<div className="input-group">
									<input
										type="text"
										value={this.state.value}
										onChange={this.handleChange}
										className="form-control "
										placeholder="search wikipedia..."
										aria-label=""
										aria-describedby="basic-addon1"
									/>
									<div className="input-group-append">
										<button
											className="btn btn-info"
											type="submit"
											onClick={this.handleFetch}
										>
											Search
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						{this.state.results.map(result => {
							return (
								<div
									className="col-10 mx-auto col-md-6 col-lg-4 my-3 "
									key={result.pageid}
								>
									<div className="card">
										<div className="card-body">
											<h4 className="card-title">{result.title}</h4>
											<p
												className="card-text"
												dangerouslySetInnerHTML={{
													__html: `${result.snippet}`
												}}
											/>
											<a
												href={`http://en.wikipedia.org/?curid=${result.pageid}`}
												target="_blank"
												className="text-primary my-2 text-capitalize"
												rel="noopener noreferrer"
											>
												Read More...
											</a>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
