import React, { useEffect } from 'react';
import hand from '../images/hand.png';
import '../index.css';

function HandleTutorial() {
  useEffect(() => {
    const innerWidth = 600;
    const a = document.getElementById('a');
    console.log(window.innerWidth);
    if (!localStorage.getItem('isTutorial') && window.innerWidth <= innerWidth) {
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
        <span>toque fora desse aviso para sair</span>
      </div>

    </div>

  );
}

export default HandleTutorial;
