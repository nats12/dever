import React, {useState, useRef, useEffect} from 'react';
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';

import { Header } from './components/Header';
import { Panels } from './components/Items/Panels';



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
	
  return (
    <div className="App">
        <Header />
        <Main className="container">
          	<PanelsTitle>What's new, pussycat?</PanelsTitle>
			<Panels />
		</Main>
    </div>
  );
}

export default App;
