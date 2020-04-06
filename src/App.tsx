import React from 'react';
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';
import { Panel } from './components/Frameworks/Panel';
import { ErrorBoundary } from './components/ErrorHandling/ErrorBoundary';
import { Header } from './components/Header';
const frameworks = require('./config/frameworks.json');
const tools = require('./config/tools.json');

const Panels = styled.div`

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
        <Panels className="container">
          <PanelsTitle>What's new, pussycat?</PanelsTitle>
          {
            <>
              <ErrorBoundary data="frameworks">
                <Panel devtool="frameworks" data={frameworks} />
              </ErrorBoundary>
     
              {/* <ErrorBoundary data="tools">
                <Panel devtool="tools" data={tools} />
              </ErrorBoundary> */}
            </>
          }
        </Panels>
    </div>
  );
}

export default App;
