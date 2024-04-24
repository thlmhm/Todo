import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import LoginAndForgot from '~/pages/Auth';
import '~/App.css';
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
        </BrowserRouter>
    );
}

export default App;
