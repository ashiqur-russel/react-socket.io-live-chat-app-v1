import React,{useState} from 'react';
import './App.css';
import Chat from './Chat.js'
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName,setuserName]= useState("")
  const [room,setRoom]= useState("")
  const [showChat,setShowChat]= useState(false)

  const joinRoom =(e)=>{
    e.preventDefault();

    if(userName !=="" && room !==""){
      socket.emit("join_room",room);
      setShowChat(true)
      console.log("User Connected ",socket.id)
      console.log("Room : ",room)
    }
    
  }
  
  return (
    <div className="App">
      {     
        !showChat ? 
            ( <div className="joinChatContainer"> 
          <h3>Join a chat</h3>
          <input type="text" placeholder='Username' onChange={(e)=>setuserName(e.target.value)}></input>
          <input type="text" placeholder='Room id' onChange={(e)=>setRoom(e.target.value)}></input>
          <button type="submit" onClick={joinRoom}>Join a room</button>
          </div>  )
        : 
        
          (<Chat socket={socket} username={userName} room={room}/>)
      }
    </div>
  );
}

export default App; 
