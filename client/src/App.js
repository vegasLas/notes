import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/auth';
import './index.css';
import AuthRoute from './util/AuthRoute';


function App() {
  
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <div className="app__wrapper">
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
