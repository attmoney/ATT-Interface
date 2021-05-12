import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout';
import Dash from './components/dash';
import Farm from './components/farm';
import XAtt from './components/xAtt';
import Zelda from './components/zelda';
import Buy from './components/buy';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path='/' exact component={Dash} />
          <Route path='/farm' exact component={Farm} />
          <Route path='/zelda' exact component={Zelda} />
          <Route path='/xAtt' exact component={XAtt} />          
          <Route path='/buy' exact component={Buy} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
