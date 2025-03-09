import './App.css'
import React from 'react';
import {useReducer} from 'react';

export default function Login(){
 const [state, dispatch] = useReducer(myreducer, {submitted:false, email: ""});

const reset = ( 
  <>
  <div className="reset"> <span>Enter email address to retrieve your username: </span>
<input onChange={(e) => 
dispatch({
  type: "retrieve",
  emailtext: e.target.value, 
})
}
placeholder="enter email address" value={state.useremail} />
<button className="reset" onClick={() => dispatch({
  type:"reset",
  text: "A reset link has been sent to " + state.useremail
})} type="button">reset</button> 
</div> 
<p className="error">{state.error}</p>
</>
);

const other = (
<div className="other">
<p className="logout"><a onClick={() => dispatch({
   type: "home",
   submitted: false,
   
 })}
href="#">log out</a></p>

<h4>Inbox: {state.email}</h4>
<div onClick={() => dispatch({
type: "toggle",
useremail:state.email,
move: "shiftright",
submitted: true,
})
}
className="toggle">
<b>focused</b><b>other</b>
<div className={`${state.direction} toggleoverlap`}></div>
</div>

<div className="inbox">
<ul>
<li><span>WB</span> World of Books - Javascript the definitive guide, pre-order volume edition 8</li>
<li><span>EE</span> EE Mobile - Your mobile phone statement for this month has landed!</li>
<li><span>S</span> Sainsburys Supermarket - Nectar points and more with Sainsburys and our partners </li>
<li><span>T</span>Tesco clubcard - Get the latest deals and discounts using your clubcard</li>
<li><span>MA</span> Matalan Online - 15% off ladies wear this weekend only. Use Code "WEEKEND" </li>
<li><span>A</span>Auto Trader - enter our competition today to win a new Audi Quattro </li>
</ul>

<div className="bottommenu">
<span>&#9993;</span><span>&#128197;</span><span>&#9859;</span>
<span>&#9873;</span>
</div>
</div>
</div>
);

if (state.type == "toggle"){
  return <div>{other}</div>
} else if(state.type == "reset"){
  return <div className="sendlink">
  <p>{state.email}</p>
  <a href="#" onClick={() => dispatch({
    type: "home",
    submitted: false,
  
  })}
  className="back">&larr; Back</a>
  </div>
} else if (state.type == "forget" || state.type == "retrieve"){
  return <>{reset}</>
} else {

 return (
<>
{state.submitted ? <div className="submitted">
<p className="logout"><a onClick={() => dispatch({
   type: "home",
   submitted: false,
 })}
href="#">log out</a></p>

<h4>Inbox: {state.email}</h4>
<div onClick={() => dispatch({
type: "toggle",
useremail: state.email,
move: "shiftright",
submitted: true,
})
}
className="toggle">
<b>focused</b><b>other</b>
<div className={`${state.direction} toggleoverlap`}></div>
</div>

<div className="inbox">
<ul>
<li><span>BC</span> Brent Council - Have your say</li>
<li><span>VM</span> Virgin Media - New Broadband deals</li>
<li><span>MA</span> Microsoft Advertising - Claim your £200 credit today</li>
<li><span>Temu</span>Act Fast, flash sale ending soon!</li>
<li><span>MC</span> Mailchimp Support - Daily list status updates from subscribers</li>
<li><span>CS</span> Code Sandbox - Set up your project in minutes</li>
</ul>

<div className="bottommenu">
<span>&#9993;</span><span>&#128197;</span><span>&#9859;</span>
<span>&#9873;</span>
</div>
</div>
</div> :
 <div className="email" >
 <h1>Rapid Mail</h1>
 <div className="mailcontainer">
 
 <p className="text">Enter your username or email address to sign in: </p> 
 <input type="email" value={state ? state.email : ""} onChange={(e) => dispatch({
   type: "enteremail",
   useremail: e.target.value,
   submitted: false,
 })} />

</div>

<div className="nextbutton">
 <button onClick={() => dispatch({
   type: "submit",
   email: state.email,
   submitted: true,
 })}
 className="next">Next</button>
 </div>
 
 <p className="error">{state.error}</p>
 
 <p><a href="#" onClick={() =>
  dispatch({
    type: "forget",
    email: state.email,
  })
 }>forgot username?</a></p>
 </div>  
}
</>
 )
}
}

function myreducer(state, actionobject){
  switch (actionobject.type) {
    case "enteremail" : {
      return {
        email: actionobject.useremail,
        submitted:actionobject.submitted, 
      }
    }

    case "submit" : {
      let email = actionobject.email.toLowerCase();
      let iscorrect = email.match(/[\w]+@[.\w]+/i)
      if(iscorrect){
      return {
        email: actionobject.email.toLowerCase(),
        submitted: actionobject.submitted,
      };
      } else{
        return {
          error: "Please enter correct email address",
          email: ""}
      }
     }

     case "forget" :{
            return {
            
              submitted: false,
              type: "forget",
              }
          }
     

     case "retrieve" : {
       return {
         type: actionobject.type,
         useremail: actionobject.emailtext,
         
       }
     }
     case "reset" : {

       if(actionobject.text.includes("undefined") ){
         return{
           type: "retrieve",
           useremail: undefined,
           error: "please enter correct email"
           
         }
       }
       return {
         type: actionobject.type,
         email: actionobject.text.toLowerCase(),
       }
     }

     case "toggle" : {

      if(state.direction == "shiftright"){
        
        return{
          email:actionobject.useremail,
          direction: "",
          submitted: actionobject.submitted,
          
        } 
        } else {
      return {
        email: actionobject.useremail,
        direction: actionobject.move,
        submitted: actionobject.submitted,
        type: actionobject.type,
        

      }
    }
    }

    case "home" :{

       return {
         submitted: actionobject.submitted,
         email: "",
       }
     }


    default: {
      throw Error('Unknown action: ' + action.type);
    }
    }
  }
