import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import ProgressBarComponent from "./progressBarComponent";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import Instructions from './Instructions';
import axios from "axios";

class PersonalityTest extends Component{
    constructor(props){
        super(props)
        this.state={
            page: "PersonalityTest",
            user: "connected user",
            movie: "",
            isComplete: false,
            timestamp: 0,
            q: "",
            a: ""
        }
        this.onCompleteComponent = this.onCompleteComponent.bind(this);
    }

    // post to mongo db personality test results
    onCompleteComponent=(survey, options)=>{
        
        //console.log("Survey results: " + JSON.stringify(survey.data));
        let action = "surveyResults";
        let value = JSON.stringify(survey.data);
        this.postToMongo(this.state.page,this.state.user,this.state.movie,action,value);

        this.setState({
            isComplete: true
        })
    }

    componentDidMount(){
        this.setState({
            timestamp: Math.floor(Date.now() / 1000)
            // user: user id 
        });
      }

    componentWillUnmount(){
        // time in page
        let action = "time";
        let value = Math.floor(Date.now() / 1000)-this.state.timestamp;
     //   console.log("page: " + this.state.page, ", user: " + user, ", movie: " + movie, ", action: " + action, ", value: " +value);
        this.postToMongo(this.state.page,this.state.user,this.state.movie,action,value);
    }

    // data will be sent from here -> router -> server -> mongo db
    postToMongo(cpage,cuser,cmovie,caction,cvalue) {

        const newAction = {
            page: cpage,
            user: cuser,
            movie: cmovie,
            action: caction,
            value: cvalue
        }
        axios.post('http://localhost:5000/create', newAction)
    }

    
    

