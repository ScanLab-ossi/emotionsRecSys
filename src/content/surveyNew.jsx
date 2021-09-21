import React, {Component} from 'react';
import "react-step-progress-bar/styles.css";
import ProgressBarComponent from "./progressBarComponent";
import "survey-react/survey.css";
import * as Survey from "survey-react";

class SurveyNew extends Component{
    constructor(props){
        super(props)
        this.state={

        }
        this.onCompleteComponent = this.onCompleteComponent.bind(this);
    }

    onCompleteComponent=()=>{
        this.setState({
            isComplete: true
        })
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
                "title": "All the recommended movies in the final list were similar to each other."
               },
               {
                "type": "rating",
                "name": "question2",
                "title": "None of the movies in the recommended list were alike"
               },
               {
                "type": "rating",
                "name": "question3",
                "title": "Most movies were from the same genre"
               },
               {
                "type": "rating",
                "name": "question4",
                "title": "The recommended list of movies suits a broad set of tastes"
               },
               {
                "type": "rating",
                "name": "question5",
                "title": "The recommended movies were from many different genres"
               },
               {
                "type": "rating",
                "name": "question6",
                "title": "The recommendations contained a lot of variety"
               }
              ],
              "title": "Welcome to the post-task survey!\nPlease rate your agreement with the statements about your experience with your LAST movie option.",
              "description": "\n\n   \n\n1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page2",
              "elements": [
               {
                "type": "rating",
                "name": "question7",
                "title": "I liked the movies recommended by the movie recommender"
               },
               {
                "type": "rating",
                "name": "question8",
                "title": "I found the recommended movies appealing"
               },
               {
                "type": "rating",
                "name": "question9",
                "title": "The recommended movies fit my preference"
               },
               {
                "type": "rating",
                "name": "question10",
                "title": "The recommended movies were relevant"
               },
               {
                "type": "rating",
                "name": "question11",
                "title": "The system recommended too many bad movies."
               },
               {
                "type": "rating",
                "name": "question12",
                "title": "I did not like any of the recommended movies."
               }
              ],
              "title": "Welcome to the post-task survey!Please rate your agreement with the statements about your experience with your LAST movie option.",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page3",
              "elements": [
               {
                "type": "rating",
                "name": "question13",
                "title": "I like the movie I’ve chosen from the final recommendation list."
               },
               {
                "type": "rating",
                "name": "question14",
                "title": "The chosen movie fits my preference."
               },
               {
                "type": "rating",
                "name": "question15",
                "title": "I would recommend my chosen movie to others/friends."
               },
               {
                "type": "rating",
                "name": "question16",
                "title": "I was excited about my chosen movie"
               },
               {
                "type": "rating",
                "name": "question17",
                "title": "I think I chose the best movie from the options"
               },
               {
                "type": "rating",
                "name": "question18",
                "title": "I know several items that are better than the one I selected"
               },
               {
                "type": "rating",
                "name": "question19",
                "title": "I would rather watch a different movie from the one I selected"
               }
              ],
              "title": "Welcome to the post-task survey!Please rate your agreement with the statements about your experience with your LAST movie option.",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page4",
              "elements": [
               {
                "type": "rating",
                "name": "question20",
                "title": "I feel like I was recommended the same movies as everyone else."
               },
               {
                "type": "rating",
                "name": "question21",
                "title": "The movies that were recommended are very popular movies."
               },
               {
                "type": "rating",
                "name": "question22",
                "title": "I selected the movies that I think are the most popular overall."
               },
               {
                "type": "rating",
                "name": "question23",
                "title": "I selected movies that are rather different from what I imagine others would choose."
               },
               {
                "type": "rating",
                "name": "question24",
                "title": "Probably nobody selected the exact same set of movies as me."
               }
              ],
              "title": "Welcome to the post-task survey!Please rate your agreement with the statements about your experience with your LAST movie option.",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page5",
              "elements": [
               {
                "type": "rating",
                "name": "question25",
                "title": "The movie recommender catered to all of my potential interests"
               },
               {
                "type": "rating",
                "name": "question26",
                "title": "The movies that were recommended did not reflect my diverse taste in movies."
               },
               {
                "type": "rating",
                "name": "question27",
                "title": "The movie recommender seemed to target only a small subset of my interests."
               },
               {
                "type": "rating",
                "name": "question28",
                "title": "The movie recommender treated me as a one-dimensional person."
               },
               {
                "type": "rating",
                "name": "question29",
                "title": "The lists of recommendations matched a diversity of my preferences."
               },
               {
                "type": "rating",
                "name": "question30",
                "title": "The recommended movies were a perfect fit for me on many different levels."
               },
               {
                "type": "rating",
                "name": "question31",
                "title": "The movie recommender seemed to stereotype me in a particular category of viewers."
               }
              ],
              "title": "Welcome to the post-task survey!Please rate your agreement with the statements about your experience with your LAST movie option.",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page6",
              "elements": [
               {
                "type": "rating",
                "name": "question32",
                "title": "I like using the system."
               },
               {
                "type": "rating",
                "name": "question33",
                "title": "Using the system is a pleasant experience."
               },
               {
                "type": "rating",
                "name": "question34",
                "title": "I would recommend the system to others."
               },
               {
                "type": "rating",
                "name": "question35",
                "title": "I can find better movies using the system."
               },
               {
                "type": "rating",
                "name": "question36",
                "title": "I would quickly abandon using the system."
               },
               {
                "type": "rating",
                "name": "question37",
                "title": "I would use the system more often if possible."
               }
              ],
              "title": "Welcome to the post-task survey!Please rate your agreement with the statements about your experience with your LAST movie option.",
              "description": "   1: Strongly disagree, 2: Disagree, 3: Neither agree nor disagree, 4: Agree, 5: Strongly agree"
             },
             {
              "name": "page7",
              "elements": [
               {
                "type": "text",
                "name": "question38",
                "title": "Joy"
               },
               {
                "type": "text",
                "name": "question39",
                "title": "Trust"
               },
               {
                "type": "text",
                "name": "question40",
                "title": "Fear"
               },
               {
                "type": "text",
                "name": "question41",
                "title": "Surprise"
               },
               {
                "type": "text",
                "name": "question42",
                "title": "Sadness"
               },
               {
                "type": "text",
                "name": "question43",
                "title": "Disgust"
               },
               {
                "type": "text",
                "name": "question44",
                "title": "Anger"
               },
               {
                "type": "text",
                "name": "question45",
                "title": "Anticipation"
               }
              ],
              "title": "Welcome to the post-task survey.",
              "description": "Please write for each emotion below its meaning in your opinion"
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
               <div>Thanks for completing the survey!</div>
               // TODO : connect with mongoDB
               // TODO : check why triggers don't work
           ) : null
           return(
               <div>
                  
                  <ProgressBarComponent percentComplete={90} />
                   &nbsp;&nbsp;&nbsp;
                    {surveyRender}
                    {onSurveyCompletion}
               </div>
                
           );
    }
}

export default SurveyNew;