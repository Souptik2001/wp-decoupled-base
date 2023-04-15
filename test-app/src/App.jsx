import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import BlogListRoutes from './components/BlogListRoutes';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import PageNotFound from './components/PageNotFound';

function App() {

  useEffect(() => {
		document.title = "WP Decoupled";
	}, []);

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
