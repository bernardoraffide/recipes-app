import React from 'react';
import PropTypes from 'prop-types';

function RecipeCategory({ item, type }) {
  return (
    <h2 className="recipe-category" data-testid="recipe-category">
      { item[type][0].strAlcoholic
        ? item[type][0].strAlcoholic : item[type][0].strCategory }
    </h2>
  );
}

RecipeCategory.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeCategory;
