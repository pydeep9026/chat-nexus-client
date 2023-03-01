import { Link, Navigate, useNavigate } from "react-router-dom"
import Svg from "./svg"
import './signup.css'
import {CiMail,CiUser,CiLock} from 'react-icons/ci';
import {FaEye} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios"
import { signuproute } from "../utils/apiroutes";
import FileBase64 from 'react-file-base64'






const Signuppage=()=>{ 
  const navigate=useNavigate()
  const [signloading, setsignLoading] = useState(false); 
  const [inputType, setInputType] = useState('password');
  const[values,setvalues]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
    photo:"",
  })


    const handlechange=(e)=>{
     setvalues({...values,[e.target.name]:e.target.value})

    }
    const handlephoto=(base64)=>{
      setvalues({...values,photo:base64.base64})
    }

    


    const handlesubmit = async (e) => {
      e.preventDefault();
      if (handlevalidation()) {
        toast.loading('signing  in please wait',{duration:4000})
        const { username, email, password, photo } = values; 
        try {
          setsignLoading(true);
          const { data } = await axios.post(signuproute, {
            username,
            email,
            password,
            photo,
          });
          if (data.status === false) {
            toast.error(data.msg);
            setsignLoading(false)
          }
          if (data.status === true) {
            localStorage.setItem('chat-nexus-user', JSON.stringify(data.user));
            toast.success('User registered successfully!');
            navigate('/');
          }
        } catch (error) {
          toast.error('An error occurred. Please try again later.');
        } finally {
          setsignLoading(false); 
        }
      }
    };

    const handleTypeChange = (e)=>{
      e.preventDefault()
      if (inputType === 'text') {
        setInputType('password');
      } else {
        setInputType('text');
      }
    }

  


    

    
    

    const handlevalidation=()=>{
      const{username,email,password,confirmpassword,photo}=values
      if(password!==confirmpassword){
      toast.error("password and confirm password must be same")
      setsignLoading(false)
      return false;
    }else if (email===""){
      toast.error("email must not be empty")
      setsignLoading(false)
      return false;
    }else if (password.length<8){
      toast.error("password must have more than 8 characters ")
      setsignLoading(false)
      return false;
    }else if (username.length<6){
      toast.error("username must have more than 6 characters")
      setsignLoading(false)
      return false;
    }else if (photo===""){
      toast.error("please upload profile picture")
      setsignLoading(false)
      return false;
    }
    return true
  }


   return (
    
    <div className="signupcontainer">
      <Toaster/>
        <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="45" height="45"
viewBox="0 0 64 64">
<path fill="#fde080" d="M5.03,45.43c-2.09-3.41-3.3-7.42-3.3-11.72c0-12.4,10.05-22.46,22.46-22.46c12.4,0,22.46,10.05,22.46,22.46 c0,12.4-10.05,22.46-22.46,22.46c-4.84,0-9.32-1.54-12.98-4.14l-9.47,4.14L5.03,45.43z"></path><path fill="#84e1e6" d="M58.97,35.67c2.09-3.41,3.3-7.42,3.3-11.72c0-12.4-10.05-22.46-22.46-22.46c-12.4,0-22.46,10.05-22.46,22.46 c0,12.4,10.05,22.46,22.46,22.46c4.84,0,9.32-1.54,12.98-4.14l9.47,4.14L58.97,35.67z"></path><circle cx="29.07" cy="23.95" r="3.91" fill="#edf7f9"></circle><circle cx="40.79" cy="23.95" r="3.91" fill="#edf7f9"></circle><circle cx="52.5" cy="23.95" r="3.91" fill="#edf7f9"></circle><g><path fill="#1c1f20" d="M57.38,61.53H43.72c-0.4,0-0.73,0.33-0.73,0.73S43.31,63,43.72,63h13.67c0.4,0,0.73-0.33,0.73-0.73 S57.79,61.53,57.38,61.53z"></path><path fill="#1c1f20" d="M62.27,61.53h-1.95c-0.4,0-0.73,0.33-0.73,0.73S59.91,63,60.31,63h1.95c0.4,0,0.73-0.33,0.73-0.73 S62.67,61.53,62.27,61.53z"></path><path fill="#1c1f20" d="M1.73,14.18c0.4,0,0.73-0.33,0.73-0.73V5.64c0-0.4-0.33-0.73-0.73-0.73S1,5.23,1,5.64v7.81 C1,13.85,1.33,14.18,1.73,14.18z"></path><path fill="#1c1f20" d="M1.73,3.44c0.4,0,0.73-0.33,0.73-0.73V1.73C2.47,1.33,2.14,1,1.73,1S1,1.33,1,1.73v0.98 C1,3.11,1.33,3.44,1.73,3.44z"></path><path fill="#1c1f20" d="M11.5,6.37h1.22v1.22c0,0.4,0.33,0.73,0.73,0.73S14.18,8,14.18,7.59V6.37h1.22c0.4,0,0.73-0.33,0.73-0.73 c0-0.4-0.33-0.73-0.73-0.73h-1.22V3.69c0-0.4-0.33-0.73-0.73-0.73s-0.73,0.33-0.73,0.73v1.22H11.5c-0.4,0-0.73,0.33-0.73,0.73 C10.77,6.04,11.09,6.37,11.5,6.37z"></path><path fill="#1c1f20" d="M48.6,56.16c0.4,0,0.73-0.33,0.73-0.73v-1.22h1.22c0.4,0,0.73-0.33,0.73-0.73s-0.33-0.73-0.73-0.73h-1.22 v-1.22c0-0.4-0.33-0.73-0.73-0.73s-0.73,0.33-0.73,0.73v1.22h-1.22c-0.4,0-0.73,0.33-0.73,0.73s0.33,0.73,0.73,0.73h1.22v1.22 C47.86,55.84,48.19,56.16,48.6,56.16z"></path><path fill="#1c1f20" d="M39.81,47.38c4.69,0,9.2-1.39,13.07-4.04l9.1,3.98c0.09,0.04,0.19,0.06,0.29,0.06c0.18,0,0.35-0.06,0.49-0.19 c0.21-0.19,0.3-0.49,0.21-0.76l-3.2-10.42C61.88,32.44,63,28.36,63,24.19C63,11.4,52.6,1,39.81,1S16.62,11.4,16.62,24.19 S27.03,47.38,39.81,47.38z M39.81,2.47c11.98,0,21.72,9.75,21.72,21.72c0,4.01-1.1,7.93-3.19,11.34c-0.11,0.18-0.14,0.4-0.08,0.6 l2.83,9.21l-8.01-3.5c-0.24-0.1-0.51-0.07-0.72,0.07c-3.69,2.62-8.03,4-12.56,4c-11.98,0-21.72-9.75-21.72-21.72 S27.83,2.47,39.81,2.47z"></path><path fill="#1c1f20" d="M24.27,14.04c0.13,0.09,0.28,0.14,0.42,0.14c0.23,0,0.45-0.11,0.6-0.31c3.35-4.7,8.78-7.5,14.52-7.5 c0.4,0,0.73-0.33,0.73-0.73c0-0.4-0.33-0.73-0.73-0.73c-6.22,0-12.09,3.03-15.71,8.11C23.86,13.35,23.94,13.81,24.27,14.04z"></path><path fill="#1c1f20" d="M29.07,19.55c-2.56,0-4.64,2.08-4.64,4.64s2.08,4.64,4.64,4.64c2.56,0,4.64-2.08,4.64-4.64 S31.63,19.55,29.07,19.55z M29.07,27.36c-1.75,0-3.17-1.42-3.17-3.17s1.42-3.17,3.17-3.17s3.17,1.42,3.17,3.17 S30.82,27.36,29.07,27.36z"></path><path fill="#1c1f20" d="M36.15,24.19c0,2.56,2.08,4.64,4.64,4.64c2.56,0,4.64-2.08,4.64-4.64s-2.08-4.64-4.64-4.64 C38.23,19.55,36.15,21.63,36.15,24.19z M40.79,21.02c1.75,0,3.17,1.42,3.17,3.17s-1.42,3.17-3.17,3.17s-3.17-1.42-3.17-3.17 S39.04,21.02,40.79,21.02z"></path><path fill="#1c1f20" d="M52.5,28.83c2.56,0,4.64-2.08,4.64-4.64s-2.08-4.64-4.64-4.64s-4.64,2.08-4.64,4.64S49.95,28.83,52.5,28.83z M52.5,21.02c1.75,0,3.17,1.42,3.17,3.17s-1.42,3.17-3.17,3.17s-3.17-1.42-3.17-3.17S50.75,21.02,52.5,21.02z"></path><path fill="#1c1f20" d="M38.83,50c-4.01,3.66-9.21,5.68-14.64,5.68c-4.53,0-8.87-1.38-12.56-4c-0.21-0.15-0.48-0.18-0.72-0.07 L2.9,55.1l2.83-9.21c0.06-0.2,0.03-0.42-0.08-0.6c-2.09-3.4-3.19-7.32-3.19-11.34c0-8.94,5.38-16.86,13.71-20.17 c0.38-0.15,0.56-0.58,0.41-0.95c-0.15-0.38-0.58-0.56-0.95-0.41C6.74,15.96,1,24.41,1,33.95c0,4.17,1.12,8.25,3.24,11.82 l-3.2,10.42c-0.08,0.27,0,0.57,0.21,0.76c0.14,0.12,0.31,0.19,0.49,0.19c0.1,0,0.2-0.02,0.29-0.06l9.1-3.98 c3.86,2.64,8.37,4.04,13.07,4.04c5.8,0,11.35-2.15,15.63-6.06c0.3-0.27,0.32-0.74,0.05-1.03C39.59,49.75,39.13,49.72,38.83,50z"></path></g>
</svg>
          <span>Chat <br></br>Nexus</span></div>
         <div className="svgimage"> <Svg/> </div>
      <form onSubmit={(e)=>handlesubmit(e)}>
        <h1 className="signuptitle">get started!</h1>
        <span className="signupconnect">to get connected please enter your details</span>
        <label class="profilelab">
        <FileBase64
        type="file"
        onDone={handlephoto}
      />
      <div className="photoupload" style={{ position: "relative",left:"75px" }}>
        {values.photo ? (
          <img src={values.photo} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "250px" }} />
        ) : (
          <div
            style={{
              width: "11vh",
              height: "11vh",
              backgroundColor: "lightgray",
              borderRadius: "250px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              document.querySelector('input[type="file"]').click();
            }}
          >
           <svg height="133.441" viewBox="0 0 133.441 133.441" width="133.441" xmlns="http://www.w3.org/2000/svg"><path d="m132.441 66.72c0 16.391-6.001 31.375-15.935 42.883-12.043 13.984-29.879 22.838-49.785 22.838-19.292 0-36.633-8.309-48.656-21.54-10.598-11.677-17.065-27.166-17.065-44.181 0-36.296 29.424-65.72 65.72-65.72s65.72 29.424 65.72 65.72z" fill="#fff"/><path d="m66.72 133.441c-18.763 0-36.768-7.971-49.396-21.867-11.172-12.311-17.324-28.239-17.324-44.854 0-36.79 29.931-66.72 66.72-66.72s66.72 29.931 66.72 66.721c0 15.989-5.745 31.45-16.178 43.536-12.689 14.733-31.111 23.185-50.542 23.185zm0-131.441c-35.687 0-64.72 29.033-64.72 64.72 0 16.116 5.968 31.568 16.805 43.509 12.25 13.48 29.715 21.212 47.916 21.212 18.848 0 36.718-8.197 49.028-22.49 10.12-11.724 15.693-26.722 15.693-42.23-.001-35.688-29.035-64.721-64.722-64.721z" fill="#112c41"/><circle cx="66.722" cy="51.969" fill="#9797f7" r="26.881"/><path d="m116.506 109.603c-12.043 13.984-29.879 22.838-49.785 22.838-19.292 0-36.633-8.309-48.656-21.54 9.171-14.568 27.958-24.551 49.647-24.551 21.035 0 39.347 9.398 48.795 23.254z" fill="#9797f7"/><path d="m66.72 133.441c-18.763 0-36.768-7.971-49.396-21.867-11.172-12.311-17.324-28.239-17.324-44.854 0-36.79 29.931-66.72 66.72-66.72s66.72 29.931 66.72 66.721c0 15.989-5.745 31.45-16.178 43.536-12.689 14.733-31.111 23.185-50.542 23.185zm0-131.441c-35.687 0-64.72 29.033-64.72 64.72 0 16.116 5.968 31.568 16.805 43.509 12.25 13.48 29.715 21.212 47.916 21.212 18.848 0 36.718-8.197 49.028-22.49 10.12-11.724 15.693-26.722 15.693-42.23-.001-35.688-29.035-64.721-64.722-64.721z" fill="#112c41"/></svg>
          </div>
          
        )}
      </div>
      <div style={{ marginTop: "1vh",marginBottom:"1vh",fontSize:"1.6vh" }}>
        Please upload your profile picture
      </div>
        </label>
        <label class="emaillab">
        <input type="text" placeholder="username" name="username" onChange={(e)=> handlechange(e)}/>
        <CiUser className="usericon"/>
        </label>
        <label class="emaillab">
        <input type="email" placeholder="email" name="email" onChange={(e)=> handlechange(e)}/>
        <CiMail className="mailicon"/>
        </label>
        <label class="emaillab">
        <input type={inputType} placeholder="Password" name="password" onChange={(e)=> handlechange(e)}/>
        <CiLock className="passicon"/>
        <button  onClick={handleTypeChange} className="showpassword">{<FaEye className="eyeicon" />}</button>
        </label>
        <label class="emaillab">
        <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={(e)=> handlechange(e)}/>
        <CiLock className="passicon"/>
        </label>
        <button type="submit">create account</button>

        <span>already have account? <Link to="/login" style={{color: ' #01E1E6', textDecoration: 'none'}}>login here</Link></span>
       </form>
    </div>
   )
}

export default Signuppage