import React, { useState } from 'react';

export default function ClienteForm({ onClienteCadastrado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5263/api/Clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar');

      const novoCliente = await response.json();
      alert(`Cliente cadastrado com sucesso! ID: ${novoCliente.id}`);

      setNome('');
      setEmail('');
      onClienteCadastrado();

    } catch {
      alert('Erro ao cadastrar cliente.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Cadastrar Cliente</h2>
      <div>
        <label>Nome:</label><br />
        <input value={nome} onChange={e => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