    render(){
        
        var json = {
            "pages": [
             {
              "name": "page1",
              "elements": [
               {
                "type": "rating",
                "name": "question1",
                "title": "I see myself as someone who is talkative",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
            },
               {
                "type": "rating",
                "name": "question2",
                "title": "I see myself as someone who tends to find fault with others",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question3",
                "title": "I see myself as someone who does a thorough job",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question4",
                "title": "I see myself as someone who is depressed, blue",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question5",
                "title": "I see myself as someone who is original, comes up with new ideas",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question6",
                "title": "I see myself as someone who is reserved",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               }
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "\n\n   \n\n1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page2",
              "elements": [
               {
                "type": "rating",
                "name": "question7",
                "title": "I see myself as someone who is helpful and unselfish with others",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question8",
                "title": "I see myself as someone who can be somewhat careless",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question9",
                "title": "I see myself as someone who is relaxed, handles stress well",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question10",
                "title": "I see myself as someone who is curious about many different things",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question11",
                "title": "I see myself as someone who is full of energy",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question12",
                "title": "I see myself as someone who starts quarrels with others",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               }
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page3",
              "elements": [
               {
                "type": "rating",
                "name": "question13",
                "title": "I see myself as someone who is a reliable worker",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question14",
                "title": "I see myself as someone who can be tense",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question15",
                "title": "I see myself as someone who is ingenious, a deep thinker",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question16",
                "title": "I see myself as someone who generates a lot of enthusiasm",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question17",
                "title": "I see myself as someone who has a forgiving nature",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question18",
                "title": "I see myself as someone who tends to be disorganized",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question19",
                "title": "I see myself as someone who worries a lot",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               }
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page4",
              "elements": [
               {
                "type": "rating",
                "name": "question20",
                "title": "I see myself as someone who has an active imagination",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question21",
                "title": "I see myself as someone who tends to be quiet",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question22",
                "title": "I see myself as someone who is generally trusting",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question23",
                "title": "I see myself as someone who tends to be lazy",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question24",
                "title": "I see myself as someone who is emotionally stable, not easily upset",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               }
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page5",
              "elements": [
               {
                "type": "rating",
                "name": "question25",
                "title": "I see myself as someone who inventive",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question26",
                "title": "I see myself as someone who has an assertive personality",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question27",
                "title": "I see myself as someone who can be cold and aloof",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question28",
                "title": "I see myself as someone who perseveres until the task is finished",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question29",
                "title": "I see myself as someone who can be moody",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question30",
                "title": "I see myself as someone who values artistic, aesthetic experiences",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question31",
                "title": "I see myself as someone who is sometimes shy, inhibited",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               }
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page6",
              "elements": [
               {
                "type": "rating",
                "name": "question32",
                "title": "I see myself as someone who is considerate and kind to almost everyone",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question33",
                "title": "I see myself as someone who does things efficiently",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question34",
                "title": "I see myself as someone who remains calm in tense situations",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question35",
                "title": "I see myself as someone who prefers work that is routine",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question36",
                "title": "I see myself as someone who is outgoing, sociable",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question37",
                "title": "I see myself as someone who is sometimes rude to others",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               }
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page7",
              "elements": [
               {
                "type": "rating",
                "name": "question38",
                "title": "I see myself as someone who makes plans and follows through with them",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question39",
                "title": "I see myself as someone who gets nervous easily",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question40",
                "title": "I see myself as someone who likes to reflect, play with ideas",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question41",
                "title": "I see myself as someone who has few artistic interests",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question42",
                "title": "I see myself as someone who likes to cooperate with others",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question43",
                "title": "I see myself as someone who is easily distracted",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
               {
                "type": "rating",
                "name": "question44",
                "title": "I see myself as someone who is sophisticated in art, music, or literature",
                "minRateDescription": "Disagree",
                "maxRateDescription": "Agree"
               },
              
              ],
              "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
                "name": "page8",
                "elements": [
                 {
                  "type": "rating",
                  "name": "question45",
                  "title": "When I watch TV, I channel surf, often scanning through the available options even while attempting to watch one program",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                  "type": "rating",
                  "name": "question46",
                  "title": "When I am in the car listening to the radio, I often check other stations to see if something better is playing, even if I am relatively satisfied with what I’m listening to.",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                  "type": "rating",
                  "name": "question47",
                  "title": " I treat relationships like clothing: I expect to try a lot on before finding the perfect fit.",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                  "type": "rating",
                  "name": "question48",
                  "title": "No matter how satisfied I am with my job, it’s only right for me to be on the lookout for better opportunities.",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                  "type": "rating",
                  "name": "question49",
                  "title": "I often fantasize about living in ways that are quite different from my actual life. ",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                  "type": "rating",
                  "name": "question50",
                  "title": "I’m a big fan of lists that attempt to rank things (the best movies, the best singers, the best athletes, the best novels, etc.).",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                  "type": "rating",
                  "name": "question51",
                  "title": "I often find it difficult to shop for a gift for a friend",
                  "minRateDescription": "Disagree",
                  "maxRateDescription": "Agree"
                 },
                 {
                    "type": "rating",
                    "name": "question52",
                    "title": "When shopping, I have a hard time finding clothing that I really love",
                    "minRateDescription": "Disagree",
                    "maxRateDescription": "Agree"
                   },
                
                   {
                    "type": "rating",
                    "name": "question53",
                    "title": "Renting videos is really difficult. I’m always struggling to pick the best one.",
                    "minRateDescription": "Disagree",
                    "maxRateDescription": "Agree"
                   },
                
                   {
                    "type": "rating",
                    "name": "question54",
                    "title": "I find that writing is very difficult, even if it’s just writing a letter to a friend, because it’s so hard to word things just right. I often do several drafts of even simple things. ",
                    "minRateDescription": "Disagree",
                    "maxRateDescription": "Agree"
                   },
                   {
                    "type": "rating",
                    "name": "question55",
                    "title": "No matter what I do, I have the highest standards for myself",
                    "minRateDescription": "Disagree",
                    "maxRateDescription": "Agree"
                   },
                   {
                    "type": "rating",
                    "name": "question56",
                    "title": "I never settle for second best",
                    "minRateDescription": "Disagree",
                    "maxRateDescription": "Agree"
                   },
                   {
                    "type": "rating",
                    "name": "question57",
                    "title": "Whenever I’m faced with a choice, I try to imagine what all the other possibilities are, even ones that aren’t present at the moment. ",
                    "minRateDescription": "Disagree",
                    "maxRateDescription": "Agree"
                   },
                  
                
                ],
                "title": "Welcome to the pre-task personality test. \n Here are a number of characteristics that may or may not apply to you. \n Please rate your agreement with the statements to indicate the extent to which you agree or disagree with that statement. \n",
                "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
               }
               
             
            ],
            "triggers": [
             {
              "type": "complete",
              "expression": "{question1} notempty and {question2} notempty and {question3} notempty and {question4} notempty and {question5} notempty and {question6} notempty and {question7} notempty and {question8} notempty and {question9} notempty and {question10} notempty and {question11} notempty and {question12} notempty and {question13} notempty and {question14} notempty and {question15} notempty and {question16} notempty and {question17} notempty and {question18} notempty and {question19} notempty and {question20} notempty and {question21} notempty and {question22} notempty and {question23} notempty and {question24} notempty and {question25} notempty and {question26} notempty and {question27} notempty and {question28} notempty and {question29} notempty and {question30} notempty and {question31} notempty and {question32} notempty and {question33} notempty and {question34} notempty and {question35} notempty and {question36} notempty and {question37} notempty and {question38} notempty and {question39} notempty and {question40} notempty and {question41} notempty and {question42} notempty and {question43} notempty and {question44} notempty and {question45} notempty"
             }
            ]
           };
           var surveyRender = !this.state.isComplete ? (
               
               <Survey.Survey
                 json= {json}
                 showCompletePage= {false}
                 onComplete= {this.onCompleteComponent}
                 
               />
           ) : null
           var onSurveyCompletion = this.state.isComplete ? (
               <div>
                   <Instructions />
                </div>
               
               
               // TODO : connect with mongoDB
               // TODO : check why triggers don't work
           ) : null

        
           return(
               <div>               
                  <ProgressBarComponent percentComplete={25} />
                   &nbsp;&nbsp;&nbsp;
                    {surveyRender}
                    {onSurveyCompletion}

                    
               </div>
               
                
           );
    }
}

export default PersonalityTest;