import React from "react";
import "./ProfileCard.css";

function ProfileCard({ name, age, isStudent }) {
  // Função para exibir o alerta com o nome
  const handleClick = () => {
    alert(`O nome da pessoa é: ${name}`);
  };

  return (
    <div className="profile-card">
      <h2>👤 {name} – {age} anos</h2>
      <p>{isStudent ? "É estudante" : "Não é estudante"}</p>
      <button onClick={handleClick}>Ver nome</button>
    </div>
  );
}

export default ProfileCard;
