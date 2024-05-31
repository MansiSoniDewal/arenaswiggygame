import React, { useState } from "react";
import "./Arena.css";
function Arena() {
  const [players, setPlayers] = useState([
    { name: "Player 1", health: 100, strength: 10, attack: 5 },
    { name: "Player 2", health: 100, strength: 10, attack: 5 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [message, setMessage] = useState("");

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);
    calculateAttack(newDiceValue);
  };

  const calculateAttack = (diceValue) => {
    const attacker = players[currentPlayerIndex];
    const defenderIndex = (currentPlayerIndex + 1) % 2;
    const defender = players[defenderIndex];

    const attackPower = diceValue * attacker.strength;
    const newHealth = defender.health - attackPower;

    const updatedPlayers = [...players];
    updatedPlayers[defenderIndex] = { ...defender, health: newHealth };

    setPlayers(updatedPlayers);
    if (newHealth <= 0) {
      if (attacker.health <= 0)
        return alert(
          "game overn player lost : Player 1 refresh tp start a new game"
        );
      else {
        return alert(
          "game overn player lost : Player 2 refersh to start a new game"
        );
      }
    }
    setMessage(
      `${attacker.name} rolls a ${diceValue}! Attacks with power ${attackPower}. ${defender.name}'s health is now ${newHealth}`
    );

    setCurrentPlayerIndex(defenderIndex);
  };

  return (
    <div>
      <h2>Current Player: {players[currentPlayerIndex].name}</h2>
      <div className="player-container">
        <div className="player-card">
          <h3>{players[0].name}</h3>
          <p>Health: {players[0].health}</p>
          <p>Strength: {players[0].strength}</p>
          <p>Attack: {players[0].attack}</p>
        </div>
        <button onClick={rollDice}>Roll Dice</button>
        <div className="player-card">
          <h3>{players[1].name}</h3>
          <p>Health: {players[1].health}</p>
          <p>Strength: {players[1].strength}</p>
          <p>Attack: {players[1].attack}</p>
        </div>
      </div>
      {diceValue !== null && <p>Dice Value: {diceValue}</p>}
      <p>{message}</p>
    </div>
  );
}

export default Arena;
