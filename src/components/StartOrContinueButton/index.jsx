import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

function StartOrContinueButton({ onClick, buttonDescription }) {
  if (buttonDescription === 'Iniciar Receita') {
    return (
      <Button
        size="lg"
        variant="success"
        className="recipe-status-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ onClick }
      >
        {buttonDescription}
      </Button>
    );
  }
  return (
    <Button
      size="lg"
      variant="primary"
      className="recipe-status-btn"
      data-testid="start-recipe-btn"
      type="button"
      onClick={ onClick }
    >
      {buttonDescription}
    </Button>
  );
}

StartOrContinueButton.defaultProps = {
  onClick: null,
};

StartOrContinueButton.propTypes = {
  onClick: PropTypes.func,
  buttonDescription: PropTypes.string.isRequired,
};

export default StartOrContinueButton;
