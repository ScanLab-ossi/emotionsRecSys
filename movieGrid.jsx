import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import Carousel from 'react-grid-carousel'
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loader from '../loader';
import 'react-circular-progressbar/dist/styles.css';


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
			synopsisTimes: [],
			modalTimeStamp1: 0,
			modalTimeStamp2: 0,
			page: "Pref",
            user: "connected user",
			userRating: [],
			loaderActive: true,
			movies_: [],
			visited: [],
			curMovieTitle: "",
			curMovieSynopsis: "",
			curMoviePoster: "",
			curMovieId: "",
			showOverView: false,
			showModal: false,
			movies_r: [],
			currentPage: 1
		}
	}




	// save new rating to mongo db 
	changeRating = (newRating, movieid) => {
		//console.log(newRating);
		//console.log(movieid);
		let newData= {item_id: movieid, rating: newRating};
		this.setState({
			userRating: [...this.state.userRating, newData]
		});
	

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

	// data will be sent from here -> router -> server -> mongo db
    postToMongo(cpage,cuser,caction,cvalue) {

        const newAction = {
            page: cpage,
            user: cuser,
            action: caction,
            value: cvalue
        }
        axios.post('http://localhost:5000/create', newAction)
    }

	componentWillUnmount(){
		this.postToMongo(this.state.page,this.state.user,"rating",this.state.userRating);
		this.postToMongo(this.state.page,this.state.user,"synopsis",this.state.synopsisTimes);
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

	

	handeClick = (currentMovietitle, currentMovieSynopsis,currentMoviePoster, currentMovieId)=>{
		
		this.setState({
			modalTimeStamp1: Math.floor(Date.now() / 1000),
			showOverView: true,
			curMovieTitle: currentMovietitle,
			curMovieSynopsis: currentMovieSynopsis,
			curMovieId: currentMovieId,
			showModal: true,
		});
	}

	closeModal = ()=>{
		let userTime = {item_id: this.state.curMovieId, time: Math.floor(Date.now() / 1000)-this.state.modalTimeStamp1};

		this.setState({
			showModal: false,
			synopsisTimes: [...this.state.synopsisTimes, userTime]
		});
	}

	render() {	
	
		if (this.state.visited.length > 0) {
			if (this.state.loaderActive) return  <Loader />; // Conditional Rendering!
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
													name={currentMovie.movie.titleId}
													
													/>
											</div>
										</div>
									</div>
									<div className="text" style={{cursor: 'pointer'}}	
									onClick={() => this.handeClick(currentMovie.movie.name, currentMovie.movie.plot, currentMovie.movie.poster, currentMovie.movie.titleId)}
									>								
										{currentMovie.movie.name} (
										{currentMovie.movie.release_year} ) 
										
										
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