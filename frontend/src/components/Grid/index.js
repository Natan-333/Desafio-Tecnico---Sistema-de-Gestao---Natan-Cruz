import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

// Service import
import { api } from '../../services/api';

// Style import
import { Table, Tbody, Td, Th, Thead, Tr } from './styles';

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/" + id)

      const newArray = users.filter(user => user.id !== id);
      setUsers(newArray);
      toast.success('Usuário apagado com sucesso!');
    } catch (error) {
      toast.error('Não foi possível apagar este usuário com id: ', id);
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.fone}
            </Td>

            <Td alignCenter width="5%">
              <FaEdit
                onClick={() => handleEdit(item)}
                color="#e6e600"
              />
            </Td>

            <Td alignCenter width="5%">
              <FaTrash
                onClick={() => handleDelete(item.id)}
                color="#ff0000"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
