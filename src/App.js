import React, { useState } from 'react';
import QuickLaunch from './quick-launch-component/QuickLaunch';
import './App.css';

function App() {

  const [currentView, changeView] = useState(3);

  return (
    <div className="main-container">
      <QuickLaunch currentView={currentView} changeView={changeView}></QuickLaunch>
    </div>
  );
}

export default App;
