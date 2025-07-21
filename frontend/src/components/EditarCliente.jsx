import React, { useState } from 'react';

export default function EditarCliente({ cliente, onAtualizado, onCancelar }) {
  const [nome, setNome] = useState(cliente.nome);
  const [email, setEmail] = useState(cliente.email);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5263/api/Clientes/${cliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cliente.id, nome, email }),
      });

      if (response.status === 204) {
        alert('Cliente atualizado!');
        onAtualizado();
      } else {
        throw new Error('Erro ao atualizar');
      }
    } catch {
      alert('Erro ao atualizar cliente.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Editar Cliente</h2>
      <div>
        <label>Nome:</label><br />
        <input value={nome} onChange={e => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Atualizando...' : 'Atualizar'}</button>
      <button type="button" onClick={onCancelar} style={{ marginLeft: '10px' }}>Cancelar</button>
    </form>
  );
}
