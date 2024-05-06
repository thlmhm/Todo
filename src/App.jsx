import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LoginAndForgot from '~/pages/Auth';
import '~/App.css';
import AppLayout from './layouts/AppLayout';
import ListClients from './pages/clients/ListClients';
function App() {
    const { user, isLoggedIn } = useContext(AuthContext);
    console.log(isLoggedIn);
    return (
        <BrowserRouter>
            {!isLoggedIn && (
                <Routes>
                    <Route path="/auth/:action" element={<LoginAndForgot />} />
                    <Route path="*" element={<LoginAndForgot />} />
                </Routes>
            )}
            {isLoggedIn && (
                <AppLayout>
                    <Routes>
                        <Route path="/" element={<ListClients />} />
                    </Routes>
                </AppLayout>
            )}
        </BrowserRouter>
    );
}

export default App;
