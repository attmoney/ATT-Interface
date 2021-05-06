import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/layout';
import Dash from './components/dash';
import Stake from './components/stake';
import XAtt from './components/xAtt';
import zelda from './components/zelda';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path='/' exact component={Dash} />
          <Route path='/stake' exact component={Stake} />
          <Route path='/zelda' exact component={zelda} />
          <Route path='/xAtt' exact component={XAtt} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
