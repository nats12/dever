import React from 'react';
import styled from "styled-components"
import theme from './theme/theme'
import './App.scss';

import { Header } from './components/Header';
import { Panels } from './components/Items/Panels';

const Main = styled.div`
  
`;

const PanelsTitle = styled.h1`
  margin-top: 170px;
  margin-bottom: 100px;
  color: ${theme.black};
`;


// const Example = (props: any) => {
  
//   // const data = props.data;

//   console.log('example data', props.data);

//   return (
//     <div className='example'>
//       {props.data.map((item: any) => 
       
//           <div key={item.id} className='example__item'>
//             {item.id} {item.first_name} {item.last_name}
//           </div>
      
//       )}
//     </div>
//   );
// }

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
