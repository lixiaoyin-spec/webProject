import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as axios from 'axios'
import { useNavigate } from 'react-router-dom';

const client = axios.default;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  

  const validateForm = () => {
      let isValid = true;
      const errors = {};

      if (!username) {
          isValid = false;
          errors.username = 'Username is required';
      }

      if (!password) {
          isValid = false;
          errors.password = 'Password is required';
      }

      setErrors(errors);
      return isValid;
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      if (validateForm()) {
          console.log('Form is valid');
          // Perform login logic here
          client.post("http://127.0.0.1:7001/check", {
            name: username,
            word: password
          }, {
            headers: {
                'Content-Type': 'application/json'
            }
          }
        ).then((response) => {
            if(response){
                alert('Login successful!');
                //跳转到主界面
                navigate('/board');
            } else {
                console.log('Form is invalid');
            }
        })
          
      } else {
          console.log('Form is invalid');
      }
  };
  
  return (
      <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Username:</label>
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p>{errors.password}</p>}
              </div>
              <button type="submit">Login</button>
          </form>
      </div>
  );
}

export default App;