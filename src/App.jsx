import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';

import { logo, roadster, falcon, falconheavy } from './assets';
import Roadster from './views/Roadster';

function Home() {

  const history = useHistory();

  return (
    <div className="App">
      <div className="header">
        <img alt="SpaceX logo" src={logo} id="logo" />
      </div>
      <div className="nav">
        <div className="navItem" onClick={() => { history.push('/roadster') }}>
          <img alt="2008 Tesla Roadster" src={roadster} />
          <h2>Roadster</h2>
        </div>
        <div className="navItem">
          <img alt="Falcon Nine rocket" src={falcon} />
          <h2>Launches</h2>
        </div>
        <div className="navItem">
          <img alt="Falcon Heavy rocket" src={falconheavy} />
          <h2>Landings</h2>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/roadster">
          <Roadster />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
