import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router';
// Layout Import
import DefaultLayout from './layouts/DefaultLayout';
// Pages Import
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import RegisterPage from './pages/RegisterPage';
import GlobalContext from '../contexts/globalContext';
import NotFound from './components/NotFound';
import { useState } from 'react';

function App() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <GlobalContext.Provider value={{ setIsLoading, isLoading }}>
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route index element={<HomePage />}></Route>
                        <Route path="/doctor">
                            <Route
                                path="search"
                                element={<SearchPage />}
                            ></Route>
                            <Route path=":id" element={<DetailPage />}></Route>
                            <Route
                                path="register"
                                element={<RegisterPage />}
                            ></Route>
                        </Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalContext.Provider>
    );
}

export default App;
