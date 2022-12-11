import React, { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const logo =  require("./../src/assets/logo.jpg")

function App() {
  const baseUrl = "https://localhost:44389/api/Alunos";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
  });

  const selecionarAluno = (aluno: any, opcao: string) => {
    setAlunoSelecionado(aluno);
    opcao === "Editar" ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  };

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  };
  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  };
  const abrirFecharModalExcluir = () => {
    setModalExcluir(!modalExcluir);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
    console.log(alunoSelecionado);
  };

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    delete alunoSelecionado.id;
    await axios
      .post(baseUrl, alunoSelecionado)
      .then((response) => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPut = async () => {
    await axios
      .put(baseUrl + "/" + alunoSelecionado.id, alunoSelecionado)
      .then((response) => {
        var resposta = response.data;
        var dadosAuxiliar = data;
        dadosAuxiliar.map((aluno: { id: string; name: string; email: string; age: number; }) => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.name = resposta.name;
            aluno.email = resposta.email;
            aluno.age = resposta.age;
          }
        });
        abrirFecharModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoDelete = async () => {
    await axios
      .delete(baseUrl + "/" + alunoSelecionado.id)
      .then((response) => {
        setData(data.filter((aluno) => aluno !== response.data));
        abrirFecharModalExcluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    pedidoGet();
  });

  return (
    <div className="aluno-container">
      <br />
      <h3>Cadastro de Alunos</h3>
      <header>
      <img src={logo} alt="Cadastro" />
        <button
          className="btn btn-success"
          onClick={() => abrirFecharModalIncluir()}
        >
          Incluir novo Aluno
        </button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Idade</th>
            <th scope="col">Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((aluno: { id: number; name: string; email: string; age: number; }) => (
            <tr >
              <td>{aluno.id}</td>
              <td>{aluno.name}</td>
              <td>{aluno.email}</td>
              <td>{aluno.age}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => selecionarAluno(aluno, "Editar")}
                >
                  Editar
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => selecionarAluno(aluno, "Excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal incluir alunos */}
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir novo Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
            />
            <br />
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label>Age: </label>
            <input
              type="number"
              className="form-control"
              name="age"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>
            Incluir
          </button>{" "}
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalIncluir()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal Editar Alunos */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id: </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={alunoSelecionado && alunoSelecionado.id}
            />
            <br />
            <label>Name: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.name}
            />
            <br />
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.email}
            />
            <br />
            <label>Age: </label>
            <input
              type="text"
              className="form-control"
              name="age"
              onChange={handleChange}
              value={alunoSelecionado && alunoSelecionado.age}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>
            Editar
          </button>{" "}
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirFecharModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal excluir alunos */}
      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão {alunoSelecionado && alunoSelecionado.name} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirFecharModalExcluir()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
