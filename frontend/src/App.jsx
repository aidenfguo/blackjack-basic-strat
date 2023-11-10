import React from 'react'
import {Routes, Route} from 'react-router-dom';
import home from './pages/home';
import addHand from './pages/addHand';
import handHistory from './pages/handHistory';
import testHands from './pages/testHands';


const App = () => {
  return (
    <Routes>
      <Route path = '/' element={<home />}/>
      <Route path = '/handHistory/addHand/:id' element={<addHand/>}/>
      <Route path = '/handHistory/testHands' element={<testHands/>}/>
      <Route path = '/handHistory' element={<handHistory/>}/>
    </Routes>
  );
};

export default App