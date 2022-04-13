import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Home from './pages/Home';
import Mint from './pages/Mint';
import Nouns from './pages/Nouns';
import Noun from './pages/Noun';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Shell>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/nouns' element={<Nouns />} />
            <Route path='/noun/:id' element={<Noun />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </Shell>
    </Router>
  );
}

export default App;
