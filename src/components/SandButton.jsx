import React from 'react';

function SandButton() {
  const handleSand = (e) => {
    e.preventDefault();
    const header = document.getElementById('header');
    header.classList.add('display-change');
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSand();
    }
  }

  return (
    <button
      type="button"
      onClick={ handleSand }
      onKeyDown={ handleKeyPress }
      className="btn menu-sand"
      aria-label="Menu"
      tabIndex="0"
    >
      <i className="fa-solid fa-bars" />
    </button>
  );
}

export default SandButton;
