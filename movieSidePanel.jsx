
import React, {Component} from "react";


class MovieSidePanel extends Component {
	constructor(props) {
		super(props);
	
		this.state = {		 
		  selected: false,
		};
	}
	
	render() {

		return (
			
                    
			<div className="col-sm-4">
				
				<ul className="list-group">
					<form onSubmit={this.handleSubmit}>
						<li className="list-group-item list-group-item-dark d-flex justify-content-between
                                align-items-center">
							<strong>{this.props.panelTitle}</strong>
						</li>
						<ol className="list-group" >
							
							{this.props.movieList.map((movie) => (

								<li key={movie.titleId}  
									style={{cursor: 'pointer', background:this.state.liColor}}
									className="list-group-item d-flex justify-content-between align-items-center"
									onMouseOver={() => this.props.handler(true, movie)}
									onMouseLeave={() => this.props.handlerOut(false, movie)}	
								>						
									<b> {movie.name} </b>	
								</li>
							))}
						</ol>
					</form>
				</ul>
			</div>
		);
	}
}

export default MovieSidePanel

