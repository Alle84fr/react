import { useState } from "react";
import './BuscadorDeCEP.css';


const BuscadorDeCEP = () => {

  const [cep, setCep] = useState('');
  // 'endereco': armazena os dados do endereço recebidos da API. Começa como 'null'.
  const [endereco, setEndereco] = useState(null);
  // 'erro': armazena a mensagem de erro, caso a busca falhe. Começa como uma string vazia.
  const [erro, setErro] = useState('');
  // 'carregando': um booleano que indica se a requisição à API está em andamento.
  const [carregando, setCarregando] = useState(false);

  // Função para limpar todos os estados e resetar o formulário.
  const limparBusca = () => {
    setCep('');
    setEndereco(null);
    setErro('');
  };

  // Função que é chamada toda vez que o valor do input de CEP muda.
  const handleCepChange = (event) => {
    // Pega o valor do input.
    const novoCep = event.target.value
      // Substitui qualquer caractere que não seja um dígito por uma string vazia (remove letras, símbolos, etc.).
      .replace(/\D/g, '')
      // Limita o tamanho da string a 8 dígitos.
      .slice(0, 8);
    // Atualiza o estado 'cep' com o novo valor filtrado.
    setCep(novoCep);
  };

  // Função assíncrona para buscar os dados do CEP na API do ViaCEP.
  const buscarCEP = async () => {
    // Validação inicial: verifica se o CEP tem exatamente 8 dígitos.
    if (cep.length !== 8) {
      setErro('O CEP deve conter 8 dígitos.');
      return; // Interrompe a função se a validação falhar.
    }

    // Define o estado de carregamento como 'true' e limpa os estados de erro e endereço.
    setCarregando(true);
    setErro('');
    setEndereco(null);

    // Bloco 'try-catch' para lidar com requisições e possíveis erros.
    try {
      // Faz a requisição à API do ViaCEP usando o 'fetch'.
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      // Converte a resposta da requisição para o formato JSON.
      const data = await response.json();
      console.log(data.logradouro)
      console.log(data.erro)

      // Verifica se a resposta da API contém a chave 'erro', que indica um CEP não encontrado.
      if (data.erro) {
        setErro('CEP não encontrado.');
      } else {
        // Se a busca for bem-sucedida, atualiza o estado 'endereco' com os dados recebidos.
        setEndereco(data);
      }
    } catch (error) {
      // Se a requisição falhar por algum motivo (ex: problema de rede), define uma mensagem de erro.
      setErro('Ocorreu um erro na busca. Tente novamente.');
    } finally {
      // O bloco 'finally' é executado independentemente de ter ocorrido um erro ou não.
      // Define o estado de carregamento como 'false' para parar de exibir a mensagem "Carregando...".
      setCarregando(false);
    }
  };

  // O 'return' do componente JSX, que define o que será renderizado na tela.
  return (
    <div className="buscador-container">
      <h1>Buscador de CEP</h1>
      <div className="input-group">
        {/* Campo de input para o CEP */}
        <input
          type="text"
          value={cep} // O valor do input é controlado pelo estado 'cep'.
          onChange={handleCepChange} // Chama a função 'handleCepChange' a cada digitação.
          placeholder="Digite o CEP (apenas números)"
          className="cep-input"
          maxLength="8" // Limita o número de caracteres que podem ser digitados.
        />
        {/* Botão de busca */}
        <button onClick={buscarCEP} className="search-button">
          Buscar
        </button>
        {/* Botão para limpar a busca */}
        <button onClick={limparBusca} className="clear-button">
          Limpar
        </button>
      </div>

      {/* Exibe a mensagem de carregamento condicionalmente. */}
      {carregando && <p className="status-message">Carregando...</p>}
      {/* Exibe a mensagem de erro condicionalmente. */}
      {erro && <p className="status-message error-message">{erro}</p>}

      {/* Exibe as informações do endereço somente se o estado 'endereco' não for nulo. */}
      {endereco && (
        <div className="endereco-info">
          <h2>Endereço Encontrado</h2>
          <p>
            <strong>Logradouro:</strong> {endereco.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {endereco.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {endereco.localidade}
          </p>
          <p>
            <strong>Estado:</strong> {endereco.uf}
          </p>
          <p>
            <strong>DDD:</strong> {endereco.ddd}
          </p>
        </div>
      )}
    </div>
  );
};



export default BuscadorDeCEP;