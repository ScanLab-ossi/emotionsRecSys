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
        };
        this.handleHover = this.handleHover.bind(this);
    }
  
    componentDidMount() {
        axios
            .get(API)
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

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
                <ProgressBarComponent percentComplete={75} />
                <br/>
                <div> 
                <h3> Recommendations </h3>
                <p>
                    The system recommends the following movies based on your preferences. 
                    Please click on each movie, read the info, and perform the actions at
                    the bottom of the info page.
              </p>
                </div>

                <div className="row padding">
                
                    <MovieSidePanel movieList={this.state.movies.slice(0, 10)} handler={this.handleHover  }/>
                    <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#8fd6f2', borderColor: '#333', width:"100%",
                                height:"100%"}}>                  
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



                    {this.state.setIsShown && (this.state.activeMovie!= null) ? (
                        <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#8fd6f2', borderColor: '#333', width:"100%",
                                height:"100%"}}>
                                    <CardTitle style={{fontWeight: 'bold', fontSize: '1.2em', color: 'black'}}>
                                        {this.state.activeMovie.title} ( {this.state.activeMovie.year} )
                                    </CardTitle>
                                    <CardImg top src={this.state.activeMovie.poster} alt="Card image cap"
                                            style={{ maxHeight: '200px', width:'200px', height:'auto'}} />
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