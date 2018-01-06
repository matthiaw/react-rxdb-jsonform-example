import React, { Component } from 'react';

import HeroInsert from './components/hero-insert/hero-insert';
import HeroList from './components/hero-list/hero-list';

import logo from './assets/logo.svg';
import './App.css';

/*import dataSchema from "./schemas/person.schema.json";
import uischema from "./schemas/person.uischema.json";
import data from "./schemas/matthias_wegner.person.json";
<Form schema={dataSchema}
  uiSchema={uischema}
  formData={data}
  onChange={log("changed")}
  onSubmit={log("submitted")}
  onError={log("errors")}
/>*/

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Circlead</h1>
        </header>
        <br/>
        <HeroList/>
        <HeroInsert/>

      </div>
    );
  }
}

export default App;
