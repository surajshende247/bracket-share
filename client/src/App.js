import './App.css';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from './views/Home/Home';
import PairProgramming from './views/PairProgramming/PairProgramming';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<PairProgramming />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;