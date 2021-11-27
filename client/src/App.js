import './App.css';
import { BrowserRouter,Switch,Route,Redirect } from 'react-router-dom';

import Home from './Home/Home';
import PairProgramming from './PairProgramming/PairProgramming';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pairprogramming" component={PairProgramming} />
        <Route exact path="/home" component={Home} />
        <Redirect from="*" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
