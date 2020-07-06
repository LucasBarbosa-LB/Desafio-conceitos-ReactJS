import React, {useState, useEffect} from "react";
import api from "./services/api"
import "./styles.css";

function App() {

  //Listagem de repositorios
      const [repositories, setRepository] = useState([]);


      useEffect(()=>{api.get('repositories').then(response =>{
        setRepository(response.data);
      });

      },[]);

      //Adiciona um novo Repositorio 
  async function handleAddRepository() {
    const response = await api.post('repositories',{	
      title:`new repositories ${Date.now()}`,
      url:"Lucas",
      techs:"Desafio React JS"

      
      });
      const repository = response.data;
          setRepository([
            ...repositories,
            repository]);
    }

  async function handleRemoveRepository(id) {
    // Metodo de Delete
    await api.delete(`repositories/${id}`);
    setRepository(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      {/* Lista os Repositorios */}
      <ul data-testid="repository-list">
          {repositories.map(repository =>(
          <li key={repository.id}>{repository.title}
          
            {/* Botão de Remover */}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
              ))}
          
      </ul>
        {/* Botão de Adicionar */}
      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>

  );
}

export default App;