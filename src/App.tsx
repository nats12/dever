import React from 'react';
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';

import { Header } from './components/Header';
import { Panels } from './components/Panels/Panels';
import { About } from './components/Sections/About';

const Main = styled.div`
  
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
        <About />
		  </Main>
    </div>
  );
}

export default App;
