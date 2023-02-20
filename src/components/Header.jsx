import React, { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';

function Header() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      setLoading(true);
      const userResponse = await getUser();
      setUser(userResponse.name);
      setLoading(false);
    };
    fetchName();
  }, []);

  return (
    <div data-testid="header-component">
      Header
      {loading ? (
        <h2>Carregando...</h2>
      ) : (
        <h3 data-testid="header-user-name">{user}</h3>
      )}
    </div>
  );
}

export default Header;
