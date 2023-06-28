import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth//Register';
import { ToastContainer } from 'react-toastify';
import { Hobby } from './Hobbies/Hobby';
import { Suggestion } from './Suggestions/Suggestion';
//import { Navigation } from './Navigation';
import AppHeader from './AppHeader';
import { User } from './AdminControl/User';
import { UserProfile } from './UserProfile';


//import Customer from './Customer';


function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
    
      <AppHeader></AppHeader>
      <Routes>

        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/hobby' element={<Hobby/>}></Route>
        <Route path='/suggestion' element={<Suggestion/>}></Route>
        <Route path='/users' element={<User/>}></Route>
        <Route path='/settings' element={<UserProfile/>}></Route>
        
       
       
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;

/* <Appheader></Appheader>
  <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/customer' element={<Customer/>}></Route>
*/