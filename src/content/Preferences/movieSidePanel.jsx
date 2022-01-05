
import React, {Component} from "react";
import 'react-star-rating/dist/css/react-star-rating.min.css';
import ReactStars from "react-rating-stars-component";


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
					<form >
						<ol className="list-group" >							
							{this.props.movieList.map((movie) => (
								<li key={movie.titleId}  
									style={{cursor: 'pointer',border: '2px solid black', borderRadius:'5px', margin: '1.5px'}}
									className="list-group-item d-flex justify-content-between align-items-center"
									onMouseOver={() => this.props.handler(true, movie)}
									onMouseLeave={() => this.props.handlerOut(false, movie)}	
								>						
									<b> {movie.name} ({movie.release_year}) </b>	
									
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

