import { Route, Routes } from 'react-router-dom';
import './App.css';
import BlogListRoutes from './components/BlogListRoutes';
import Home from './components/Home';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';

function App() {

    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:postType/*' element={<BlogListRoutes />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    );
}

export default App;
