import React, { useEffect, useState } from 'react';
import ClientesList from './components/ClientesList';
import ClienteForm from './components/ClienteForm';
import EditarCliente from './components/EditarCliente';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteEditando, setClienteEditando] = useState(null);

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5263/api/Clientes');
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
      const res = await fetch(`http://localhost:5263/api/Clientes/${id}`, {
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

  const cancelarEdicao = () => {
    setClienteEditando(null);
  };

  const atualizouCliente = () => {
    setClienteEditando(null);
    carregarClientes();
  };

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
        <EditarCliente cliente={clienteEditando} onAtualizado={atualizouCliente} onCancelar={cancelarEdicao} />
      )}
    </div>
  );
}

export default App;
