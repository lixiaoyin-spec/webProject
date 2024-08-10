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
      <div className='total'>
        <h1 className="heading">Welcome!!!</h1>
          <h2 className="heading">Login Page</h2>
          <form onSubmit={handleSubmit}>
          <div>
          <label className="form-container label">Username:</label>
          <input className="border-4 border-light-blue-500 border-opacity-100, form-container input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label className="form-container label">Password:</label>
          <input className="border-4 border-dark-500 border-opacity-200, form-container input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p>{errors.password}</p>}
        </div>
              <button class = "bg-sky-500 hover:bg-sky-700, rounded-full py-3 px-6" type="submit">Login</button>
          </form>
      </div>
  );
}

export default App;
// class = "bg-sky-500 hover:bg-sky-700"