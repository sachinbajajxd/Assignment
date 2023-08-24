import './App.css';
import Form from  './components/Form';
import Edit from './components/Edit';
import TableComponent from './components/Table';
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableComponent />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App;
