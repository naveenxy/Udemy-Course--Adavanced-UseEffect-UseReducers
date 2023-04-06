import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
function emailReducer(state,action)
{
 // console.log(action)
  if(action.type ==='USER_INPUT')
  {
    return{value:action.val,isValid:action.val.includes('@')}
   
  }
  if(action.type ==="USER_BLUR")
  {

    return{value:state.value,isValid:state.value.includes('@')}
  }
  return {value:'',isValid:false}
}
function passwordReducer(state,action)
{
 // console.log(action)
  if(action.type ==='USER_INPUT')
  {
    return{value:action.val,isValid:action.val.trim().length > 6}
   
  }
  if(action.type ==="USER_BLUR")
  {

    return{value:state.value,isValid:state.value.trim().length > 6}
  }
  return {value:'',isValid:false}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,emaildispatch]= useReducer(emailReducer,{
    value:' ',
    isValid:null
  })
  const [passwordState,passwordDispatch] =useReducer(passwordReducer,{
    value:'',
    isValid:null
  })

useEffect(()=>{
  console.log("EEFFuse-effectECT")
},[])
   useEffect(()=>{

    const handler =setTimeout(() => {
      console.log("Check for Validity")
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);
   return(()=>{
    console.log("Clean-up")
    clearTimeout(handler)
   })
   },[emailState.isValid,passwordState.isValid])


  const emailChangeHandler = (event) => {
   // setEnteredEmail(event.target.value);
  emaildispatch({type:'USER_INPUT',val:event.target.value})
    
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    passwordDispatch({type:'USER_INPUT',val:event.target.value})
  };

  const validateEmailHandler = () => {
   // setEmailIsValid(enteredEmail.includes('@'));
   emaildispatch({type:"USER_BLUR"})
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    passwordDispatch({type:"USER_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
   props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
