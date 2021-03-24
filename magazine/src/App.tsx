import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Science from './components/Science/Science';
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './components/Posts/Posts';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Profile from './components/Posts/Profile';
import {getPostsTypes} from './apiFunctions/apiFunctions';
import Loading from './resources/Loading/Loading';
import NewProfile from './components/Posts/NewProfile';
function App() {
  document.title = 'Agustirri';
  const [loading, setLoading] = useState(true);
  const [postsTypes, setPostsTypes] = useState([]);

  useEffect(() => {
    getPostsTypes().then((y) => {
      setPostsTypes(y);
  }).finally(() => setLoading(false));
  }, [])

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
          <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Nav className="mr-auto">
            {postsTypes.map((x:any, index:number) =>{
                return (<Nav.Link key={index} href="/creatives">{x.name}</Nav.Link>);
            })}
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Buscar..." className="mr-sm-2" />
            <Button variant="outline-info">Buscar</Button>
          </Form> */}
          
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
