import React, {useState, useRef, useEffect} from 'react';
import { IoIosPricetag } from "react-icons/io";
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';
import { Panel } from './components/Items/Panel';
import { ErrorBoundary } from './components/ErrorHandling/ErrorBoundary';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { SearchBar } from './components/SearchBar';
import { PanelItem } from './components/Items/PanelItem';

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
  const [searchTerm, setSearchTerm] = useState<any>([...fetches.frameworks.data, ...fetches.tools.data]);
  const [searchResults, setSearchResults] = useState<any>({ data: {} });
  

  // console.log(items);
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

  /**
   *
   *
   * @param {*} event
   */
  const handleSearch = (event: any) => {
      
    const text = event.target.value;

    if(text !== "") {

      const data = searchTerm.filter((item: any) => {
        return item.name.includes(text);
      });

      if((data[0] !== undefined) && (filterTags.indexOf(data[0].tag) !== -1)) {
        setSearchResults(data) 
      } else {
        setSearchResults(undefined) 
      }
    } else {
      setSearchResults(undefined);
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
                    filterTags={filterTags} />
                </div>
              </div>
              <div className="col-lg-6">
                <SearchBar onChange={handleSearch} />
              </div>
            </div>
          </div>
          
          
          {
            searchResults !== undefined && searchResults[0]
              ? <ErrorBoundary key={searchResults[0].name} data={searchResults[0]}>
                  <PanelItem data={searchResults[0]} devtool={searchResults[0].name}/> 
                </ErrorBoundary> 
              :
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
