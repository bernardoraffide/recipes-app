import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

function FinishRecipeButton({ enableBtn, recipe, type, handleFinished }) {
  const history = useHistory();

  const handleClick = (setType, setRecipe) => {
    handleFinished(setType, setRecipe);
    history.push('/receitas-feitas');
  };

  return (
    <Button
      className="finish-recipe-btn"
      variant="warning"
      data-testid="finish-recipe-btn"
      disabled={ enableBtn }
      onClick={ () => handleClick(type, recipe) }
    >
      Finalizar Receita
    </Button>
  );
}

FinishRecipeButton.propTypes = {
  enableBtn: PropTypes.bool.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  handleFinished: PropTypes.func.isRequired,
};

export default FinishRecipeButton;
