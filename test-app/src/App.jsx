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
            <Route path='/:taxonomy/:slug' element={<BlogList />} />
            <Route path='/blog/:slug' element={<Blog />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    );
}

export default App;
