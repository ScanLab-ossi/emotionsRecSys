import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import Carousel from 'react-grid-carousel'
import axios from "axios";
import {API, Movie} from "../constants";
import Modal from 'react-bootstrap/Modal';
import { Link }  from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

const carouselArrowRight = ({ isActive }) => (
	<span className={"carouselArrowRight"} />
);

const carouselArrayLeft = ({ isActive }) => (
	<span className={"carouselArrowLeft"} />
);

const responsive = [
	{ breakpoint: 4000, cols: 12, rows: 5, gap: 9, loop: true },
	{ breakpoint: 3000, cols: 8, rows: 3, gap: 9, loop: true },
	{ breakpoint: 1200, cols: 7, rows: 3, gap: 9, loop: true },
	{ breakpoint: 1000, cols: 6, rows: 3, gap: 3, loop: true },
	{ breakpoint: 800, cols: 5, rows: 3, gap: 3, loop: true },
	{ breakpoint: 600, cols: 3, rows: 3, gap: 3, loop: true },
	{ breakpoint: 464, cols: 2, rows: 3, gap: 3, loop: true }
];

class MovieGrid extends Component {

	constructor(props) {
		super(props)
		this.state = {
			movies_: [],
			visited: [],
			curMovieTitle: "",
			curMovieSynopsis: "",
			curMoviePoster: "",
			showOverView: false,
			showModal: false
		}
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
					movies_: movie_map
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
				visited: randomMovies
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

	

	handeClick = (currentMovietitle, currentMovieSynopsis,currentMoviePoster)=>{
		
		this.setState({
			showOverView: true,
			curMovieTitle: currentMovietitle,
			curMovieSynopsis: currentMovieSynopsis,
			showModal: true,
		});
	}

	closeModal = ()=>{
		this.setState({
			showModal: false
		});
	}

	render() {		
		if (this.state.visited.length > 0) {
			return (
				<div>
					<h3  style={{textAlign: 'center'}}> Please click on a movie title to view movie overview </h3>
					<h3 style={{textAlign: 'center'}}> Click on the arrows to view more movies </h3> 
					&nbsp;&nbsp;&nbsp;
					
					<div>
					{this.state.showOverView ? (
						  <div >
								<Modal show={this.state.showModal} dialogClassName="modal-70w" >
								<Modal.Header>
									<Modal.Title>{this.state.curMovieTitle}</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<strong>OverView:</strong>
									<p>
									{this.state.curMovieSynopsis}
									</p>
								</Modal.Body>
								<Modal.Footer>  
							
								<Button variant="secondary" onClick={this.closeModal}>
									OK
								</Button>
							
								</Modal.Footer>
								</Modal>
					</div>):(<div></div>)}
					</div>
					
					
					<Carousel
						responsiveLayout={responsive}
						// arrowRight={customArrowRight}
						cols={5} rows={3} gap={3}>
						{this.state.movies_.map(currentMovie => (
							<Carousel.Item>
								<div id={"TN_" + currentMovie.movie._id}
									 key={currentMovie.movie._id} className="movieCardContainer">
									<div  className="container"
										 style={{backgroundImage: "url(" + URL.createObjectURL(
											new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })) + ")"}}
																			 
										 >
											
										

		
										<div className={"overlay"}>
											<div className="star-div">
												<StarRatings
													rating={currentMovie.rating}
													starRatedColor="rgb(252,229,65)"
													starHoverColor="rgb(252,229,65)"
													starDimension="18px"
													starSpacing="1px"
													changeRating={this.changeRating}
													numberOfStars={5}
													name={currentMovie.movie._id}
													
													/>
											</div>
										</div>
									</div>
									<div className="text" style={{cursor: 'pointer'}}	
									onClick={() => this.handeClick(currentMovie.movie.name, currentMovie.movie.plot, currentMovie.movie.poster)}
									>								
										{currentMovie.movie.name}
										
										
									</div>
								</div>
							</Carousel.Item>
						))}
					</Carousel>
				</div>
			);
		} else {
			return (<div/>);
		}
	}
}

export default MovieGrid;