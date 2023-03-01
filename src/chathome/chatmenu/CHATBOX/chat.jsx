import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from "axios";
import Chatinput from './chatinput';
import {v4 as uuidv4} from "uuid"
import {AiOutlineInfoCircle} from "react-icons/ai"
import {ImProfile} from "react-icons/im"
import {MdDeleteOutline,MdReport} from "react-icons/md"
/*import { getallmessageroute, sendmessageroute,deletechatroute, reportroute} from '../../../utils/apiroutes';*/
import { getallmessageroute } from '../../../utils/apiroutes';
import { sendmessageroute } from '../../../utils/apiroutes';
import { deletechatroute } from '../../../utils/apiroutes';
import { reportroute } from '../../../utils/apiroutes';
import Deletechatsvg from './deletechatsvg';
import Reportsvg from './reportsvg';
import './chat.css';

 



export default function Chat({currentchat,currentuser,Socket}) {
  const[messages,setmessages]=useState([])
  const[arrivalmessage,setarrivalmessage]=useState(null)
  const [displaydelete,setdisplaydelete]=useState(false)
  const [displayreport,setdisplayreport]=useState(false)
  const [displayprofile,setdisplayprofile]=useState(false)
  const [reason, setreason] = useState('');
  const scrollRef=useRef();
  const prevMessageCount = useRef(0);
  const [formattedDate, setFormattedDate] = useState('');


  useEffect(() => {
    const createdAtDate = new Date(currentchat.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    setFormattedDate(formattedDate);
    toast.dismiss()
  }, [currentchat]);

  


  



  

  const dispalydeletefunc=()=>{
    setdisplaydelete(true)
  }

  const dispalyreportfunc=()=>{
    setdisplayreport(true)
  }


  useEffect( ()=>{   
    if(currentchat){
    async function setuserfunc(){
    const response=await axios.post(getallmessageroute,{
      from:currentuser._id,
      to:currentchat._id,
    })
    setmessages(response.data)
  }
  setuserfunc()
    }

},[currentchat,messages])



  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(reason!==''){
          const {data}=await axios.post(reportroute,{
            reportsenderusername:currentuser.username,
            reportrecieverusername:currentchat.username,
            reportsenderid:currentuser._id,
            reportreceiverid:currentchat._id,
            reportreason:reason,
          })
          console.log(`Report submitted with reason: ${reason}`);
          toast.success("user reported successfully!!")
          setdisplayreport(false)
          setreason('')
        }else{
          toast.error(`You must give a reason for reporting ${currentchat.username}`);
        }
  }
  function handleReasonChange(e) {
    setreason(e.target.value);
  }


  function downloadimage() {
    const base64Image = `${currentchat.photo}`;
    const img = document.createElement('img');
    img.src = base64Image;
    
    const link = document.createElement('a');
    link.download = `${currentchat.username}.png`;
    link.href = img.src;
    link.click();
  }
  










  const handlesendmsg=async (msg)=>{
    await axios.post(sendmessageroute,{
      from:currentuser._id,
      to:currentchat._id,
      message:msg,
    })
    Socket.current.emit("send-msg",{
      from:currentuser._id,
      to:currentchat._id, 
      message:msg,
    })
  

    const msgs=[...messages]
    msgs.push({fromself:true,message:msg})
    setmessages(msgs)
  }
  useEffect(()=>{
    if(Socket.current){
      Socket.current.on("msg-recieve",(msg)=>{
        setarrivalmessage({fromself:false,message:msg})
      })
    }
  },[])

  useEffect(()=>{
    arrivalmessage && setmessages((prev)=>[...prev,arrivalmessage])
  },[arrivalmessage])






  useEffect(()=>{
    const currentMessageCount = messages.length
    if (currentMessageCount > prevMessageCount.current) {
      scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    }
    prevMessageCount.current = currentMessageCount;
    
  },[messages])


  const to=currentchat._id
  


    const [isOpen, setIsOpen] = useState(false);
    const [isslideOpen, setIsslideOpen] = useState(false);


    useEffect(() => {
        function handleClickOutside(event) {
          if (!event.target.closest(".chatheadermenu")) {
            setIsOpen(false);
          }
        }
    
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);

      

      const deletechat= async (to)=>{
        toast.success("all chats deleted with this user")
        setdisplaydelete(false)
        try {
          const response = await axios.delete(`${deletechatroute}${to}`);
          console.log("User )deleted");
        } catch (error) {
          console.error(error);
        } 
      }


      

  return (
    <>
    <Toaster/>
    <div className="chatpage">
        <div className="chatheader">
            <img onClick={() => setIsslideOpen(!isslideOpen)} src={currentchat.photo}/>
            <span>{currentchat.username}</span>
            <div>
                <div className='chatheadermenu'>
      <div onClick={() => setIsOpen(!isOpen)}>
        <span>
          &#8942;
        </span>
      </div>
      {isOpen && (
        <ul>
          <li onClick={() => setIsslideOpen(!isslideOpen)}>View Profile</li>
          <li onClick={() => setdisplayprofile(true)}>View Profile Pic</li>
          <li onClick={dispalydeletefunc} >Delete Chat</li>
          <li onClick={dispalyreportfunc} style={{color:"red"}}>Report User</li>
        </ul>
      )}
    </div>
    </div>
        </div>
        
        <div className="menu-container">


          { displayreport && 
          <div className='reportpopup'>
          <div className="reportcard">
        <h3>Report {currentchat.username}</h3>
        <p>Please provide a reason for reporting:</p>
        <textarea style={{ maxWidth: '300px',fontFamily:"serif",fontSize:"16px", maxHeight: '60px', border: '1px solid #ccc', padding: '10px' }} value={reason} onChange={handleReasonChange} />
        <p className="warning">Only report users that violate community guidelines.</p>
        <Reportsvg/>
        <div className="buttons">
          <button className='buttonyes' onClick={handleSubmit}>Yes, report</button>
          <button className='buttonno' onClick={() => setdisplayreport(false)}>No, don't report</button>
        </div>
      </div>
      </div>
          }

       {displayprofile &&
          <div className='displayprofilepopoup'>
            <div style={{height: ' 550px',width: ' 550px'}}  className='viewprofilecard'>
            <h3>{currentchat.username}'s profile picture</h3>
          <p>Do not share this image without user's permission</p>
          <img src={currentchat.photo} alt="Profile pic"/>
          <div className='buttons'>
          <button style={{left: ' 120px',top: ' 490px'}} className='buttonyes'  onClick={()=>downloadimage()} >Download</button>
            <button style={{left: ' 340px',top: ' 490px'}} className='buttonno'  onClick={() => setdisplayprofile(false)}  >Close</button>
            </div>
            </div>
          </div>
          }

        {displaydelete &&
          <div className='deleteuserpopoup'>
            <div style={{height: ' 350px'}}  className='deletecard'>
            <h3>Are you sure you want to delete all chats with this user?</h3>
          <p>This action cannot be undone.</p>
          <div className='deletechatsvg'>
            <Deletechatsvg/>
          </div>
          <div className='buttons'>
          <button className='buttonyes' onClick={()=>deletechat(to)}  >Delete Chat</button>
            <button className='buttonno'  onClick={() => setdisplaydelete(false)}  >No, don't delete</button>
            </div>
            </div>
          </div>
          }
      <nav className={`menu ${isslideOpen ? 'open' : ''}`}>
      <div className="menulogo">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="40" height="40"
viewBox="0 0 64 64">
<path fill="#fde080" d="M5.03,45.43c-2.09-3.41-3.3-7.42-3.3-11.72c0-12.4,10.05-22.46,22.46-22.46c12.4,0,22.46,10.05,22.46,22.46 c0,12.4-10.05,22.46-22.46,22.46c-4.84,0-9.32-1.54-12.98-4.14l-9.47,4.14L5.03,45.43z"></path><path fill="#84e1e6" d="M58.97,35.67c2.09-3.41,3.3-7.42,3.3-11.72c0-12.4-10.05-22.46-22.46-22.46c-12.4,0-22.46,10.05-22.46,22.46 c0,12.4,10.05,22.46,22.46,22.46c4.84,0,9.32-1.54,12.98-4.14l9.47,4.14L58.97,35.67z"></path><circle cx="29.07" cy="23.95" r="3.91" fill="#edf7f9"></circle><circle cx="40.79" cy="23.95" r="3.91" fill="#edf7f9"></circle><circle cx="52.5" cy="23.95" r="3.91" fill="#edf7f9"></circle><g><path fill="#1c1f20" d="M57.38,61.53H43.72c-0.4,0-0.73,0.33-0.73,0.73S43.31,63,43.72,63h13.67c0.4,0,0.73-0.33,0.73-0.73 S57.79,61.53,57.38,61.53z"></path><path fill="#1c1f20" d="M62.27,61.53h-1.95c-0.4,0-0.73,0.33-0.73,0.73S59.91,63,60.31,63h1.95c0.4,0,0.73-0.33,0.73-0.73 S62.67,61.53,62.27,61.53z"></path><path fill="#1c1f20" d="M1.73,14.18c0.4,0,0.73-0.33,0.73-0.73V5.64c0-0.4-0.33-0.73-0.73-0.73S1,5.23,1,5.64v7.81 C1,13.85,1.33,14.18,1.73,14.18z"></path><path fill="#1c1f20" d="M1.73,3.44c0.4,0,0.73-0.33,0.73-0.73V1.73C2.47,1.33,2.14,1,1.73,1S1,1.33,1,1.73v0.98 C1,3.11,1.33,3.44,1.73,3.44z"></path><path fill="#1c1f20" d="M11.5,6.37h1.22v1.22c0,0.4,0.33,0.73,0.73,0.73S14.18,8,14.18,7.59V6.37h1.22c0.4,0,0.73-0.33,0.73-0.73 c0-0.4-0.33-0.73-0.73-0.73h-1.22V3.69c0-0.4-0.33-0.73-0.73-0.73s-0.73,0.33-0.73,0.73v1.22H11.5c-0.4,0-0.73,0.33-0.73,0.73 C10.77,6.04,11.09,6.37,11.5,6.37z"></path><path fill="#1c1f20" d="M48.6,56.16c0.4,0,0.73-0.33,0.73-0.73v-1.22h1.22c0.4,0,0.73-0.33,0.73-0.73s-0.33-0.73-0.73-0.73h-1.22 v-1.22c0-0.4-0.33-0.73-0.73-0.73s-0.73,0.33-0.73,0.73v1.22h-1.22c-0.4,0-0.73,0.33-0.73,0.73s0.33,0.73,0.73,0.73h1.22v1.22 C47.86,55.84,48.19,56.16,48.6,56.16z"></path><path fill="#1c1f20" d="M39.81,47.38c4.69,0,9.2-1.39,13.07-4.04l9.1,3.98c0.09,0.04,0.19,0.06,0.29,0.06c0.18,0,0.35-0.06,0.49-0.19 c0.21-0.19,0.3-0.49,0.21-0.76l-3.2-10.42C61.88,32.44,63,28.36,63,24.19C63,11.4,52.6,1,39.81,1S16.62,11.4,16.62,24.19 S27.03,47.38,39.81,47.38z M39.81,2.47c11.98,0,21.72,9.75,21.72,21.72c0,4.01-1.1,7.93-3.19,11.34c-0.11,0.18-0.14,0.4-0.08,0.6 l2.83,9.21l-8.01-3.5c-0.24-0.1-0.51-0.07-0.72,0.07c-3.69,2.62-8.03,4-12.56,4c-11.98,0-21.72-9.75-21.72-21.72 S27.83,2.47,39.81,2.47z"></path><path fill="#1c1f20" d="M24.27,14.04c0.13,0.09,0.28,0.14,0.42,0.14c0.23,0,0.45-0.11,0.6-0.31c3.35-4.7,8.78-7.5,14.52-7.5 c0.4,0,0.73-0.33,0.73-0.73c0-0.4-0.33-0.73-0.73-0.73c-6.22,0-12.09,3.03-15.71,8.11C23.86,13.35,23.94,13.81,24.27,14.04z"></path><path fill="#1c1f20" d="M29.07,19.55c-2.56,0-4.64,2.08-4.64,4.64s2.08,4.64,4.64,4.64c2.56,0,4.64-2.08,4.64-4.64 S31.63,19.55,29.07,19.55z M29.07,27.36c-1.75,0-3.17-1.42-3.17-3.17s1.42-3.17,3.17-3.17s3.17,1.42,3.17,3.17 S30.82,27.36,29.07,27.36z"></path><path fill="#1c1f20" d="M36.15,24.19c0,2.56,2.08,4.64,4.64,4.64c2.56,0,4.64-2.08,4.64-4.64s-2.08-4.64-4.64-4.64 C38.23,19.55,36.15,21.63,36.15,24.19z M40.79,21.02c1.75,0,3.17,1.42,3.17,3.17s-1.42,3.17-3.17,3.17s-3.17-1.42-3.17-3.17 S39.04,21.02,40.79,21.02z"></path><path fill="#1c1f20" d="M52.5,28.83c2.56,0,4.64-2.08,4.64-4.64s-2.08-4.64-4.64-4.64s-4.64,2.08-4.64,4.64S49.95,28.83,52.5,28.83z M52.5,21.02c1.75,0,3.17,1.42,3.17,3.17s-1.42,3.17-3.17,3.17s-3.17-1.42-3.17-3.17S50.75,21.02,52.5,21.02z"></path><path fill="#1c1f20" d="M38.83,50c-4.01,3.66-9.21,5.68-14.64,5.68c-4.53,0-8.87-1.38-12.56-4c-0.21-0.15-0.48-0.18-0.72-0.07 L2.9,55.1l2.83-9.21c0.06-0.2,0.03-0.42-0.08-0.6c-2.09-3.4-3.19-7.32-3.19-11.34c0-8.94,5.38-16.86,13.71-20.17 c0.38-0.15,0.56-0.58,0.41-0.95c-0.15-0.38-0.58-0.56-0.95-0.41C6.74,15.96,1,24.41,1,33.95c0,4.17,1.12,8.25,3.24,11.82 l-3.2,10.42c-0.08,0.27,0,0.57,0.21,0.76c0.14,0.12,0.31,0.19,0.49,0.19c0.1,0,0.2-0.02,0.29-0.06l9.1-3.98 c3.86,2.64,8.37,4.04,13.07,4.04c5.8,0,11.35-2.15,15.63-6.06c0.3-0.27,0.32-0.74,0.05-1.03C39.59,49.75,39.13,49.72,38.83,50z"></path></g>
</svg>
          <span>Chat Nexus</span>
          </div>
          <h7 style={{position:"absolute",whiteSpace:"nowrap",width:"0.4vh",fontSize:"2.5vh",top:"5vh",left:"9vh"}}>User Details</h7>
      <img onClick={() => setdisplayprofile(true)} src={currentchat.photo}/>
      <span className='usernamemenu'>{currentchat.username}</span>
      <p className='joiningdate'>Joined {formattedDate}</p>
      <div className='line1'></div>
      <AiOutlineInfoCircle className='emailinfo'/>
      <div className='emailtitle'>email</div>
      <p>{currentchat.email}</p>
      <div className='line2'></div>
      <ul>
          <li onClick={() => setIsslideOpen(!isslideOpen)}><ImProfile className='profile1'/> Hide Profile</li>
          <li onClick={() => setdisplayprofile(true)}><ImProfile className='profile2'/> View profile picture</li>
          <li onClick={dispalydeletefunc} > <MdDeleteOutline className="delete"/>Delete Chat</li>
          <li onClick={dispalyreportfunc} style={{color:"red"}}><MdReport className='report'/>Report User</li>
        </ul>
      </nav>
    </div>
    <div className='messages'  >
      {
        messages.map((message)=>{
          return(
            <div   ref={scrollRef} key={uuidv4()}>
              <div   className={`message ${message.fromself?"sent":"recieved"}`}>
                  <p >
                    {message.message}
                  </p>
                  <span >{message.msgtime}</span>
              </div>
            </div>
          )
        })
      }
    </div>


    <Chatinput handlesendmsg={handlesendmsg}/>
    </div>
    </>
  )
}
