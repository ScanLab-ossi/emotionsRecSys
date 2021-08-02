import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import { Link }  from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import ProgressBarComponent from "./progressBarComponent";
import Modal from 'react-bootstrap/Modal';


class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      disabled: true,
    };
  }
    render() { 
      const show = this.state.show;
        return ( 
       <div>
<ProgressBarComponent percentComplete={30} />

         <br/>

      <div className="instructions-page">   
     
  <div className="row">
    <div className="col-sm">
    <div className="card ">
  <img src="/Preference-rssa.png" className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">Rate 20 movies you have watched among the presented movies
                  </p>
  </div>
</div>
    </div>
    <div className="col-sm">
    <div className="card">
  <img src="/recommendation-rssa.png" className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">Rate the recommended movies that are based on your preferences, indicate if you have seen the movies and choose one that you like the best</p>
  </div>
</div>
    </div>
    <div className="col-sm">
    <div className="card">
  <img src="/survey-rssa.png" className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">Complete a survey about the experience with the system and recommendations</p>
  </div>
</div>
    </div>
  </div>

        </div>
        <Button variant="primary" size="lg" style={{float: 'right', marginRight: 0}}
                    onClick={() => this.setState({"show": true})}>
              Next
        </Button>
        <Modal show={show} dialogClassName="modal-70w" >
          <Modal.Header>
            <Modal.Title>Are you ready?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              If you are ready to begin the study you can press the "Begin" button below.
            </p>
            <p>
              The first section of the study will start.
            </p>
          </Modal.Body>
          <Modal.Footer>  
          <Link to="/pref">
              <Button variant="primary" size="lg"  style={{float: 'right', marginRight: 0}}>            
                Begin
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
     </div>
      
         );
    }
}

export default Instructions;