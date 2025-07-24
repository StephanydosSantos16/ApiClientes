import React, { useEffect, useState } from 'react';
import ClientesList from './components/ClientesList';
import ClienteForm from './components/ClienteForm';
import EditarCliente from './components/EditarCliente';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5263';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteEditando, setClienteEditando] = useState(null);

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/Clientes`);
      const data = await res.json();
      setClientes(data);
    } catch {
      alert('Erro ao carregar clientes');
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const excluirCliente = async id => {
    if (!window.confirm('Deseja realmente deletar este cliente?')) return;

    try {
      const res = await fetch(`${apiUrl}/api/Clientes/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 204) {
        alert('Cliente deletado!');
        carregarClientes();
      } else {
        throw new Error('Erro ao deletar');
      }
    } catch {
      alert('Erro ao deletar cliente.');
    }
  };

  // resto do código permanece igual...

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {!clienteEditando ? (
        <>
          <ClienteForm onClienteCadastrado={carregarClientes} />
          {loading ? <p>Carregando clientes...</p> : (
            <ClientesList clientes={clientes} onExcluir={excluirCliente} onEditar={setClienteEditando} />
          )}
        </>
      ) : (
        <EditarCliente cliente={clienteEditando} onAtualizado={carregarClientes} onCancelar={() => setClienteEditando(null)} />
      )}
    </div>
  );
}

export default App;
