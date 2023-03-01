import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Contacts from './contacts'
import './style.css'
import { allusersroute, host } from '../../utils/apiroutes'
import contactload from './contactload.gif'
import Header from './header'
import Welcome from './CHATBOX/nochat'
import Chat from './CHATBOX/chat'
import { io, Socket } from 'socket.io-client'

 
const Chatmenu=()=>{     
    const navigate=useNavigate()  
    const [contacts,setcontacts]=useState([])
    const [currentuser,setcurrentuser]=useState(undefined)
    const [currentusername,setcurrentusername]=useState(undefined)
    const [currentuserimage,setcurrentuserimage]=useState(undefined)
    const [currentuseremail,setcurrentuseremail]=useState(undefined)
    const [currentchat,setcurrentchat]=useState(undefined)
    const [loading, setLoading] = useState(true);



    useEffect( ()=>{   
        async function setuserfunc(){
        if (!localStorage.getItem("chat-nexus-user")){
            navigate("/login") 
        }else{ 
              
            setcurrentuser(await JSON.parse(localStorage.getItem("chat-nexus-user")))
        }
    }   
    setuserfunc()
    },[])

    useEffect(()=>{
      if(currentuser){
        Socket.current=io(host)
        Socket.current.emit("add-user",currentuser._id)
      }
    },[currentuser])

    useEffect(() => {
        setcontactfunc(); 
      }, [currentuser]);
  
      

    async function setcontactfunc() {
        if (currentuser) {
          try {
          const response = await axios.get(`${allusersroute}/${currentuser._id}`);
          setcontacts(response.data);
          setcurrentusername(currentuser.username)
          setcurrentuserimage(currentuser.photo)
          setcurrentuseremail(currentuser.email)
        }catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
        } else {;
        }
      }

      const handlechatchange=(chat)=>{
        setcurrentchat(chat)
      }





    return(
        <div className="chatcontainer">
          {
            loading && <div className='contactbody'>
              <img src={contactload} alt='loader' />
            </div>
          }
          
        <Header className="headersect" currentusername={currentusername} currentuserimage={currentuserimage} currentuseremail={currentuseremail}/>
        <Contacts className="searchresult" contacts={contacts} chatchange={handlechatchange} currentuser={currentuser}/>
        {
          currentchat===undefined?
          <Welcome/>:
          <Chat  className="chatpage" currentchat={currentchat} currentuser={currentuser}  Socket={Socket} />
        }
        </div>

    )
}

export default Chatmenu