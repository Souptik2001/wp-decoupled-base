import './App.css';
import Navbar from './components/Navbar';
import logo from './logo.svg';

function App() {

    return (
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
}

export default App;
