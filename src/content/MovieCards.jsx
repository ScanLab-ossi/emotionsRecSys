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
import {API, Movie} from "./constants";
import MovieSidePanel from "./Preferences/movieSidePanel";
import MovieGraph from "./Preferences/movieGraph";


class Moviecard extends Component {
    constructor(props) {
        super(props);
        this.onChangeMovieId = this.onChangeMovieId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
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
            seriesForGraph: []
      
        };
        this.handleHover = this.handleHover.bind(this);
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
                this.setState({
                     movies: response.data ,

                     seriesForGraph: [{name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(0, 1)),data: [[-7,-5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(1, 2)),data: [[5, 9],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(2, 3)),data: [[7, 5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(3, 4)),data: [[-4, -6],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(4, 5)),data: [[5, -5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(5, 6)),data: [[-7, 5],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(6, 7)),data: [[4, 4],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(7, 8)),data: [[2, 6],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(8, 9)),data: [[1, 8],]},
                     {name: String(movie_map.map(currentMovie => (currentMovie.movie.title)).slice(9, 10)),data: [[-8, 0],]}
                    ],
                    
                    optionsForGraph: {
                        chart: {

                          events: {
                            markerClick: (event, chartContext, config)=> {
                                
                                let selectedMovieName = config.w.globals.seriesNames[config.seriesIndex] 
                                // set state "current movie name" by ^
                                this.setState({ activeMovieName: selectedMovieName});
                                console.log(this.state.activeMovieName);
                                // call function that returns movie by name
                                console.log(this.state.movies);
                                let thisMovie = this.state.movies.find(m => m.title === selectedMovieName );
                                // then call this.handlehover
                                this.handleHover(true,thisMovie);
                                
                            },
                            dataPointMouseEnter: function(event, chartContext, config) {
                                event.path[0].style.cursor = "pointer";
                                
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
                          max: 10
                        },
                        yaxis: {
                          tickAmount: 10,
                          min: -10,
                          max: 10
                        },
                        markers: {
                          size: 20,
                         
                          
                        },
                        fill: {
                          type: 'image',
                          opacity: 1,
                          image: {
                            src: [String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(0, 1)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(1, 2)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(2, 3)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(3, 4)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(4, 5)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(5, 6)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(6, 7)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(7, 8)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(8, 9)),
                                  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(9, 10)) ],
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

    render() {
        const active = this.state.isActive ? "pulse animated" : "";
        const isEnabled = this.canBeSubmitted();
        const {rate} = this.state;
        const {rate2} = this.state;

        const ratingChanged = (newRating) => {
            console.log(newRating);
        };

        return (
            <div>
                 {/* Progress bar component */ }
                <ProgressBarComponent percentComplete={75} />
                <br/>

                {/* Title of the page */ }
                <div> 
                <h3> Recommendations </h3>
                <p>
                    The system recommends the following movies based on your preferences. 
                    Please click on each movie, read the info, and perform the actions at
                    the bottom of the info page.
                </p>
                </div>
                

                <div className="row padding">

                     {/* Recommended moview - List 
                    <MovieSidePanel panelTitle="Recommened movies for you" movieList={this.state.movies.slice(0, 10)} handler={this.handleHover  }/>
                   */ }
                    {/* Recommended moview - Graph    */ }              
                    <MovieGraph options = {this.state.optionsForGraph} series={this.state.seriesForGraph} handler={this.handleHover}/>

                    

                    {/* Final recommendation - instructions */ }
                    <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#8fd6f2', borderColor: '#333', width:'100%',
                                height:500}}>                  
                                <CardBody style={{maxHeight: '300px' }}>
                                    <h3 style={{color: 'black'}}>Final Recommendation</h3>
                                    <p style={{color: 'black'}}>1. Click on the Tab to read more information about the movie.</p>
                                    <p style={{color: 'black'}}>2. Click on the check or cross icon for each movie to indicate if you <b>know</b> or <b>don't know</b> the movie.</p>
                                    <p style={{color: 'black'}}>3. Among the ten presented movies, choosethe movie which you <b>like the best </b> by clicking on the 'like best' button.</p>
                                    <p style={{color: 'black'}}>4. <b>Rate</b> all the ten movies. If you haven't seen the movie please rate based on the information given.</p>
                                    <p style={{color: 'black'}}>5. Click on the 'Next' button to go to the next step. This button won't be activated till you <b>complete steps 2-4</b>.</p>
                                </CardBody>
                            </Card>
                        </div>


                    {/* Movie details - shown when mouse hover on a */ }
                    {this.state.setIsShown && (this.state.activeMovie!= null) ? (
                        <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#8fd6f2', borderColor: '#333', width:400,
                                height:500}}>
                                    <CardTitle style={{fontWeight: 'bold', fontSize: '1.2em', color: 'black'}}>
                                        {this.state.activeMovie.title} ( {this.state.activeMovie.year} )
                                    </CardTitle>
                                    <CardImg top src={this.state.activeMovie.poster} alt="Card image cap"
                                            style={{ maxHeight: '150px', width:'150px', height:'auto'}} />
                                    <CardBody style={{maxHeight: '300px'}}>
                                    <CardText style={{color: 'black'}}>
                                        <b>Overview</b>
                                    </CardText>
                                    <CardText style={{color: 'black'}}>
                                         {this.state.activeMovie.description} (description-check why doesn't work)
                                    </CardText>
                                    <CardText style={{color: 'black'}}>
                                        <b>Director:</b> {this.state.activeMovie.director} <b> Writers:</b> {this.state.activeMovie.writer}
                                    </CardText>
                                    <CardText style={{color: 'black'}}>
                                        <b>Stars: </b> {this.state.activeMovie.cast.slice(0, 50)}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    ) : (<div className="col-sm-4" />)
                    }
                    
                </div>

                {/* "next" button  */ }  
                <div align="right" className="padding">
                    <Link to="/survey">
                        <button id="register" type="button" className="btn btn-sm btn-primary"
                                onClick="window.location.href='/'">Next
                        </button>
                    </Link>                    
                </div>

                
             
               
            </div>
        );
    }
}

export default Moviecard;