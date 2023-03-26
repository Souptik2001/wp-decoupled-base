import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
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
            <Route path='/:postType'>
              <Route path='' element={<BlogList />}  />
              <Route path=':taxonomy/:slug' element={<BlogList />} />
              <Route path=':year/:month/:date/:slug' element={<Blog />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    );
}

export default App;
