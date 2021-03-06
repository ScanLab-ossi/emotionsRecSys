import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Welcome from './content/welcome';
import Instructions from './content/Instructions';
//import Preferences from './content/Preferences/prefPage';
import Movies from './content/MovieCards';
import Movies2 from './content/movieCards2';
import MovieInfo from './content/movieInfo';
import SurveyNew from './content/surveyNew';
import Exit from './content/ExitPage';
import MoviesList from "./content/movies-list.component";
import PersonalityTest from './content/personalityTest';
import MovieGrid from './content/Preferences/movieGrid';
import './App.css';


function App() {
   

    return (
        <div>
            <div className="App">

                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Movie Recommender Study</span>
                </nav>

            </div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/personalityTest" component={PersonalityTest}/>
                    <Route path="/inst" component={Instructions}/>
                    {/*<Route path="/pref" component={Preferences}/>*/}
                    <Route path="/movies" component={Movies}/>
                    <Route path="/movies2" component={Movies2}/>
                    <Route path="/movieInfo" component={MovieInfo}/>
                    <Route path="/exit" component={Exit}/>
                    <Route path="/mern" component={MoviesList}/>
                    <Route path="/surveyNew" component={SurveyNew}/>
                    <Route path="/movieGrid" component={MovieGrid}/>
                </Switch>

            </Router>
        </div>
    );
} 


export default App;
