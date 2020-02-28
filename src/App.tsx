import React, { Component, useState } from 'react';
import axios from 'axios';
import './App.css';

interface IState {
  reactReleases: string[];
  reactLatest: string;
  // laravelReleases: string[];
  // laravelLatest: string;
  reactDatabase: string;
}

export class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      reactReleases: [],
      reactLatest: "",
      // laravelReleases: [],
      // laravelLatest: "",
      reactDatabase: ""
    };
  }

  componentDidMount = () => {
    const reactURL = `https://api.github.com/repos/facebook/react/tags`;
    const laravelURL = `https://api.github.com/repos/laravel/laravel/tags`;
    const reactAPIURL = `http://localhost:8000/api/frameworks/`;

    const requestOne = axios.get(reactURL);
    const requestTwo = axios.get(laravelURL);
    const requestThree = axios.get(reactAPIURL);

    axios.all([requestOne, requestTwo, requestThree])
    .then(axios.spread((...responses) => {
      
      this.setState({
        reactReleases: responses[0].data.map((version: any) => version.name),
        // laravelReleases: responses[1].data.map((version: any) => version.name),
        reactDatabase: responses[2].data[0].version
      })

    }))
    .then(() => {

      this.setState({
        reactLatest: this.latestVersion(this.state.reactReleases),
        // laravelLatest: this.latestVersion(this.state.laravelReleases),
      })

      if(this.state.reactDatabase < this.state.reactLatest) {
        const version = this.state.reactLatest;
        const data = {
          name: 'react',
          version
        }

        const axiosConfig = {
          headers:{
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
              "Authorization" : `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9URTJOemRDT1RVNE9FTkJSRE5CT1RSRE9FWTVOVGREUTBKRk1EZ3pRMFE0T1RjNE9UUkRNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi0yaGI3YW5qbC5ldS5hdXRoMC5jb20vIiwic3ViIjoiRzBQQ3RlRmFiOE40TzM1THVDVG9CbXFUOGU2MEFJVDlAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8iLCJpYXQiOjE1ODI5MjQzNTMsImV4cCI6MTU4MzAxMDc1MywiYXpwIjoiRzBQQ3RlRmFiOE40TzM1THVDVG9CbXFUOGU2MEFJVDkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.sWRbFsVtTz3DgPQqL2suOlFdSu2_uqIvck7sM_3L50HwWuuQ2na_xJhoX940AS96mICPrm5OJtvh_Qy55gTUAD06BIqL5CnmzcPl5rNnzPif8z9ecTlkrmUEF863dTeTURdnSvfzzoAR7Wi4wNoGdvQQDBJBcWSRaVVHHYJil-0RJCoWCDUA_4DX3JaGER5G_JLFlWFXhiPJn5Yen5yci39ZJXFJ6Ei9ssDyVG2VEKjUca4geD0dmt4BRwVlzRCRgKnn4w8fug-stdlgJFNmVc9C7NUiMPhSaJgc-0z99rBQG5Kr6Y0RP1h_pUSpkv-V4iZPmURBySpJabcDDj6How`
          }
        }
        
        axios.put(`${reactAPIURL}react`,  data, axiosConfig)
        .then((response: any) => console.log(response.status))
        .catch((error: any) => console.log(error));
      }

    }).catch((error: any) => {
      console.log(error);
    })

  }

  cmpVersionDesc = (a: any, b: any) => {
    const as = a.split('.').map(Number)
    const bs = b.split('.').map(Number)

    return (bs[0]||0) - (as[0]||0)
        || (bs[1]||0) - (as[1]||0)
        || (bs[2]||0) - (as[2]||0)
  }

  latestVersion = (versions: any) => { 
    return [...versions].sort(this.cmpVersionDesc)[0]
  }
  
  render () {
  
    

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          {/* Use timestamps here from when versions updated to add cap on when its a new one */}
          { this.state.reactLatest !== "v16.11.0" ? ( <p>NEW REACT UPDATE! Latest found: {this.state.reactLatest}</p>) : ('') }
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
