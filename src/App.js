import './App.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/Signup';
import AddSubjectPage from './pages/addSubject';
import UpdateSubjectPage from './pages/updateSubject';

function App() {
  return (
   
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="addSubject" element={<AddSubjectPage />} />
        <Route path="/updateSubject/:id" element={<UpdateSubjectPage />} />  

      </Routes>
    </BrowserRouter>
  );
}

export default App;
