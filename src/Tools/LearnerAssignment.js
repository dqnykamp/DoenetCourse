// import styled from "styled-components";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import ToolLayoutPanel from "./ToolLayout/ToolLayoutPanel";
import ToolLayout from "./ToolLayout/ToolLayout";
import DoenetViewer from "./DoenetViewer";

export default function LearnerAssignment(props) {

  const [doenetML,setDoenetML] = useState("");
  const [assignmentId,setAssignmentId] = useState("");
  const [updateNumber,setUpdateNumber] = useState(0);
  
  useEffect(()=>{
    console.log(">>>props",props,assignmentId,props.assignmentId !== assignmentId)
    if (props.assignmentId !== assignmentId){
      const payload = { params: {assignmentId:props.assignmentId} }
      console.log("payload",payload)
          axios.get('/api/getAssignmentDoenetML.php',payload)
            .then(resp=>{
              console.log("getAssignmentDoenetML",resp.data)
              //TODO: test if resp.data failed
              setDoenetML(resp.data.doenetML);
              setAssignmentId(props.assignmentId);
              setUpdateNumber(Number(updateNumber)+1)
            })
            .catch(error=>{console.warn(error)});
    }
  },[props.assignmentId])

  let mainPanel = "Loading...";
  if (doenetML !== ""){
    console.log("doenetML",doenetML)
    mainPanel =  <DoenetViewer 
    key={"doenetviewer"+updateNumber} //each component has their own key, change the key will trick Reach to look for new component
    // free={{doenetCode: this.state.viewerDoenetML}} 
    doenetML={doenetML} 
    // requestedVariant={{index:3}}
    requestedVariant={{value:"Eggplant"}}
//     mode={{
//     solutionType:this.state.solutionType,
//     allowViewSolutionWithoutRoundTrip:this.state.allowViewSolutionWithoutRoundTrip,
//     showHints:this.state.showHints,
//     showFeedback:this.state.showFeedback,
//     showCorrectness:this.state.showCorrectness,
// }}           
/>
    // mainPanel = (<>
    // <p>assignmentId {props.assignmentId}</p>
    // <p>dueDate {props.assignmentObj.dueDate}</p>
    // <p>numberOfAttemptsAllowed {props.assignmentObj.numberOfAttemptsAllowed}</p>
    // <p>doenetML</p>
    // <p>{doenetML}</p>
    // </>)
  }

  return <div>{mainPanel}</div>

// return (<ToolLayout hideHeader={true}>
//   <ToolLayoutPanel  panelName="Left Nav"> <div >Coming Soon</div> </ToolLayoutPanel>

//   <ToolLayoutPanel  panelName="Assignment">
//   <div style={{margin:"10px"}}>{mainPanel} </div>
//   </ToolLayoutPanel>
//   </ToolLayout> )
 
}

