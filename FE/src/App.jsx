import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';

function App() {
    return (
        <>
            <Routes>
                <Route index element={<HomePage />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/doctor">
                    <Route path=":id" element={<DetailPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
