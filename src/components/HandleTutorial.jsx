import React, { useEffect } from 'react';
import hand from '../images/hand.png';
import '../index.css';

function HandleTutorial() {
  useEffect(() => {
    if (!localStorage.getItem('isTutorial')) {
      const a = document.getElementById('a');
      a.style.display = 'flex';
    }
  }, []);

  const handleClick = () => {
    const a = document.getElementById('a');
    a.style.display = 'none';
    localStorage.setItem('isTutorial', false);
  };

  return (
    <div style={ { display: 'none' } } id="a">
      <input
        type="image"
        onClick={ handleClick }
        className="tutorial"
        src={ hand }
        alt="hand-png"
      />
      <div className="tutorial-text">
        <p>Arraste o card para  a direita ou esquerda para trocar de musica</p>
        <span>click na tela para sair</span>
      </div>

    </div>

  );
}

export default HandleTutorial;
