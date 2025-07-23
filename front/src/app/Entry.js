import logo from '../features/assets/Book_ri3.png';
import '../styles/Entry.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="content-box">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            STORYBOOK RESEARCH INSTITUTE
          </p>
          <Link to="/login"
            className="App-link"
          >
            Enter the Book Create
          </Link>
        </div>
      </header>
    </div>
  );
}

export default App;