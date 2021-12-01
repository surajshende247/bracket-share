import './App.css';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import Home from './views/Home/Home';
import PairProgramming from './views/PairProgramming/PairProgramming';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/pairprogramming" element={<PairProgramming />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Navigate path="*" to="/pairprogramming" />
    </BrowserRouter>
  );
}

export default App;