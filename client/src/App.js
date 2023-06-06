import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080';

function App() {
  const [data, setData] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getData();
  }, [isLoggedIn]);

  const getData = async () => {
    const response = await fetch(`${API_URL}/links`);
    const jsonData = await response.json();
    setData(jsonData);
  }

  const deleteData = async (id) => {
    await fetch(`${API_URL}/links/${id}`, {
      method: 'DELETE',
    });
    getData();
  }

  const addData = async () => {
    await fetch(`${API_URL}/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl }),
    });
    setNewUrl("");
    getData();
  }

  const handleLogin = () => {
    if(username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  }

  if(!isLoggedIn) {
    return (
        <div>
          <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
          />
          <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
    );
  }

  return (
      <>
        <h1>Links Table</h1>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.url}</td>
                <td>{row.created_at}</td>
                <td>
                  <button onClick={() => deleteData(row.id)}>Delete</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <h2>Add New Link</h2>
        <input
            type="text"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="New URL"
        />
        <button onClick={addData}>Add</button>
      </>
  );
}

export default App;
