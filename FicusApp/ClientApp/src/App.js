import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import Login from './components/Login'

function App() {
    return (
        <div className="App">
            <Login />
        </div>
    );
}
export default App;