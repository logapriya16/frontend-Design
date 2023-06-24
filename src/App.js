import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './pages/home';
import Post from './pages/post';
function App() {
  return (
    <div className="App">
        <h1 className='brand'>Forum App</h1>
      <Routes>
        <Route path='/' element={<Home/>}
        />
        <Route path='/post/:ID' element={<Post/>}/>
      </Routes>
    </div>
  );
}

export default App;
