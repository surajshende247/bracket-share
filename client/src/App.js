import './App.css';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from './views/Home/Home';
import PairProgramming from './views/PairProgramming/PairProgramming';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/pairprogramming" element={<PairProgramming />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;