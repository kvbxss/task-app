import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:4200/auth/register", {
        username,
        password,
      });

      const data = response.data;
      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);

      console.log("Registration Successful:", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <TitleLogin onClick={() => navigate("/login")}>Login</TitleLogin>
        <Title>or</Title>
        <TitleReg onClick={() => navigate("/register")}>Register</TitleReg>
      </TitleWrapper>
      <InputBar
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputBar
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <RegisterButton onClick={handleRegister}>Register</RegisterButton>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Lucida Console", "Courier New", monospace;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const TitleLogin = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;

  &:hover {
    color: black;
    cursor: pointer;
    transition: 0.5s all ease-in-out;
  }
`;

const TitleReg = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;

  &:hover {
    color: black;
    transition: 0.5s all ease-in-out;
    cursor: pointer;
  }
`;

const InputBar = styled.input`
  font-size: 1em;
  margin: 2em;
  padding: 0.25em 2.5em;
  font-family: "Lucida Console", "Courier New", monospace;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 300px;
`;

const RegisterButton = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  font-family: "Lucida Console", "Courier New", monospace;
  padding: 0.25em 1em;
  border-radius: 4px;
  width: 110px;

  &:hover {
    background: white;
    color: palevioletred;
    border: 2px solid palevioletred;
    transition: 0.5s all ease-in-out;
  }
`;
