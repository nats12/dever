import React, { Component, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import './App.css';
import { Framework } from './Framework';

const reactAPIURL = `http://localhost:8000/api/frameworks/`;
const bearerToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9URTJOemRDT1RVNE9FTkJSRE5CT1RSRE9FWTVOVGREUTBKRk1EZ3pRMFE0T1RjNE9UUkRNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi0yaGI3YW5qbC5ldS5hdXRoMC5jb20vIiwic3ViIjoiRzBQQ3RlRmFiOE40TzM1THVDVG9CbXFUOGU2MEFJVDlAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8iLCJpYXQiOjE1ODQxMzg3MzcsImV4cCI6MTU4NDIyNTEzNywiYXpwIjoiRzBQQ3RlRmFiOE40TzM1THVDVG9CbXFUOGU2MEFJVDkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.O7dVbEYHDvT2rW8bW34kZg_b3rt2F1VbhEjIutBxXTfQYoWnA63witVY68rUgE0zjX2dDOo4GfcAsBCujGSNUi3m9xNBTwqAvB9bdRLwpWn1GZMbHYmkHQzZ0orS_J4Hjq2CqC_Z4lzgNKkA5jq0WOgG-F89T1nDCOhnCOaEkXHmLi0IC9Eo5CGOPzwQQ4diwPkmvcCSziKUn8fvPyyLFJrxejUtkF9vnXJgNOVNje6OzPTWwB6IU0RW5VfccN29D06Hu5v9y37DaV8Q7Izq4cmmxSXXSNcSdhqF_Lu2llGEPoKn-6bOeUBViscBGQNTbR1TzmUJUvDQepfljwUhiQ`;
const githubToken = `35e199fe5618e8a6c21727a4304d0a482cc4db4f `;

interface IPreviousState {
  previousState: any;
}

interface IProps {
  data?: any;
}

interface IState {
  reactLatest: any
}

const tenDaysAgo = new Date();
tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

let previousState: IPreviousState;

/**
 * 
 */
export class App extends Component<IProps, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      reactLatest: {}
    };
    
  }

  /**
   * 
   */
  componentDidMount = () => {

    const reactURL = `https://api.github.com/repos/facebook/react/tags`;
    const laravelURL = `https://api.github.com/repos/laravel/laravel/tags`;
  
    const requestOne = axios.get(reactURL, { auth: { username: "nats12", password: "Sovaquera369"}});
    // const requestTwo = axios.get(laravelURL, { headers: { "Authorization": "token " + githubToken }});
    const requestThree = axios.get(reactAPIURL);

    axios.get(reactAPIURL)
      .then((response) => {

        // Fetch currently saved version from DB
        const reactDatabaseVersion = response.data.filter((f: any) => f.name === "react");
     
        // Set to state
        this.setState({
          reactLatest: reactDatabaseVersion[0]
        })

        // Set global 'previousState' to this state
        previousState = this.state.reactLatest; 
        
        // Now fetch all releases from Github.
        axios.all([requestOne])
          .then(axios.spread((...responses) => {
            
            const regex = /[/](react)[/]/g;

            // Match react releases.
            const reactGitHubReleases = responses.map((r: any) => 
               r.data.filter((f: any) => { 
                 return f.zipball_url.match(regex)
                } 
            ));

            // Of all react releases, find the latest one
            // Give it an updated_at property with today's date
            const reactLatestRelease = this.findLatestVersion(reactGitHubReleases.filter((r: any) => r.length > 0));
            reactLatestRelease.updated_at = new Date();
            // Change it's object key name to version to match DB column
            reactLatestRelease.version = reactLatestRelease.name;
            delete reactLatestRelease.name;

            // Update only if the new release version is greater than the current one i.e. DB.
        
            if(reactLatestRelease.version > this.state.reactLatest.version) {
              
              this.setState((prevState, props) => ({
                reactLatest: reactLatestRelease 
              }))
            } 
          })).catch((error: any) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }


  /**
   * 
   */
  componentDidUpdate = (prevProps: IProps, prevState: IState) => {

    
    if(prevState.reactLatest.version < this.state.reactLatest.version) {

      const data = {
        name: 'react',
        version: this.state.reactLatest.version
      }

    
      const axiosConfig = {
        headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization" : `Bearer ${bearerToken}`
        }
      }
    
      axios.put(`${reactAPIURL}react`, data, axiosConfig)
        .then((response: any) => {
          console.log(response.status)

        })
        .catch((error: any) => console.log(error));
    } 
  }

  /**
   * 
   */
  compareVersionDesc = (a: any, b: any) => {

    const as = a.name.split('.').map(Number)
    const bs = b.name.split('.').map(Number)

    return (bs[0]||0) - (as[0]||0)
        || (bs[1]||0) - (as[1]||0)
        || (bs[2]||0) - (as[2]||0)
  }
  
  /**
   * 
   */
  findLatestVersion = (versions: any) => { 
    return [...versions].sort(this.compareVersionDesc)[0][0]
  }
  

  render () {

    console.log(previousState);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          {   
            (Moment(this.state.reactLatest.updated_at).isAfter(Moment(tenDaysAgo)) ? <Framework name="React" release={this.state.reactLatest} /> : ' ')
          }
        </header>
        
      </div>
    );
  }
}

export default App;
