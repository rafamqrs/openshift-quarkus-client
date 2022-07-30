import React from 'react';
import RouteForm from './components/forms';
import AppPage from './components/layout/AppPage';
import RouteList from './components/List/RouteList';

function App() {
  return (
    <AppPage>
        <RouteForm/>
        <RouteList/>
      </AppPage>
    );
}

export default App;
