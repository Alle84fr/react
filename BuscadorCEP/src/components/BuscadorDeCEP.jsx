import { useState } from "react";
import axios from "axios";
import "./BuscadorDeCEP.css";

export default function BuscadorDeCEP() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Função para buscar o CEP
  const buscarCep = async () => {
    if (!/^\d{8}$/.test(cep)) {
      setErro("Digite um CEP válido (8 números)");
      setDados(null);
      return;
    }

    setLoading(true);
    setErro("");
    setDados(null);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro("CEP não encontrado");
      } else {
        setDados(response.data);
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const limpar = () => {
    setCep("");
    setDados(null);
    setErro("");
  };

  return (
    <div className="buscador-container">
      <h1>🔎 Buscador de CEP</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Digite o CEP (apenas números)"
          value={cep}
          maxLength="8"
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, ""); // só números
            setCep(valor);
          }}
        />
        <button onClick={buscarCep}>Buscar</button>
        <button className="limpar" onClick={limpar}>Limpar</button>
      </div>

      {loading && <p className="loading">Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      {dados && (
        <div className="resultado">
          <p><b>Logradouro:</b> {dados.logradouro}</p>
          <p><b>Bairro:</b> {dados.bairro}</p>
          <p><b>Cidade:</b> {dados.localidade}</p>
          <p><b>Estado:</b> {dados.uf}</p>
        </div>
      )}
    </div>
  );
}
