import React, { useState } from 'react';

function Estado() {
// O valor inicial de 'estaLigado' é definido como 'false'
const [estaLigado, setEstaLigado] = useState(false);
// A função para alternar o valor de 'estaLigado'
function alternarStatus() {
    setEstaLigado(!estaLigado); // O ! inverte o valor de true para false, ou vice-versa
}
return (
    <div>
        <p>O botão está: {estaLigado ? 'Ligado' : 'Desligado'}</p>
        <button onClick={alternarStatus}>Alternar Status</button>
    </div>
    );
}

export default Estado;