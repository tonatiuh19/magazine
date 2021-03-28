import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Science from './components/Science/Science';
import {Navbar, Nav, Image} from 'react-bootstrap';
import './styles/navBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './components/Posts/Posts';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Profile from './components/Posts/Profile';
import {getPostsTypesNavBar} from './apiFunctions/apiFunctions';
import Loading from './resources/Loading/Loading';
import NewProfile from './components/Posts/NewProfile';
import Sports from './components/Sports/Sports';
import Videogames from './components/Videogames/Videogames';
import Music from './components/Music/Music';
import Movies from './components/Movies/Movies';
import Technology from './components/Technology/Technology';
import Culture from './components/Culture/Culture';
import Anime from './components/Anime/Anime';
import LogoWhite from './resources/images/Logo/logo_white.png';
import LogoBlack from './resources/images/Logo/logo_black.png';

function App() {
  const [loading, setLoading] = useState(true);
  const [postsTypes, setPostsTypes] = useState([]);
  const [navBarTheme, setNavBarTheme] = useState<any>("dark");
  const [logo, setLogo] = useState(LogoWhite);


  useEffect(() => {
    getPostsTypesNavBar().then((y) => {
      setPostsTypes(y);
  }).finally(() => setLoading(false));
  }, []);

  const listener = () => {
    if(-document.body.getBoundingClientRect().top > 400){
      setNavBarTheme("light");
      setLogo(LogoBlack);
    }else{
      setNavBarTheme("dark");
      setLogo(LogoWhite);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

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

        <Navbar bg={navBarTheme} variant={navBarTheme} fixed="top" expand="lg">
          <Navbar.Brand className="ms-2"><Link to="/"><Image src={logo} width="150" fluid /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto fontBold fw-bolder">
              {postsTypes.map((x:any, index:number) =>{
                  return (<Nav.Link key={index} className="socialNetworkPost rounded" href={"/"+removeAccents(decode_utf8(x.name.replace(/\s/g, '')).toLowerCase())+"/"}>{decode_utf8(x.name)}</Nav.Link>);
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
                <Route path="/ciencia/:id/:titulo" component={Science} />
                <Route path="/deportes/:id/:titulo" component={Sports} />
                <Route path="/videojuegos/:id/:titulo" component={Videogames} />
                <Route path="/musica/:id/:titulo" component={Music} />
                <Route path="/cineytv/:id/:titulo" component={Movies} />
                <Route path="/tecnologia/:id/:titulo" component={Technology} />
                <Route path="/cultura/:id/:titulo" component={Culture} />
                <Route path="/anime/:id/:titulo" component={Anime} />
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
