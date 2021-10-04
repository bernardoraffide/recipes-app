import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard({ index, recipe }) {
  return (
    <div
      className="recommendation-card"
      key={ index }
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        className="recommendation-thumb"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt=""
        height="180px"
        width="180px"
      />
      <p data-testid={ `${index}-recomendation-title` }>
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecommendationCard;
