import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import CreateContent from "./Components/CreateContent/CreateContent";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createArticle">Create</Link>
          </li>

        </ul>

  
        <Routes>
          <Route path="/" element={<Home />} />
            
          
          <Route path="/createArticle" element={ <Create />}/>
           
      
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="App">
      <Layout>
        <Header text={"Rhyme articles"} />
        <Content />
      </Layout>
    </div>
  );
}

function Create() {
  return (
    <div className="Create">
      <Layout>
        <Header text={"Create rhyme articles"} />
        <CreateContent />
      </Layout>
    </div>
  );
}

export default App;
