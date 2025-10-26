import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// Service import
import { api } from '../../services/api';

// Style import
import {
  Button,
  FormContainer,
  Input,
  InputArea,
  Label,
  FieldSet
} from './styles';

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  // Ref
  const ref = useRef();

  // State
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(undefined);

  useEffect(() => {
    const formattedCep = cep.replace(/\D/g, '');
    if (!cep || cep.length <= 7) return;

    const checkCep = async () => {
      try {
        const { data } = await api.get(`https://viacep.com.br/ws/${formattedCep}/json/`);
        setAddress(data);
      } catch (error) {
        toast.error("Não foi possível buscar este cep.")
      }
    }

    checkCep();
  }, [cep]);

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      try {
        // Sessão onde o usuário será editado
        await api.put("/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })

        toast.success("Usuário editado com sucesso!")
      } catch (error) {
        toast.error("Não foi possível editar o usuário.")
      }
    } else {
      // Sessão onde o usuário será cadastrado
      try {
        await api.post("/", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        toast.success("Usuário cadastrado com sucesso!")
      } catch (error) {
        toast.error("Não foi possível cadastrar o usuário.")
      }
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <h3>Dados pessoais</h3>
      <FieldSet>
        <InputArea>
          <Label>Nome</Label>
          <Input 
            name="nome"
            placeholder="John Doe"
          />
        </InputArea>

        <InputArea>
          <Label>E-mail</Label>
          <Input 
            name="email" 
            type="email"
            placeholder="johndoe@mail.com"
          />
        </InputArea>

        <InputArea>
          <Label>Telefone</Label>
          <Input 
            name="fone" 
            placeholder="(11) 99999-9999"
          />
        </InputArea>
      </FieldSet>

      <FieldSet>
        <InputArea>
          <Label>Data de Nascimento</Label>
          <Input 
            name="data_nascimento" 
            type="date" 
            placeholder="11/08/2000"
          />
        </InputArea>

        <InputArea>
          <Label>Senha</Label>
          <Input 
            name="password" 
            type="password" 
            placeholder="*******"
          />
        </InputArea>

        <InputArea>
          <Label>CNPJ</Label>
          <Input 
            name="cnpj" 
            type="number"
            pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}" 
            placeholder="00.000.000/0001-00"
            required
          />
        </InputArea>
      </FieldSet>

      <InputArea>
        <Label>Nome da empresa</Label>
        <Input 
          name="company_name" 
          placeholder="Nome da empresa"
        />
      </InputArea>

      <h3>Endereço</h3>

      <FieldSet>
        <InputArea>
          <Label>CEP</Label>
          <Input
            name="cep"
            type="text"
            onChange={({ target }) => setCep(target.value)}
            placeholder="00000-00"
          />
        </InputArea>

        {!!address?.logradouro && (
          <InputArea>
            <Label>Rua</Label>
            <Input
              name="street"
              type="text"
              value={address.logradouro}
              disabled
              onChange={({ target }) => setCep(target.value)}
            />
          </InputArea>
        )}

        {!!address?.localidade && (
          <InputArea>
            <Label>Cidade</Label>
            <Input
              name="city"
              type="text"
              value={address.localidade}
              disabled
              onChange={({ target }) => setCep(target.value)}
            />
          </InputArea>
        )}
      </FieldSet>

      <FieldSet>
        {!!address?.uf && (
          <InputArea>
            <Label>Estado</Label>
            <Input
              name="state"
              type="text"
              value={address.uf}
              disabled
              onChange={({ target }) => setCep(target.value)}
            />
          </InputArea>
        )}

        {!!address && (
          <InputArea>
            <Label>Número</Label>
            <Input
              name="number"
              type="text"
            />
          </InputArea>
        )}
      </FieldSet>


      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;