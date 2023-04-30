import './App.css';
import { useState} from 'react';
import axios, * as others from 'axios';

function App() {

  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(message);
 
  async function getChatGTPResult() {
    try {
      const response = await axios.get(`http://localhost:8080/api/chat?message=${message}`);
      console.log(response);
      setUpdated(response.data);
    } catch (error) {
      if (error.response) { // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) { // no response
        console.log(error.request);
      } else { // Something wrong in setting up the request
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
     
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const handleClick = () =>{
    getChatGTPResult();
    //setUpdated(message);
  }
  return (
    <div>
        <h3>ChatGPT</h3>
        <input
          type='text'
          id='message'
          name='message'
          onChange={handleChange}
          value={message}
        />
        &nbsp;
       <button onClick={handleClick}>Dame respuesta</button>
       <br/>
       <h3>Resultado:</h3>
       <h4>{updated}</h4>
    </div>
  );
}

export default App;
