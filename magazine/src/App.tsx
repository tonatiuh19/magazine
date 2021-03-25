import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Science from './components/Science/Science';
import {Navbar, Nav, Button, Form, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './components/Posts/Posts';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Profile from './components/Posts/Profile';
import {getPostsTypes} from './apiFunctions/apiFunctions';
import Loading from './resources/Loading/Loading';
import NewProfile from './components/Posts/NewProfile';
import Sports from './components/Sports/Sports';
import Videogames from './components/Videogames/Videogames';
import Music from './components/Music/Music';
import Movies from './components/Movies/Movies';
import Technology from './components/Technology/Technology';
import Culture from './components/Culture/Culture';
import Anime from './components/Anime/Anime';
import Logo from './resources/images/Logo/logo.png';
function App() {
  const [loading, setLoading] = useState(true);
  const [postsTypes, setPostsTypes] = useState([]);

  useEffect(() => {
    getPostsTypes().then((y) => {
      setPostsTypes(y);
  }).finally(() => setLoading(false));
  }, []);

  const removeAccents = (str:any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  function decode_utf8(s:any) {
    return decodeURIComponent(escape(s));
  }

  return (
    <div className="App">
      {loading ? (<div id="outer" className="container">
        <div id="inner" className="row">
          <div className="col-12 text-center">
            <Loading></Loading>
          </div>   
        </div>
      </div>): 
      (
        <>

        <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
          <Navbar.Brand><Link to="/"><Image src={Logo} width="150" fluid /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {postsTypes.map((x:any, index:number) =>{
                  return (<Nav.Link key={index} href={"/"+removeAccents(x.name.toLowerCase())+"/"}>{decode_utf8(x.name)}</Nav.Link>);
              })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="flex-shrink-0 main-container content">
          <main>
            <Router>
              <Switch>
                <Route exact path='/' component={Main} />
                <Route path="/creatives" component={Posts} />
                <Route path="/holaCreativo" component={NewProfile} />
                <Route path="/profile" component={Profile} />
                <Route path="/ciencia" component={Science} />
                <Route path="/deportes" component={Sports} />
                <Route path="/videojuegos" component={Videogames} />
                <Route path="/musica" component={Music} />
                <Route path="/cine" component={Movies} />
                <Route path="/tecnologia" component={Technology} />
                <Route path="/cultura" component={Culture} />
                <Route path="/anime" component={Anime} />
              </Switch>    
            </Router>
          </main>
        </div>
        <Footer></Footer>
      </>
      )
    }
      
    </div>
  );
}

export default App;
