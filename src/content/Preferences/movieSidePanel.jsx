import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";

class MovieSidePanel extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		 
		  selected: false
		};
	  }
	


	

	render() {
		const ratingChanged = (newRating) => {
			console.log(newRating);
		};
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

								<li key={movie.movie_id } 
									style={{cursor: 'pointer'}}
									className="list-group-item d-flex justify-content-between align-items-center"
									onClick={() => this.props.handler(true, movie)}
									onMouseLeave={() => this.props.handler(false, movie)}	
									
																	
								>
						
									<b> {movie.title} </b>
																
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

