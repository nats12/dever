import React, { Component, useState } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';

interface IProps {
}

interface IState {
  release?: string;
  data?: object[];
}

export class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
}

  componentDidMount = () => {
    let url = `https://api.github.com/repos/facebook/react/tags`;
    let lastRelease;

    axios.get(url, {headers: {'Authorization': "6df74f8774e1b665b3fbef4e0d116386cf915d73"}})
      .then((response: any) => {
          console.log(response.data);
          lastRelease = response.data[0].name.substr(1);

          if(this.state.release != lastRelease) {
            this.setState({
              release: lastRelease
            });
          } 
      })
      .catch((error: any) => {
          console.log(error);
      });

      
      
  }
  
  render () {
    console.log(this.state.release);
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
