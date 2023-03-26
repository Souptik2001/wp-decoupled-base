import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blog from './components/Blog';
import BlogList from './components/BlogList';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';

function App() {

    return (
      <div className="App">
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path='/' element={<BlogList />} />
            <Route path='/:postType/:taxonomy/:slug' element={<BlogList />} />
            <Route path='/:postType/:year/:month/:date/:slug' element={<Blog />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    );
}

export default App;
