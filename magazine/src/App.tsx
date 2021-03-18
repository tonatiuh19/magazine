import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from './components/Login/Login';
import Science from './components/Science/Science';
import {Navbar, Nav, Button, Form, FormControl, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './components/Posts/Posts';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
const history = createBrowserHistory();
function App() {
  
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Buscar..." className="mr-sm-2" />
          <Button variant="outline-info">Buscar</Button>
        </Form>
        
      </Navbar>
      <div className="flex-shrink-0 main-container content">
        <Router>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path="/creatives" component={Posts} />
            <Route path="/ciencia" component={Science} />
          </Switch>    
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;