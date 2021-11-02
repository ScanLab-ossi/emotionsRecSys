import React, {Component, useState} from 'react';
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
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class Moviecard extends Component {
    constructor(props) {
        super(props);
        this.onChangeMovieId = this.onChangeMovieId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.randomVisualization = this.randomVisualization.bind(this);

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
        
          
      
        };
      
    }
  
    componentDidMount() {
        
        let movie_map = [];
        
        axios
            .get(API)
            .then(response => {
                console.log(response);
                console.log(response.data);
                response.data.map(movie => {
					movie_map.push({
						"movie": movie,
					});      
				});

                // random visualization
                let rand = this.randomVisualization(); 
                if (rand===0){
                    this.setState({ graphVis: true});
                } else {
                    this.setState({ listVis: true})
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
                              // TODO: get jpgs from mongo db
                            src: ["https://www.google.com/search?q=image&sxsrf=AOaemvKXDKjxHnhhjctC_rXroPCu3IE9gw:1635153587031&tbm=isch&source=iu&ictx=1&fir=gxFxsvFBmxeZ9M%252C0JWe7yDOKrVFAM%252C_%253Bz0mJyrKr-5YOvM%252C4O2GvGuD-Cf09M%252C_%253B2DNOEjVi-CBaYM%252CAOz9-XMe1ixZJM%252C_%253BL8xfQakH9a8tJM%252Cy1IIQDpM5HgcJM%252C_%253BEuU2RdlOYrueVM%252CUaCduni02qpvBM%252C_%253BHXLlNEpHoJATkM%252CwJy6d5uce-qbnM%252C_%253Bz4_uU0QB2pe-SM%252C7SySw5zvOgPYAM%252C_%253ByocyzzP8XUOX9M%252CtwE4vJIAwbfdCM%252C_%253BPPawKcBaPexwaM%252CNp-san7h_78aqM%252C_%253BgOUAFhrbQ2nYQM%252COXvyXJop1qSGqM%252C_%253B449X1Cy510tOqM%252C5QlcHYOkDlg16M%252C_%253BMOAYgJU89sFKnM%252CygIoihldBPn-LM%252C_&vet=1&usg=AI4_-kQF2m2XkB3kXTH1fsaI1kvavZ4u3A&sa=X&ved=2ahUKEwiuz9TlneXzAhVQ_7sIHfnfDaMQ9QF6BAgOEAE#imgrc=z0mJyrKr-5YOvM",
                                  
                                  "https://www.google.com/search?q=image&sxsrf=AOaemvKXDKjxHnhhjctC_rXroPCu3IE9gw:1635153587031&tbm=isch&source=iu&ictx=1&fir=gxFxsvFBmxeZ9M%252C0JWe7yDOKrVFAM%252C_%253Bz0mJyrKr-5YOvM%252C4O2GvGuD-Cf09M%252C_%253B2DNOEjVi-CBaYM%252CAOz9-XMe1ixZJM%252C_%253BL8xfQakH9a8tJM%252Cy1IIQDpM5HgcJM%252C_%253BEuU2RdlOYrueVM%252CUaCduni02qpvBM%252C_%253BHXLlNEpHoJATkM%252CwJy6d5uce-qbnM%252C_%253Bz4_uU0QB2pe-SM%252C7SySw5zvOgPYAM%252C_%253ByocyzzP8XUOX9M%252CtwE4vJIAwbfdCM%252C_%253BPPawKcBaPexwaM%252CNp-san7h_78aqM%252C_%253BgOUAFhrbQ2nYQM%252COXvyXJop1qSGqM%252C_%253B449X1Cy510tOqM%252C5QlcHYOkDlg16M%252C_%253BMOAYgJU89sFKnM%252CygIoihldBPn-LM%252C_&vet=1&usg=AI4_-kQF2m2XkB3kXTH1fsaI1kvavZ4u3A&sa=X&ved=2ahUKEwiuz9TlneXzAhVQ_7sIHfnfDaMQ9QF6BAgOEAE#imgrc=z0mJyrKr-5YOvM"],
                                 // String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(2, 3)),
                                  //String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(3, 4)),
                                  //String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(4, 5)),
                                 // String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(5, 6)),
                                 // String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(6, 7)),
                                //  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(7, 8)),
                                //  String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(8, 9)),
                                // String(movie_map.map(currentMovie => (currentMovie.movie.poster)).slice(9, 10)) ],
                            width: 40,
                            height: 40
                          }
                        },
                        
                      }                 
                    },()=>console.log(this.state) // set state callback function
                    );
            })
            .catch(error => {
                console.log(error);
                console.log("MovieCards.jsx - component did mount error!")
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
        return rand;
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

                <div>
                    
                </div>


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
                                    <p style={{color: 'black'}}>2. Click on the check or cross icon for each movie to indicate if you <b>know</b> or <b>don't know</b> the movie.</p>
                                    <p style={{color: 'black'}}>3. Click on the 'Next' button to go to the next step. This button won't be activated till you <b>complete step 2</b>.</p>
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
                                    <CardText style={{color: 'blue'}}>
                                        <b>tt (IMDB ID): </b> {this.state.activeMovie.titleId}
                                    </CardText>
                                    <CardText style={{color: 'blue'}}>
                                        <b>signature: </b> {String(this.state.activeMovie.signature)}
                                    </CardText>
                                    <CardTitle style={{fontWeight: 'bold', fontSize: '1.2em', color: 'black'}}>
                                        {this.state.activeMovie.name} ( {this.state.activeMovie.release_year} )
                                    </CardTitle>
                                    {/* TODO: get jpg from mongo db
                                    <CardImg top src={this.state.activeMovie.poster} alt="Card image cap"
                                            style={{ maxHeight: '150px', width:'150px', height:'auto'}} /> */}
                                     
                                    

                                    <CardBody style={{maxHeight: '300px'}}>
                                    <CardText style={{color: 'black'}}>
                                        <b>Coordinates: ({this.state.currentX},{this.state.currentY})</b>
                                    </CardText> 
                                    <CardText style={{color: 'black'}}>
                                        <b>Overview:</b> {this.state.activeMovie.plot}
                                    </CardText>
                            
                                    <CardText style={{color: 'black'}}>
                                        <b>Director:</b> {this.state.activeMovie.movie_directors} <b> Writers:</b> {this.state.activeMovie.movie_writers}
                                    </CardText>
                                    <CardText style={{color: 'black'}}>
                                        <b>Stars: </b> {this.state.activeMovie.movie_stars.slice(0, 50)}
                                    </CardText>
                                    
                                        
                                        <button ><img src="check.png" width="12px" height="12px"></img></button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button><img src="cross .png" width="12px" height="12px"></img></button>

                                </CardBody>
                            </Card>
                        </div>
                    ) : (<div className="col-sm-4" />)
                    }
                    
                </div>

                {/* "next" button  */ }  
                <div align="right" className="padding">
                    <Link to="/movies2">
                        <button id="register" type="button" className="btn btn-sm btn-primary"
                                >Next
                        </button>
                    </Link>                    
                </div>

                
             
               
            </div>
        );
    }
}

export default Moviecard;