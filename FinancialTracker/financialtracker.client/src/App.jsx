import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage'; // create this later
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<DashboardPage />
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}



export default App;
