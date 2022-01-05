import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import Carousel from 'react-grid-carousel'
import axios from "axios";
import {API, Movie} from "../constants";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Loader from '../loader';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBarComponent from "../progressBarComponent";
import {Link} from "react-router-dom";


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
			experiment: {},
			allMovies: [],
			presentation: 0,
			top2000: [],
			top3000: [],
			timestamp: 0,
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
			currentPage: 1,
			count: 0
		}
	}
	componentDidMount() {
		if (window.innerWidth < 700) {
			alert('Please increase window size for proper visualization!');
		}

		let movie_map = [];
		axios
			.get(API)
			.then(response => {
				response.data.map(movie => {
					movie_map.push({
						"movie": movie,
						"id": movie.titleId,
						"originalRating": movie.movie_rating,
						"rating": 0
					});
				});
				this.setState({
					allMovies: movie_map, // all movies from mongo db
					movies_: movie_map.slice(0,50), // 50 random movies
					loaderActive: false
					// user: user id 
				})
			})
			.catch(error => {
				console.log(error);
			});
		
		if (this.state.visited.length <= 5) {
			this.updateVisited();
					
		}
		
	}

	handler(){
        let currentCount = this.state.count;
        currentCount += 1;
        this.setState({
            count: currentCount
        });
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

	// save new rating
	changeRating = (newRating, movieid) => {

		let newData= {item_id: movieid, rating: newRating, presentation: this.state.presentation};

		// this data will be passed as props to next component Movies1
		this.setState({
			userRating: [...this.state.userRating, newData],
			experiment: this.randomExperiment()
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
			this.handler();
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
		// time in page     
		let value = Math.floor(Date.now() / 1000)-this.state.timestamp; // total time in page (in seconds)
		this.postToMongo(this.state.page,this.state.user,"time",value); // post to mongo time in page
		this.postToMongo(this.state.page,this.state.user,"rating",this.state.userRating); // post to mongo user ranking + presentation type
		this.postToMongo(this.state.page,this.state.user,"synopsis",this.state.synopsisTimes); // post to mongo user synopsos times
		this.postToMongo(this.state.page,this.state.user,"exp",this.state.experiment); // post to mongo user experiment
		this.postToMongo(this.state.page,this.state.user,"recommendations",this.state.recommendationAndXY); // post to mongo user recommendations
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

	// shuffle array
	shuffle(array) {
		let currentIndex = array.length,  randomIndex;
	  
		// While there remain elements to shuffle...
		while (currentIndex != 0) {
	  
		  // Pick a remaining element...
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex--;
	  
		  // And swap it with the current element.
		  [array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}  
		return array;
	  }



	// change presentation to top 2000
	randomFromTop2000(){
		// sort movies_ by original rating
		let sort = this.state.allMovies;
		sort.sort((a, b) => parseFloat(b.originalRating) - parseFloat(a.originalRating));
		// top2000cut = 2000 highest rating from movies_
		let cut = sort.slice(0, 2000);
		// check that these movies where not rendered to user yet
		let notRendered = []
		for (let i = 0; i < cut.length; i++) {
			if (!this.state.movies_.some(e=>e.id=== cut[i].id)){
				notRendered.push(cut[i]);
			}
		}
		// get 50 random movies from top 2000 (new, that have not been rendered to user yet)
		let newRender = this.shuffle(notRendered).slice(0,50);
		// render to user
		return newRender;
	}

	// change presentation to top 3000
	randomFromTop3000(){
		// sort movies_ by original rating
		let sort = this.state.allMovies;
		sort.sort((a, b) => parseFloat(b.originalRating) - parseFloat(a.originalRating));
		// top2000cut = 2000 highest rating from movies_
		let cut = sort.slice(0, 3000);
		// check that these movies where not rendered to user yet
		let notRendered = []
		for (let i = 0; i < cut.length; i++) {
			if (!this.state.movies_.some(e=>e.id=== cut[i].id)){
				notRendered.push(cut[i]);
			}
		}
		// get 50 random movies from top 2000 (new, that have not been rendered to user yet)
		let newRender = this.shuffle(notRendered).slice(0,50);
		// render to user
		return newRender;
	}

	// change presentation 
	changePresentation(){
		console.log("Changing presentation...");
		this.setState(prevState => {
			let newPre = 0;		

			if(prevState.presentation < 2){
				newPre = prevState.presentation+1;				
			}			
			if (newPre === 0){
				// set state movies_ to random
				this.setState({
					movies_: this.state.allMovies.slice(0,50)
				})
				console.log("Presentation: random");
			}
			if (newPre === 1){
				// set state movies_ to top 2000
				let top2000 = this.randomFromTop2000();
				this.setState({
					movies_: top2000
				})				
				console.log("Presentation: top 2000");
			}
			if (newPre === 2){
				// set state movies_ to top 3000
				let top3000 = this.randomFromTop3000();
				this.setState({
					movies_: top3000
				})	
				console.log("Presentation: top 3000");
			}
			return {presentation: newPre};
		})
	}

	
	
    // random experiment (1-11) used in componentDidMount()
    randomExperiment(){
        let exp1 = {vis: "list", div: "latent"};
        let exp2 = {vis: "list", div: "latent+dev"};
        let exp3 = {vis: "list", div: "emotions"};
        let exp4 = {vis: "list", div: "emotions+dev"};
        let exp5 = {vis: "list", div: "vanilla"};
        let exp6 = {vis: "graph latent", div: "latent"};
        let exp7 = {vis: "graph latent", div: "latent+dev"};
        let exp8 = {vis: "graph latent", div: "vanilla"};
        let exp9 = {vis: "graph emotions", div: "emotions"};
        let exp10 = {vis:  "graph emotions", div: "emotions+dev"}
        let exp11 = {vis:  "graph emotions", div: "vanilla"};
        let experiments = [exp1,exp2,exp3,exp4,exp5,exp6,exp7,exp8,exp9,exp10,exp11];
        return experiments[Math.floor(Math.random() * experiments.length)];
    }

	render() {	
		let disabled = true;
        if (this.state.count >= 20){
            disabled = false;
		}
		if (this.state.visited.length > 0) {
			if (this.state.loaderActive) return  <Loader />; // Conditional Rendering!
			return (
				
				<div>
					<ProgressBarComponent percentComplete={50} />
					<br/>

					<h3 style={{textAlign: 'center'}}>Select a movie that you are familiar with and provide a rating. </h3>					
					<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
						<b >Rate a total of 20 movies to proceed to the next stage.</b>
					</div>
					<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
						<b > Please click on a movie title to view movie overview. </b>
					</div>
					<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
						<b > Click to view more movies. </b>
					</div>
					<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
						{/* new arrow button (to change presentation) */}
						<Button variant="secondary" onClick={() => this.changePresentation()}>view more</Button>
					</div>
					
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
						containerStyle={{borderRadius: '10px'}}
						hideArrow={true}						
						responsiveLayout={responsive}						
						cols={5} rows={3} gap={3}>
						{this.state.movies_.map(currentMovie => (
							<Carousel.Item containerStyle={{borderRadius: '10px'}}>
								<div id={"TN_" + currentMovie.movie._id} 
									 key={currentMovie.movie._id} className="movieCardContainer">
									<div  className="container"
										 style={{height: '70%', backgroundImage: "url(" + URL.createObjectURL(
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
									<div className="text" style={{cursor: 'pointer', height: '30%', backgroundColor:'grey'}}	
									onClick={() => this.handeClick(currentMovie.movie.name, currentMovie.movie.plot, currentMovie.movie.poster, currentMovie.movie.titleId)}
									>	
										<div>{currentMovie.movie.name}</div>							
										&nbsp;&nbsp;&nbsp;
										<div>({currentMovie.movie.release_year}) </div>
										
									</div>
								</div>
							</Carousel.Item>
						))}
					</Carousel>

					<div className="rankHolder">
                    <span> Ranked Movies: </span>
                    <span id="NumberOfRankedMovies"><i>{this.state.count}</i></span>
                    <span><i>of 20</i></span>
                    <span> </span>
					</div>
					<Link to={{ pathname: "/movies", state: {rankedMovies: this.state.userRating, experiment: this.state.experiment}}}>
						<Button  disabled={disabled} variant="primary" style={{float:'right', marginRight: 90}}>Next</Button>
					</Link>
				</div>
			);
		} else {
			return (<div/>);
		}
	}
}

export default MovieGrid;