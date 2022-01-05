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
        this.handleHover = this.handleHover.bind(this);
        this.handleHoverStop = this.handleHoverStop.bind(this);

        this.state = {
            recommendations: [],
            userExp: {},
            ratings: [],
            knowMovies: [],
            synopsisTimes: [],
			modalTimeStamp1: 0,
			modalTimeStamp2: 0,
            currentTitleId: "",
            hoverTimes: [],
            hoverTime: 0,
            user: "connected user",
            page: "Movies2",
            timestamp: 0,
            loaderActive: true,
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

        // get all data of these recommendation ids from mongo db
        let urlArr = this.props.location.state.urlArr;       
        let promiseArr= urlArr.map(url=> axios.get(url));
        let recommendations_ = [];
		var that = this;
  
        axios.all(promiseArr)
        .then(function(results){
            recommendations_ = results.map(r=> r.data[0]); 
			that.setState({ recommendations: recommendations_ });	

            // random visualization (ADD this.props.location.state.exp.DIV WHEN CONNECTED TO LIJJIE)
            if (that.props.location.state.exp.vis === "graph latent"){                 
                    that.setState({ graphVis: true});
                    // add diversification
            } 
            if (that.props.location.state.exp.vis === "graph emotions"){
                      that.setState({ graphVis: true});
                    // add diversification
            }
            if (that.props.location.state.exp.vis === "list"){
                that.setState({ graphVis: false}) 
                    // add diversification
            }
                    
            that.setState({

                // user: user id
                userExp: that.props.location.state.exp, // user experiment
                timestamp: Math.floor(Date.now() / 1000), // time stamp when starting component 
                loaderActive: false,// loader state: change to off
                        
                seriesForGraph: [{name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(0, 1)),data: [[7,5],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(1, 2)),data: [[5, 9],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(2, 3)),data: [[7, 5],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(3, 4)),data: [[4, 6],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(4, 5)),data: [[5, 5],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(5, 6)),data: [[7, 7],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(6, 7)),data: [[4, 4],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(7, 8)),data: [[2, 6],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(8, 9)),data: [[1, 8],]},
                        {name: String(recommendations_.map(currentMovie => (currentMovie.name)).slice(9, 10)),data: [[8, 2],]}
                        ],
                        
                optionsForGraph: {
                    chart: {
                        events: {
                            dataPointMouseEnter: (event, chartContext, config)=> {
                                event.path[0].style.cursor = "pointer";
                                let selectedMovieName = config.w.globals.seriesNames[config.seriesIndex]  
                                that.setState({ activeMovieName: selectedMovieName}); // set state "current movie name" by ^                           
                                let thisMovie = recommendations_.find(m=> m.name===selectedMovieName ); // call function that returns movie by name
                                that.handleHover(true,thisMovie); // then call this.handlehover         
                                },
                                
                            dataPointMouseLeave: (event, chartContext, config)=> {
                                let selectedMovieName = config.w.globals.seriesNames[config.seriesIndex] 
                                let thisMovie = recommendations_.find(m=> m.name===selectedMovieName );
                                that.handleHoverStop(false,thisMovie);
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
                        min: 0,
                        max: 10,
                        labels:{
                            formatter: (v)=>{
                                that.setState({ currentX: v});
                                return v;
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 10,
                        min: 0,
                        max: 10,
                        labels:{
                            formatter: (v)=>{
                                that.setState({ currentY: v});
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
                            src: [String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                    new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(0, 1)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(1, 2)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(2, 3)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(3, 4)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(4, 5)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(5, 6)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(6, 7)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(7, 8)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(8, 9)),
                                    String(recommendations_.map(currentMovie => (URL.createObjectURL(
                                        new Blob([Buffer.from(currentMovie.poster,"base64").buffer], { type: 'image/png' })))).slice(9, 10)) ],
                        width: 40,
                        height: 40
                        }
                    },                      
                }                 
            },()=>console.log("Experiment: visualization: " + that.state.userExp.vis
            + ", diversification: "+ that.state.userExp.div)); // set state callback function         
        });          
    }


    handleHover(isShown, activeMovie){
        this.setState(prevState => ({
            setIsShown: isShown,
            activeMovie: activeMovie,
            isHovered: !prevState.isHovered,
            hoverTime: Math.floor(Date.now() / 1000),
            currentTitleId: activeMovie.titleId
        }));   
    };

    handleHoverStop(isShown, activeMovie){
        
        let hoverTime_ = Math.floor(Date.now() / 1000)-this.state.hoverTime;
        let userHover = {item_id: this.state.currentTitleId, hover: hoverTime_};
        this.setState({
			hoverTimes: [...this.state.hoverTimes, userHover]
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

    handeClick = (currentMovieSynopsis,currentMovieId)=>{		
		this.setState({
            currentTitleId: currentMovieId,
            modalTimeStamp1: Math.floor(Date.now() / 1000),
			showModal: true,
            showOverView: true,
            curMovieSynopsis: currentMovieSynopsis
		});
	}

    closeModal = ()=>{
        let userTime = {item_id: this.state.currentTitleId, time: Math.floor(Date.now() / 1000)-this.state.modalTimeStamp1};

		this.setState({
			showModal: false,
            synopsisTimes: [...this.state.synopsisTimes, userTime]
		});
	}

    componentWillUnmount(){
        
        let value = Math.floor(Date.now() / 1000)-this.state.timestamp; // time in page
   
        this.postToMongo(this.state.page,this.state.user,"time",value); // post to mongo user time in page
        this.postToMongo(this.state.page,this.state.user,"hovers",this.state.hoverTimes); // post to mongo user hover times
        this.postToMongo(this.state.page,this.state.user,"synopsis",this.state.synopsisTimes); // post to mongo user synopsis times
        this.postToMongo(this.state.page,this.state.user,"know movies",this.state.knowMovies); // post to mongo movies the user knows / doesnt know
        this.postToMongo(this.state.page,this.state.user,"rating",this.state.ratings); // post to mongo recommendation ratings

    }

    // onClick "check"/"cross" button
    knowMovie(trueOrFalse){

        let knowMovie= {item_id: this.state.currentTitleId, know: trueOrFalse};
    
        // if the list includes this movie id, but with the value false, replace
        if (this.state.knowMovies.some(e=>e.item_id=== this.state.currentTitleId && e.know === !trueOrFalse)){
            this.setState(prevState => {
                let newData = prevState.knowMovies;
                let oldValue = newData.find(d => d.item_id === knowMovie.item_id);
                Object.assign(oldValue, knowMovie);
                return {knowMovies: newData};
            })
        }

        // if new record- append to list
        if(!this.state.knowMovies.some(e=>e.item_id=== this.state.currentTitleId)){
            this.setState({
                knowMovies: [...this.state.knowMovies, knowMovie]
            });
            
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
        axios.post('http://localhost:5000/create', newAction);
    }


    render() {    

        const ratingChanged = (newRating) => {
            let rating= {item_id: this.state.currentTitleId, userRating: newRating};
          
            // if the list includes this movie id, but with the value false, replace
            if (this.state.ratings.some(e=>e.item_id=== this.state.currentTitleId && e.userRating !== newRating)){
                 this.setState(prevState => {
                    let newData = prevState.ratings;
                    let oldValue = newData.find(d => d.item_id === rating.item_id);
                    Object.assign(oldValue, rating);
                    return {ratings: newData};
                })
            }
            
            // if new record- append to list
            if(!this.state.ratings.some(e=>e.item_id=== this.state.currentTitleId)){
                this.setState({
                    ratings: [...this.state.ratings, rating]
                });
            }
        };

        if (this.state.loaderActive) return  <Loader />; // Conditional Rendering!

        return (
            <div>
                 {/* Progress bar component */ }
                <ProgressBarComponent percentComplete={85} />
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
                                    <p style={{color: 'black'}}>2. Click on the check or cross icon for each movie to indicate if you <b>know</b> or <b>don't know</b> the movie.</p>
                                    <p style={{color: 'black'}}>3. <b>Rate</b> all the ten movies. If you haven't seen the movie please rate based on the information given.</p>
                                    <p style={{color: 'black'}}>4. Click on the 'Next' button to go to the next step. This button won't be activated till you <b>complete steps 2-3</b>.</p>
                                </CardBody>
                            </Card>
                        </div>


                       {/* Recommended movies - Randomely graph or list */ }
                    {this.state.graphVis ? 
                         <div  >   
                     <MovieGraph options = {this.state.optionsForGraph} series={this.state.seriesForGraph} />
                       </div>
                        : (  <MovieSidePanel panelTitle="Recommened movies for you" movieList={this.state.recommendations} handler={this.handleHover} handlerOut={this.handleHoverStop }/> )}
                    

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
                                        <b>Rating: {this.state.activeMovie.movie_rating}</b>
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

                                    <button onClick={() => this.knowMovie(true)}><img src="check.png" width="12px" height="12px" alt=""></img></button>
                                        &nbsp;&nbsp;&nbsp;
                                    <button onClick={() => this.knowMovie(false)}><img src="cross.jpg" width="12px" height="12px" alt=""></img></button>
                                       
                                        
                                        

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