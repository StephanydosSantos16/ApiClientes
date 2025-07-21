import React from 'react';

export default function ClientesList({ clientes, onExcluir, onEditar }) {
  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => onEditar(cliente)}>Editar</button>
                <button onClick={() => onExcluir(cliente.id)} style={{ marginLeft: 5 }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
