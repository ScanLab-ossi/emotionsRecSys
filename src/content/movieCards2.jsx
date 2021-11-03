import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import {Link} from "react-router-dom";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-star-rating/dist/css/react-star-rating.min.css';
import ReactStars from "react-rating-stars-component";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import ProgressBarComponent from "./progressBarComponent";
import Loader from './loader';
import {API, Movie} from "./constants";
import MovieSidePanel from "./Preferences/movieSidePanel";
import MovieGraph from "./Preferences/movieGraph";
import 'react-circular-progressbar/dist/styles.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



class Moviecard2 extends Component {
    constructor(props) {
        super(props);
        this.onChangeMovieId = this.onChangeMovieId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleHover = this.handleHover.bind(this);

        this.state = {
            loaderActive: true,
            movies: [],
            mId: "",
            rate: '',
            isHovered: false,
            isActive: false,
            rate2: '',
            isShown: '',
            setIsShown: false,
            activeMovie: null,
            activeMovieName: null,
            optionsForGraph : {},
            seriesForGraph: [],
            currentX: 0,
            currentY: 0,
            graphVis: false,
            listVis: false,
            showModal: false,
            showOverView: true,
            curMovieSynopsis: ""
      
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
					});
                                    
				});

                // random visualization
                let rand = this.randomVisualization(); 
                if (rand==0){
                    this.setState({ graphVis: true});
                    console.log(this.state.graphVis);
                } else {
                    this.setState({ listVis: true})
                    console.log(this.state.listVis);
                }

                this.setState({
                    
                     loaderActive: false,// loader state: change to off
                     movies: response.data ,

                     seriesForGraph: [{name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(0, 1)),data: [[-7,-5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(1, 2)),data: [[5, 9],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(2, 3)),data: [[7, 5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(3, 4)),data: [[-4, -6],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(4, 5)),data: [[5, -5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(5, 6)),data: [[-7, 5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(6, 7)),data: [[4, 4],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(7, 8)),data: [[2, 6],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(8, 9)),data: [[1, 8],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.name)).slice(9, 10)),data: [[-8, 0],]}
                    ],
                    
                    optionsForGraph: {
                        chart: {

                          events: {
                              /*
                            markerClick: (event, chartContext, config)=> {
     
                            },*/

                            dataPointMouseEnter: (event, chartContext, config)=> {
                                event.path[0].style.cursor = "pointer";

                                let selectedMovieName = config.w.globals.seriesNames[config.seriesIndex] 
                                // set state "current movie name" by ^
                                this.setState({ activeMovieName: selectedMovieName});
                                console.log(this.state.activeMovieName);
                                // call function that returns movie by name
                                console.log(this.state.movies);
                                let thisMovie = this.state.movies.find(m => m.name === selectedMovieName );
                                // then call this.handlehover
                                this.handleHover(true,thisMovie);          
                            }                          
                          },

                         

                          height: 500,
                          type: 'scatter',
                          animations: {
                            enabled: true,
                          },
                          zoom: {
                            enabled: false,
                          },
                          toolbar: {
                            show: true
                          }
                        },
                        xaxis: {
                          tickAmount: 10,
                          min: -10,
                          max: 10,
                          labels:{
                              formatter: (v)=>{
                                  this.setState({ currentX: v});
                                  return v;
                              }
                          }
                        },
                        yaxis: {
                          tickAmount: 10,
                          min: -10,
                          max: 10,
                          labels:{
                            formatter: (v)=>{
                                this.setState({ currentY: v});
                                return v;
                            }
                        }
                        },
                        markers: {
                          size: 20,
                         
                          
                        },
                        fill: {
                          type: 'image',
                          opacity: 1,
                          image: {
                            src: [String(movie_map.map(currentMovie => (URL.createObjectURL(
                                new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(0, 1)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(1, 2)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(2, 3)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(3, 4)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(4, 5)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(5, 6)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(6, 7)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(7, 8)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(8, 9)),
                                  String(movie_map.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.movie.poster,"base64").buffer], { type: 'image/png' })))).slice(9, 10)) ],
                            width: 40,
                            height: 40
                          }
                        },
                        
                      }                 
                    });
                    
            })
            .catch(error => {
                console.log(error);
                
            });
    }

    handleHover(isShown, activeMovie){
        this.setState(prevState => ({
            setIsShown: isShown,
            activeMovie: activeMovie,
            isHovered: !prevState.isHovered
        }));
    };

    movieList() {
        return this.state.movies.map(currentmovie => {
            return (
                <Movie movie={currentmovie}
                    // deleteMovie={this.deleteMovie}
                    key={currentmovie._id}
                />
            );
        });
    }
  
    onChangeMovieId(e) {
        this.setState({
            mId: e.target.value
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
                this.setState({ movies: response.data });

            })
            .catch(error => {
                console.log(error);
            });
    }

    handleShow = ()=>{
        this.setState({
            isActive: true
        })
    };

    handleHide = () =>{
        this.setState({
            isActive: false
        })
    };

    handleHover(isShown, activeMovie){
        this.setState(prevState => ({
            setIsShown: isShown,
            activeMovie: activeMovie,
            isHovered: !prevState.isHovered
        }));
    };
    
    handleRateChange = evt => {
        this.setState({ rate: evt.target.value });
    };

    handleRateChange1 = evt => {
        this.setState({ rate2: evt.target.value });
    };

    handleSubmit = evt => {
        const { rate } = this.state;
        const { rate2 } = this.state;
        alert(`Signed up with rate: ${rate}`);
    };

    canBeSubmitted() {
        const {rate} = this.state;
        const {rate2} = this.state;
        return rate.length, rate2.length;
    }

    randomVisualization(){
        let rand = Math.floor(Math.random()*2);
        console.log(rand);
        return rand;
    }

    handeClick = (currentMovieSynopsis)=>{
		
		this.setState({
			showModal: true,
            showOverView: true,
            curMovieSynopsis: currentMovieSynopsis
		});
	}

    closeModal = ()=>{
		this.setState({
			showModal: false
		});
	}


    render() {    
        const active = this.state.isActive ? "pulse animated" : "";
        const isEnabled = this.canBeSubmitted();
        const {rate} = this.state;
        const {rate2} = this.state;

        const ratingChanged = (newRating) => {
            console.log(newRating);
        };

        if (this.state.loaderActive) return  <Loader />; // Conditional Rendering!

        return (
            <div>
                 {/* Progress bar component */ }
                <ProgressBarComponent percentComplete={75} />
                <br/>


                {/* Title of the page */ }
                <div> 
                <h2  style={{textAlign: 'center'}}> Recommendations </h2>
                <p  style={{textAlign: 'center'}}><b>
                    The system recommends the following movies based on your preferences. 
                    Please click on each movie, read the info, and perform the actions below
                    </b>
                </p>
                </div>

                <div className="row padding">

                     {/* Final recommendation - instructions */ }
                     <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#8fd6f2', borderColor: '#333', maxWidth: '150',
                                height:550}}>                  
                                <CardBody style={{maxHeight: '300px' ,maxWidth: '150'}}>
                                    <h3 style={{color: 'black'}}>Final Recommendation</h3>
                                    &nbsp;&nbsp;&nbsp;
                                    <p style={{color: 'black'}}>1. Hover over a movie to read more information about it.</p>
                                    <p style={{color: 'black'}}>2. <b>Rate</b> all the ten movies. If you haven't seen the movie please rate based on the information given.</p>
                                    <p style={{color: 'black'}}>3. Among the ten presented movies, choosethe movie which you <b>like the best </b> by clicking on the 'like best' button.</p>
                                    <p style={{color: 'black'}}>4. Click on the 'Next' button to go to the next step. This button won't be activated till you <b>complete steps 2-3</b>.</p>
                                </CardBody>
                            </Card>
                        </div>


                       {/* Recommended movies - Randomely graph or list */ }
                    {this.state.listVis ? 
                         <div  >   
                     <MovieGraph options = {this.state.optionsForGraph} series={this.state.seriesForGraph} handler={this.handleHover}/>
                       </div>
                        : (  <MovieSidePanel panelTitle="Recommened movies for you" movieList={this.state.movies.slice(0, 10)} handler={this.handleHover  }/> )}
                    

                    {/* Movie details - shown when mouse hover on a */ }
                    {this.state.setIsShown && (this.state.activeMovie!= null) ? (
                        <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#8fd6f2', borderColor: '#333', width:'100%',
                                height:550}}>
                                    
                                    <CardTitle style={{fontWeight: 'bold', fontSize: '1.2em', color: 'black'}}>
                                        {this.state.activeMovie.name} ( {this.state.activeMovie.release_year} )
                                    </CardTitle>
                                    
                                    <CardImg top src={URL.createObjectURL(
											new Blob([Buffer.from(this.state.activeMovie.poster,"base64").buffer], { type: 'image/png' }))} alt="Card image cap"
                                            style={{ maxHeight: '150px', width:'150px', height:'auto'}} /> 
                                     
                                    

                                    <CardBody style={{maxHeight: '300px'}}>
                                    <CardText style={{color: 'black'}}>
                                        <b>Coordinates: ({this.state.currentX},{this.state.currentY})</b>
                                    </CardText> 
                                    <CardText style={{color: 'black' ,cursor: 'pointer'}}  onClick={() => this.handeClick(this.state.activeMovie.plot)}>
                                        <b>Overview:</b> {this.state.activeMovie.plot.slice(0,100)} <p>... (click to see more)</p>
                                    </CardText>

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
                            
                                    <CardText style={{color: 'black'}}>
                                        <b>Director:</b> {this.state.activeMovie.movie_directors.slice(0, 40)} 
                                    </CardText>
                                    <CardText style={{color: 'black'}}>
                                        <b> Writers:</b> {this.state.activeMovie.movie_writers.slice(0, 40)}
                                    </CardText>
                                    <CardText style={{color: 'black'}}>
                                        <b>Stars: </b> {this.state.activeMovie.movie_stars.slice(0, 40)}
                                    </CardText>
                                   

                                    {/*stars*/}
                                    <div className="rating" >
										<ReactStars
											count={5}
											onChange={ratingChanged}
											size={24}
											activeColor="#ffd700"
                                            />

									</div>

                                    &nbsp;&nbsp;&nbsp;
                                       
                                        <button>Like Best</button>
                                        

                                </CardBody>
                            </Card>
                        </div>
                    ) : (<div className="col-sm-4" />)
                    }
                    
                </div>

                {/* "next" button  */ }  
                <div align="right" className="padding">
                    <Link to="/surveyNew">
                        <button id="register" type="button" className="btn btn-sm btn-primary"
                                >Next
                        </button>
                    </Link>                    
                </div>

                
             
               
            </div>
        );
    }
}

export default Moviecard2;