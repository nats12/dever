import React, {useState, useRef, useEffect} from 'react';
import { IoIosPricetag } from "react-icons/io";
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';
import { Panel } from './components/Frameworks/Panel';
import { ErrorBoundary } from './components/ErrorHandling/ErrorBoundary';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { parse } from 'path';

const f = require('./config/frameworks.json');
const t = require('./config/tools.json');

const fetches: any = {
  frameworks: f,
  tools: t
}

const Panels = styled.div`
  .FilterSearch {
    display: flex;
    margin-bottom: 100px;
  }

  .Tag {
    font-size: 30px;
    align-self: center;
  }
`;

const PanelsTitle = styled.h1`
  margin-top: 170px;
  margin-bottom: 100px;
  color: ${theme.black};
`;

/**
 *
 *
 * @returns
 */
function App() {

  const [filterTags, setFilterTags] = useState<any>(["frameworks", "tools"]);

  
  /**
   *
   *
   * @param {*} event
   */
  const handleClick = (event: any) => {
      
      const id = event.target.id;
      const index = filterTags.indexOf(id);

      if(index === -1) {
          setFilterTags([...filterTags, id]);
      } else {
          setFilterTags(filterTags.filter((tag: string) => { 
              return tag !== id
          }));
      }
    };


  return (
    <div className="App">
        <Header />
        <Panels className="container">
          <PanelsTitle>What's new, pussycat?</PanelsTitle>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="FilterSearch">
                  <div className="Tag">
                    <IoIosPricetag/>
                  </div>
                  <Filter 
                    handleClick={handleClick}
                    filterList={filterTags} />
                </div>
              </div>
            </div>
          </div>
          
          
          {
            filterTags.map((tag: string) => {
              return <ErrorBoundary key={tag} data={tag}>
                        <Panel 
                          key={tag} 
                          devtool={tag} 
                          data={fetches[tag]} /> 
                    </ErrorBoundary> 
            })
          }
        </Panels>
    </div>
  );
}

export default App;
