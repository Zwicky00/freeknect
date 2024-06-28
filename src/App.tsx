import React, { useState } from 'react';
import './App.css';
import { userDataType } from './types/user';
import Login from './components/Login';
import Sidebar from './components/Sidebar';



const initialState : userDataType = {
  name: '',
  email: '',
  picture: ''
}
function App() {
  const [user,setUser] = useState<userDataType>(initialState)

  const updateUserState = (data : Record<string, string>) => {
    setUser({
      name : data.name,
      email : data.email,
      picture : data.picture,
    });
  };

  if (user.email === ''){
    return <Login handleUser={updateUserState}/>;
  }
  else {
    console.log('User State', user);
    return (
      <>
        <Sidebar 
          user = {user}
        />
      </>
    );
  }
}

export default App;
