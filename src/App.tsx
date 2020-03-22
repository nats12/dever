import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FrameworksPanel } from './Frameworks/FrameworksPanel';


/**
 *
 *
 * @returns
 */
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h4>Frameworks</h4>
          <FrameworksPanel />
        </div>
      </header>
    </div>
  );
}

export default App;
