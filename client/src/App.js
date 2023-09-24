import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './components/loginPage/loginPage';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Registration } from './components/registrationPage/regForm';
import { Dashboard } from './components/dashboard/dashboard';
import { GiveLift } from './components/dashboard/processDashboard/giveLift';
import { TakeLift } from './components/dashboard/processDashboard/takeLift';
import { UpdateProfile } from './components/updateprofile/updateprofile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<LoginPage/>]}/>
          <Route path='/reg' element={[<Registration/>]}/>
          <Route path='/loginPage' element={[<LoginPage/>]}/>
          <Route path='/dashboard/:id' element={[<Dashboard/>]}/>
          <Route path='/glift/:id' element={[<GiveLift/>]}/>
          <Route path='/tlift/:id' element={[<TakeLift/>]}/>
          <Route path='/update/:id' element={[<UpdateProfile/>]}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
