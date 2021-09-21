import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  user: '', // E-mail do usuário conectado,
  tokens: {
    mealsToken: '', // Token de acesso a API de comidas
    cocktailsToken: '', // Token de acesso a API de drinks
  },
  page: '', // Página atual (comida ou bebidas)
});

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider>
    { children }
  </AuthContext.Provider>
);

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(Proptypes.elements).isRequired,
};

export const useAuth = () => useContext(AuthContext);
