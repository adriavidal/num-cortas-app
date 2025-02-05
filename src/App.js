import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const initialToken = process.env.REACT_APP_INITIAL_TOKEN;
        console.log('Initial token:', initialToken);
        
        if (!initialToken) {
          throw new Error("Initial token not found in .env");
        }

        const tokenData = await api.getToken(initialToken);
        console.log('Token data:', tokenData);
        const temporalToken = tokenData.Token;

        if (!temporalToken) {
          throw new Error("Temporal token not found in response");
        }

        const numCortasData = await api.getNumCortas(temporalToken);
        console.log('NumCortas data:', numCortasData);
        
        setData(numCortasData.numCortas || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>     <React.Fragment>
        <FontAwesomeIcon icon={faPhone} style={{ fontSize: '24px', marginRight: '10px' }} />
      </React.Fragment> Agenda Teléfonos </h1>
 
      
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Numero Corto</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>{item.destino}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;