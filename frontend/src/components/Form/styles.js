
import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  gap: 1rem;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;

  > h3 {
    margin: 1rem 0;
  }
`;

export const FieldSet = styled.fieldset`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  gap: 1rem;
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

export const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

export const Label = styled.label``;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #7159c1;
  color: white;
  height: 42px;
  width: 100%;
`;