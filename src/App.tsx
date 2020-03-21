import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FrameworksPanel } from './Frameworks/FrameworksPanel';

const reactAPIURL = `http://localhost:8000/api/frameworks/`;
const bearerToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9URTJOemRDT1RVNE9FTkJSRE5CT1RSRE9FWTVOVGREUTBKRk1EZ3pRMFE0T1RjNE9UUkRNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi0yaGI3YW5qbC5ldS5hdXRoMC5jb20vIiwic3ViIjoiRzBQQ3RlRmFiOE40TzM1THVDVG9CbXFUOGU2MEFJVDlAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8iLCJpYXQiOjE1ODQ3Mjc0ODQsImV4cCI6MTU4NDgxMzg4NCwiYXpwIjoiRzBQQ3RlRmFiOE40TzM1THVDVG9CbXFUOGU2MEFJVDkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.GncWa5a8yfLGiup0nBDVREQy-1JlWJgymmH-28vbdsxD08u-oLKRU9X3YVCRKWEmyYQiAwmtEV3Z3roGEHzvUL1m2-uc11iAPjYPQLc53HY38SB60fFmoPPbtmylLcxaLZrGvOafkvNxeOBbdWL3bx3L3CvZ0pa_YYbVV0syyigfnIhJMrlA0WPIxSI0iP1t2uI0mueZjG2IwwzqjxZ7G9cnKcLFPfh6vdJhGpv-SNAjuerbHPi5iyeAuaX1aZTviHJD11Jik-64qdcmvjGTp3L3Rl8YlsosHwc_v3p1-BiaSSexKiCjwFKRWJnQ5riwtSlPnBCp0c9tgQocTAamtA`;
const githubToken = `0e45d19f98cfd562e49a2d0818e14b4948157b61`;

interface IPreviousState {
  previousState?: IState;
}

interface IProps {
  data?: any;
}

interface IState {
  latestFrameworks?: never
}

let previousState: any;

/**
 *
 *
 * @returns
 */
function App() {


  const [latestFrameworks, setLatestFrameworks] = useState<any[]>([{}]);


  
  const reactURL = `https://api.github.com/repos/facebook/react/tags`;

  const requestOne = axios.get(reactURL, { headers: { "Authorization": "token " + githubToken }});


  /**
   *
   *
   */
  useEffect(() => {
    
      // const laravelURL = `https://api.github.com/repos/laravel/laravel/tags`;
      // const requestTwo = axios.get(laravelURL, { headers: { "Authorization": "token " + githubToken }});
      // const requestThree = axios.get(reactAPIURL);
      axios.get(reactAPIURL)
        .then((response) => {

          // Fetch currently saved version from DB
          const reactDatabaseVersion = response.data.filter((f: any) => f.name === "react");
          
          setLatestFrameworks([ { 'react': reactDatabaseVersion[0] }]);
          
      }).catch((error) => { console.log(error); });
    },
      []
  )


  
  useEffect(() => {
      console.log('blaaa');
          // Set global 'previousState' to this state
          previousState = latestFrameworks; 

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
              const reactLatestRelease = findLatestVersion(reactGitHubReleases.filter((r: any) => r.length > 0));
              
              reactLatestRelease.updated_at = new Date();
              // Change it's object key name to version to match DB column
              reactLatestRelease.version = reactLatestRelease.name;
              delete reactLatestRelease.name;
          
              // Update only if the new release version is greater than the current one i.e. DB.
          
              if(latestFrameworks[0].react && reactLatestRelease.version > latestFrameworks[0].react.version) {
                setLatestFrameworks([ { 'react': reactLatestRelease }]);
              }
             
              
           
            })).catch((error: any) => { console.log(error); });   
  },
    [latestFrameworks[0].react],
  );


  useEffect(() => {

    if(latestFrameworks[0].react && previousState[0].react.version < latestFrameworks[0].react.version) { 
      updateReactTable('react', latestFrameworks[0].react.version);
    }    
  },
    [latestFrameworks[0].react],
  );

  /**
   *
   *
   * @param {string} framework
   * @param {string} version
   */
  function updateReactTable(framework: string, version: string) {

    const data = {
      name: [framework],
      version
    }

    const axiosConfig = {
      headers:{
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization" : `Bearer ${bearerToken}`
      }
    }
  
    axios.put(`${reactAPIURL}${framework}`, data, axiosConfig)
      .then((response: any) => {
        console.log(response.status)
      })
      .catch((error: any) => console.log(error));
  }


  /**
   *
   *
   * @param {*} a
   * @param {*} b
   * @returns
   */
  function compareVersionDesc(a: any, b: any) {
    
    const as = a.name.split('.').map(Number)
    const bs = b.name.split('.').map(Number)

    return (bs[0]||0) - (as[0]||0)
        || (bs[1]||0) - (as[1]||0)
        || (bs[2]||0) - (as[2]||0)
  }
 
  /**
   *
   *
   * @param {*} versions
   * @returns
   */
  function findLatestVersion(versions: any) { 
      
    return [...versions].sort(compareVersionDesc)[0][0]
  }
  


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          <FrameworksPanel latestFrameworks={latestFrameworks} />
        </div>
      </header>
    </div>
  );
}

export default App;
