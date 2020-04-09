import React, {useState, useRef, useEffect} from 'react';
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';

import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { SearchBar } from './components/SearchBar';
import { Panels } from './components/Items/Panels';

const f = require('./config/frameworks.json');
const t = require('./config/tools.json');


const fetches: any = {
  frameworks: f,
  tools: t
}

const Main = styled.div`
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

	const [allItems, setAllItems] = useState<any>([...fetches.frameworks.data, ...fetches.tools.data]);
  	const [filterTags, setFilterTags] = useState<any>(["frameworks", "tools"]);
  	const [searchResults, setSearchResults] = useState<any>({ data: {} });
  

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
			return;
		}

		setFilterTags(filterTags.filter((tag: string) => { 
			return tag !== id
		}))
      	
  	};

	/**
	 *
	 *
	 * @param {*} event
	 */
	const handleSearch = (event: any) => {
      
		const text = event.target.value;

		if(text === "") {
			setSearchResults(undefined);
			return;
		}
	
		const data = allItems.filter((item: any) => {
			return item.name.includes(text);
		});

		if((data[0] !== undefined) && (filterTags.indexOf(data[0].tag) !== -1)) {
			setSearchResults(data) 
		} 
  	};


  return (
    <div className="App">
        <Header />
        <Main className="container">
          <PanelsTitle>What's new, pussycat?</PanelsTitle>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                  <Filter 
                    handleClick={handleClick}
                    filterTags={filterTags} />
              </div>
              <div className="col-lg-6">
                <SearchBar onChange={handleSearch} />
              </div>
            </div>
          </div>
          <Panels searchResults={searchResults} filterTags={filterTags} data={fetches} />
        
        </Main>
    </div>
  );
}

export default App;
