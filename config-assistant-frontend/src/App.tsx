import React from 'react';
import RouteForm from './components/forms';
import { Panel, PanelMain, Divider, PanelMainBody} from '@patternfly/react-core';

import AppPage from './components/layout/AppPage';
import RouteList from './components/List/RouteList';

function App() {
  return (
    <AppPage>

        <RouteForm/>
        <br/>
        <br/>
        <Panel variant="bordered">
        <PanelMain maxHeight="1">
          <PanelMainBody>        <RouteList/></PanelMainBody>
        </PanelMain>
        </Panel>

      </AppPage>
    );
}

export default App;
