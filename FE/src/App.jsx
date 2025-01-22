import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
// Layout Import
import DefaultLayout from './layouts/DefaultLayout';
// Pages Import
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="/search" element={<SearchPage />}></Route>
                    <Route path="/doctor">
                        <Route path=":id" element={<DetailPage />}></Route>
                        <Route
                            path="register"
                            element={<RegisterPage />}
                        ></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
