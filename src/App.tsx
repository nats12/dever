import React from 'react';
import './App.css';
import { FrameworkPanel } from './Frameworks/FrameworkPanel';


/**
 *
 *
 * @returns
 */
function App() {
  const frameworks = ['react', 'laravel'];
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h4>Frameworks</h4>
          {
            // modify back to just load frameworkpanel
            <FrameworkPanel />
          }
        </div>
      </header>
    </div>
  );
}

export default App;
