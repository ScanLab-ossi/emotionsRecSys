import React from "react";

function Loader(){
    return(
        <div>
            <div className="loader center" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <i className="fa fa-spinner fa-pulse fa-5x fa-fw" />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <h3> Loading ... </h3>
            </div>
        </div>
    );
}

export default Loader;