import ReactStars from "react-rating-stars-component";
import React, {Component} from "react";
import ReactApexChart from "react-apexcharts";
import {API, Movie} from "../constants";
import axios from "axios";


class MovieGraph extends Component {
    constructor(props) {
      super(props);

      this.state = {  

        movies_:[],
        moviePics:[],
        visited: [],
             
        // series from props
        // options from props
      };
    }

    componentDidMount() {
		let movie_map = [];
		axios
			.get(API)
			.then(response => {
				response.data.map(movie => {
					movie_map.push({
						"movie": movie,
						"rating": 0
					});
				});
				this.setState({
					movies_: movie_map,
                    //moviePics : movie_map.map(currentMovie => (currentMovie.movie.poster )).slice(0, 10),
				})
			})
			.catch(error => {
				console.log(error);
			});
		if (this.state.visited.length <= 5) {
			this.updateVisited();
    
		} 
	}

	updateVisited = () => {
		const randomCount = 5;
		let randomMovies = [];
		if (this.state.visited.length <= randomCount) {
			randomMovies = this.getRandomMovies(this.state.movies_, randomCount);
            
			this.setState({
				visited: randomMovies,
			});
            
		}
	}


	movieList() {
		return this.state.movies.map(currentmovie => {
			return (
				<Movie
					movie={currentmovie}
					// deleteMovie={this.deleteMovie}
					key={currentmovie._id}
				/>
			);
		});
	}

	onSubmit(e) {
		e.preventDefault();

		// const exercise = {
		//   username: this.state.username,
		//   description: this.state.description,
		//   duration: this.state.duration,
		//   date: this.state.date
		// };
		axios
			.get(API + this.state.mId)
			.then(response => {
				this.setState({movies: response.data});
			})
			.catch(error => {
				console.log(error);
			});
	}

	changeRating = (newRating, movieid) => {
		let movieLst = [...this.state.movies_];
		let vstdLst = [...this.state.visited];
		let ratedItm = movieLst.map(movieItm => (
			movieItm.movie._id === movieid ? {
				...movieItm, rating: newRating
			} : movieItm
		));
		let vstd = vstdLst.includes(movieid);
		if (!vstd) {
			vstdLst.push(movieid);
			this.setState({
				movies_: ratedItm,
				visited: vstdLst
			});
			this.props.handler();
		} else {
			this.setState({
				movies_: ratedItm
			})
		}
	}

	getRandomMovies = (allMovies, randomCount) => {
		const randomMovies = [];
		for (let i = 0; i < randomCount; i++) {
			const randIdx = Math.floor(Math.random() * allMovies.length);
			const randItm = allMovies.splice(randIdx, 1)[0];
			randomMovies.push(randItm);
		}
		return randomMovies;
	}

   



    

    render() {
 
        return (
            <div id="chart">
                <ReactApexChart options={this.props.options}  series={this.props.series} type="scatter" height={450} width={600}/>
               
            </div>
        );


    }
}

export default MovieGraph