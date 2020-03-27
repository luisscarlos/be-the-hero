import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    //criação das rotas
    <BrowserRouter>
      <Switch> {/* permite que uma rota seja usada de cada vez */}
        <Route path="/" exact component={Logon} /> {/* criando a rota p/ logon page*/}
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile}/>
        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}