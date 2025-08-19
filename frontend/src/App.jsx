import React from 'react'
import useState from 'react'
import { useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [jokes, setJokes] = React.useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/jokes')
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

  return (
    <div>
      <h1>list of jokes</h1>
      <p>JOKES: {jokes.length}</p>



      {
        jokes.map((joke,index)=>(
           <div key={joke.id}>
              <h3>{joke.title}</h3>
              <p>{joke.content}</p>
           </div>
        ))
      }


      
    </div>
  )
}

export default App;
