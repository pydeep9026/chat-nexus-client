import { useEffect } from "react"
import { useState } from "react"
import './contacts.css'
import { CiSearch } from 'react-icons/ci';
import axios from "axios";




export default function Contacts({contacts,currentuser,chatchange}){
    const [currentusername,setcurrentusername]=useState(undefined)
    const [currentselected,setcurrentselected]=useState(undefined)
    const [searchInput, setSearchInput] = useState('');
  const [filteredArray, setFilteredArray] = useState('');
  const [connectionCount, setConnectionCount] = useState(0);



  /*useEffect(() => {
    const interval = setInterval(() => {
      axios.get(connectionsroute)
        .then(res => setConnectionCount(res.data.connectionCount))
        .catch(err => console.log(err));
    }, 100);
  
    return () => clearInterval(interval);
  }, [contacts]);

  console.log(connectionCount);*/


  
  const handleSearch = event => {
    setSearchInput(event.target.value);
    setFilteredArray(
      contacts.filter(person =>
        person.username.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
   

    useEffect(()=>{
        if(currentuser){
            setcurrentusername(currentuser.username)
        }
    },[currentuser,contacts])     
    const changecurrentchat=(index,contact)=>{
      setcurrentselected(index)
      chatchange(contact)
    }


    return<>
      { 
        currentusername && (
            <>
            
            <div  className="search"> 
            <h1>Chat</h1>  
            <svg height="60.803" viewBox="0 0 1169.391 260.803" width="269.391" xmlns="http://www.w3.org/2000/svg"><rect fill="#cbc8ff" height="231.003" rx="35.423" width="1138.509" y="29.8"/><rect fill="#fff" height="231.003" rx="35.423" width="1138.509" x="29.882" y="1"/><path d="m1132.968 233.003h-1067.662c-20.084 0-36.423-16.34-36.423-36.424v-160.155c-.001-20.084 16.339-36.424 36.423-36.424h1067.662c20.084 0 36.423 16.34 36.423 36.424v160.155c0 20.084-16.34 36.424-36.423 36.424zm-1067.662-231.003c-18.981 0-34.423 15.442-34.423 34.424v160.155c0 18.981 15.442 34.424 34.423 34.424h1067.662c18.981 0 34.423-15.442 34.423-34.424v-160.155c0-18.981-15.442-34.424-34.423-34.424z" fill="#112c41"/><path d="m891.398 1h240.986c19.873 0 36.007 16.134 36.007 36.007v158.989c0 19.873-16.134 36.007-36.007 36.007h-240.986z" fill="#dedffe"/><path d="m1132.384 233.003h-240.986c-.552 0-1-.447-1-1v-231.003c0-.553.448-1 1-1h240.986c20.406 0 37.007 16.602 37.007 37.007v158.989c0 20.405-16.601 37.007-37.007 37.007zm-239.986-2h239.986c19.303 0 35.007-15.704 35.007-35.007v-158.989c0-19.303-15.704-35.007-35.007-35.007h-239.986z" fill="#112c41"/><circle cx="1030.074" cy="116.345" fill="#fff" r="78.689"/><path d="m1030.074 196.033c-43.94 0-79.688-35.748-79.688-79.688s35.748-79.688 79.688-79.688 79.689 35.748 79.689 79.688-35.748 79.688-79.689 79.688zm0-157.377c-42.838 0-77.688 34.851-77.688 77.688s34.851 77.688 77.688 77.688 77.689-34.851 77.689-77.688-34.851-77.688-77.689-77.688z" fill="#112c41"/><ellipse cx="1030.074" cy="116.345" fill="#fff" rx="43.475" ry="78.689"/><g fill="#112c41"><path d="m1030.074 196.033c-24.524 0-44.475-35.748-44.475-79.688s19.952-79.688 44.475-79.688 44.475 35.748 44.475 79.688-19.952 79.688-44.475 79.688zm0-157.377c-23.421 0-42.475 34.851-42.475 77.688s19.054 77.688 42.475 77.688 42.475-34.851 42.475-77.688-19.054-77.688-42.475-77.688z"/><path d="m1029.652 195.542c-.552 0-1-.447-1-1v-156.834c0-.553.448-1 1-1s1 .447 1 1v156.834c0 .553-.448 1-1 1z"/><path d="m1098.568 156.001h-137.021c-.552 0-1-.447-1-1s.448-1 1-1h137.021c.552 0 1 .447 1 1s-.448 1-1 1z"/><path d="m1108.271 116.052h-156.428c-.552 0-1-.447-1-1s.448-1 1-1h156.428c.552 0 1 .447 1 1s-.448 1-1 1z"/><path d="m1096.748 76.103h-133.989c-.552 0-1-.447-1-1s.448-1 1-1h133.989c.552 0 1 .447 1 1s-.448 1-1 1z"/></g></svg>
            <input type="text" name="search" onChange={handleSearch} value={searchInput} placeholder="search username"/>
            </div>

      <div className="searchresult">
      {
       filteredArray==='' ?
       contacts.map((contact,index)=>(
        <div 
        className={`contact ${index===currentselected?"selected":""}`}
        onClick={()=>changecurrentchat(index,contact)}
        > 
         <img src={contact.photo}/>
              <div className="diplayedusername">
                {contact.username} 
                </div> 
            </div>
  ))
       :filteredArray.map((contact,index)=>(
        <div 
        className={`contact ${index===currentselected?"selected":""}`}
        onClick={()=>changecurrentchat(index,contact)}
        > 
         <img src={contact.photo}/>
              <div className="diplayedusername">
                {contact.username} 
                </div> 
            </div>
       ))
       }
      </div>


       </> )
    }
    </>


}
