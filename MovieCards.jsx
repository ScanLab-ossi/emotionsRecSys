import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import {Link} from "react-router-dom";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-star-rating/dist/css/react-star-rating.min.css';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import ProgressBarComponent from "./progressBarComponent";
import Loader from './loader';
import {API} from "./constants";
import MovieSidePanel from "./Preferences/movieSidePanel";
import MovieGraph from "./Preferences/movieGraph";
import 'react-circular-progressbar/dist/styles.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Moviecard extends Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleHoverStop = this.handleHoverStop.bind(this);
        this.randomExperiment = this.randomExperiment.bind(this);
        this.recommendationsDetailsFromMongo = this.recommendationsDetailsFromMongo.bind(this);

        this.state = {
            recommendations: [],
            userExp: {},
            likeBest: "",
            synopsisTimes: [],
			modalTimeStamp1: 0,
			modalTimeStamp2: 0,
            currentTitleId: "",
            hoverTimes: [],
            hoverTime: 0,
            user: "connected user",
            page: "Movies1",
            timestamp: 0,
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

                // random visualization (ADD this.props.location.state.exp.DIV WHEN CONNECTED TO LIJJIE)
                let exp = this.randomExperiment();
                if (exp.vis === "graph latent"){                 
                    this.setState({ graphVis: true});
                    // add diversification
                } 
                if (exp.vis === "graph emotions"){
                    this.setState({ graphVis: true});
                    // add diversification
                }
                if (exp.vis === "list"){
                    this.setState({ listVis: true})
                    // add diversification
                }

                // get movies + x,y axis
                let recommendations = this.recommendationsDetailsFromMongo(); 
                // CONTINUE HERE !
                
                this.setState({

                    // user: user id
                    userExp: exp, 
                    timestamp: Math.floor(Date.now() / 1000),
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

                            dataPointMouseEnter: (event, chartContext, config)=> {
                                event.path[0].style.cursor = "pointer";

                                let selectedMovieName = config.w.globals.seriesNames[config.seriesIndex] 
                                // set state "current movie name" by ^
                                this.setState({ activeMovieName: selectedMovieName});
                                // call function that returns movie by name
                                let thisMovie = this.state.movies.find(m => m.name === selectedMovieName );
                                // then call this.handlehover
                                this.handleHover(true,thisMovie);          
                            },
                            
                            dataPointMouseLeave: (event, chartContext, config)=> {
                                let selectedMovieName = config.w.globals.seriesNames[config.seriesIndex] 
                                let thisMovie = this.state.movies.find(m => m.name === selectedMovieName );
                                this.handleHoverStop(false,thisMovie);
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
                    },()=>console.log(this.state.userExp) // set state callback function
                    );
            })
            .catch(error => {
                console.log(error);
                console.log("MovieCards.jsx - component did mount error!")
            });           
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
        let randomExp = experiments[Math.floor(Math.random() * experiments.length)];

        return randomExp;
    }

    recommendationsDetailsFromMongo(){
        // TODO: get recommendations from lijie's API

        // Mock data
        let listFromLijie = [{titleId: "tt0000417", x: 1, y: 2},
                            {titleId: "tt0001223", x:2, y:6},
                            {titleId: "tt0004707", x: -6, y:3},
                            {titleId: "tt0005078", x: 10, y: -2},
                            {titleId: "tt0003740", x: 5, y:5},
                            {titleId: "tt0000439", x: 6, y:8},
                            {titleId: "tt0009611", x: 8, y: 2},
                            {titleId: "tt0011841", x: 7, y: 3},
                            {titleId: "tt0009968", x:8, y:9},
                            {titleId: "tt0010806", x:-3, y:9}];
              
        // url array from recommendations
        let urlArr = [];
        for (let i=0;  i< listFromLijie.length; i++){
            urlArr.push(API+listFromLijie[i].titleId)
        }

        // get all data of these movie ids from mongo db
        let promiseArr= urlArr.map(url=> axios.get(url));
        axios.all(promiseArr)
        .then(function(results){
            let listFromMongo = results.map(r=> r.data);
            console.log(listFromMongo);
        });
        
        // return array of these movies will all data + x,y axis
        // TODO after: pass this list as props to next component and use this data there also.       
    }

    // handle hover on list / graph element
    handleHover(isShown, activeMovie){
        
        this.setState(prevState => ({
            setIsShown: isShown,
            activeMovie: activeMovie,
            isHovered: !prevState.isHovered,
            hoverTime: Math.floor(Date.now() / 1000),
            currentTitleId: activeMovie.titleId
        }));    
    };

    // handle hover stop on list / graph element
    handleHoverStop(){
        
        let hoverTime_ = Math.floor(Date.now() / 1000)-this.state.hoverTime;
        let userHover = {item_id: this.state.currentTitleId, hover: hoverTime_};
        this.setState({
			hoverTimes: [...this.state.hoverTimes, userHover]
		});   
    }

    // handle show movie details
    handleShow = ()=>{
        this.setState({
            isActive: true
        })
    };

    // handle hide movie details
    handleHide = () =>{
        this.setState({
            isActive: false
        })
    };
    
    // handle click on synopsis "show more"
    handeClick = (currentMovieSynopsis,currentMovieId)=>{		
		this.setState({
            currentTitleId: currentMovieId,
            modalTimeStamp1: Math.floor(Date.now() / 1000),
			showModal: true,
            showOverView: true,
            curMovieSynopsis: currentMovieSynopsis
		});
	}

    // close synopsis modal
    closeModal = ()=>{
        let userTime = {item_id: this.state.currentTitleId, time: Math.floor(Date.now() / 1000)-this.state.modalTimeStamp1};

		this.setState({
			showModal: false,
            synopsisTimes: [...this.state.synopsisTimes, userTime]
		});
	}

    // post user data to mongo db
    componentWillUnmount(){
       
        let value = Math.floor(Date.now() / 1000)-this.state.timestamp;  // time in page
   
        this.postToMongo(this.state.page,this.state.user,"time",value); // post to mongo user time in page
        this.postToMongo(this.state.page,this.state.user,"hovers",this.state.hoverTimes); // post to mongo user hover times
        this.postToMongo(this.state.page,this.state.user,"synopsis",this.state.synopsisTimes); // post to mongo user synopsis times
        this.postToMongo(this.state.page,this.state.user,"likeBest",this.state.likeBest); // post to mongo like best
        this.postToMongo(this.state.page,this.state.user,"exp",this.state.userExp); // post to mongo user experiment
    }

    // "like best" button listener
    likeBest(){       
        this.setState({
            likeBest: this.state.currentTitleId
		});
    }

    // data will be sent from here -> router -> server -> mongo db
    postToMongo(cpage,cuser,caction,cvalue) {

        const newAction = {
            page: cpage,
            user: cuser,
            action: caction,
            value: cvalue
        }
        axios.post('http://localhost:5000/create', newAction);
    }

       
    render() {  

        if (this.state.loaderActive) return  <Loader />; // Conditional Rendering!
        return (
            <div>
                 {/* Progress bar component */ }
                <ProgressBarComponent percentComplete={75} />

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
                            <Card body inverse style={{ backgroundColor: '#ccebff', borderColor: '#333', maxWidth: '150',
                                height:550}}>                  
                                <CardBody style={{maxHeight: '300px' ,maxWidth: '150'}}>
                                    <h3 style={{color: 'black'}}>Final Recommendation</h3>
                                    &nbsp;&nbsp;&nbsp;
                                    <p style={{color: 'black'}}>1. Hover over a movie to read more information about it.</p>
                                    <p style={{color: 'black'}}>2. Among the ten presented movies, choosethe movie which you <b>like the best </b> by clicking on the 'like best' button.</p>
                                    <p style={{color: 'black'}}>3. Click on the 'Next' button to go to the next step. This button won't be activated till you <b>complete step 2</b>.</p>
                                </CardBody>
                            </Card>
                        </div>

                     {/* Recommended movies - Randomely graph or list */ }
                    {this.state.graphVis ? 
                         <div  >   
                     <MovieGraph options = {this.state.optionsForGraph} series={this.state.seriesForGraph}/>
                       </div>
                        : (  <MovieSidePanel panelTitle="Recommened movies for you" movieList={this.state.movies.slice(0, 10)} handler={this.handleHover} handlerOut={this.handleHoverStop}/> )}


                    {/* Movie details - shown when mouse hover on a */ }
                    {this.state.setIsShown && (this.state.activeMovie!= null) ? (
                        <div className="col-sm-4">
                            <Card body inverse style={{ backgroundColor: '#ccebff', borderColor: '#333', width:'100%',
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
                                    <CardText style={{color: 'black' ,cursor: 'pointer'}}  onClick={() => this.handeClick(this.state.activeMovie.plot,this.state.activeMovie.titleId)}>
                                        <b>Overview:</b> {this.state.activeMovie.plot.slice(0,100)} <b>... (click to see more)</b>
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
                                    
                                     
                                    <button variant="secondary" size="lg"  onClick={() => this.likeBest()}>Like Best</button>
                                   
                                </CardBody>
                            </Card>
                        </div>
                    ) : (<div className="col-sm-4" />)
                    }
                    
                </div>

                {/* "next" button  */ }  
                <div align="right" className="padding">
                    <Link to={{ pathname: "/movies2", state: {vis: this.state.listVis}   }}>
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