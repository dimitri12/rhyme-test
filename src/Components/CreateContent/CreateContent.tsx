/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component, ReactNode } from 'react';
import styles from './CreateContent.module.scss';
import axios from "axios";

export default class CreateContent extends Component {
    state ={id:"0",
    title: '',
    body: '',
    description: '',
    author: ''};

        initialState={id:"0",
        title: '',
        body: '',
        description: '',
        author: ''};
  public render(): ReactNode {
    //const { children } = this.props;

   const {state} = this
   const setState = (state:any) => this.setState(state)

     const handleChange = (event:any) => {
       
       switch(event.target.name) {
        case 'title': { 
            setState({ title: event.target.value });
            break; 
         } 
         case 'description': { 
            setState({ description: event.target.value });
            break; 
         } 
         case 'author': { 
            setState({ author: event.target.value });
            break; 
         } 
         case 'body': { 
            setState({ body: event.target.value });
            break; 
         } 
        }
       
        
        
        
      }
     const handleSubmit = (event:any) => {
        // store the states in the form data
        event.preventDefault();
        const articleData = new FormData();
        console.log(state)
        articleData.append("title", state.title)
        articleData.append("author", state.author)
        articleData.append("description", state.description)
        articleData.append("body", state.body)
        
        try {
          // make axios post request
          axios.post("http://localhost:3001", {
            
            id:state.id,
            title: state.title,
            author: state.author,
            description: state.description,
            body: state.body,

          
          });
          setState({ title: '', description: '', author: '', body: ''});
        } catch(error) {
          console.log(error)
        }
      }
    return (
      <div className={styles.wrapper}>

       {/* <div className={styles.layout}>{children}</div>*/} 
       <form onSubmit={handleSubmit}>
       <h3>Submit an article</h3>
       <p>Title</p>
       <input type="text" name="title" value={state.title} onChange={handleChange} /><br/>
       <p>Author</p>
       <input type="text" name="author" value={state.author} onChange={handleChange}/><br/>
       <p>Description</p>
       <input type="text" name="description" value={state.description} onChange={handleChange}/><br/>
       <p>Text</p>
       <textarea  name="body" value={state.body} onChange={handleChange}/><br/>
       <button
        type="submit"
      >
        Submit
      </button>
       </form>
      </div>
    );
  }
}