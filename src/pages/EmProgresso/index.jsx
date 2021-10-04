import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import FinishRecipeButton from '../../components/FinishRecipeButton';
import IngredientCheckbox from '../../components/IngredientCheckbox';
import RecipeCategory from '../../components/RecipeCategory';
import VideoPlayer from '../../components/VideoPlayer';

import { useRecipes } from '../../context';
import { useDetails } from '../../context/DetailsContext';

import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

import './styles.css';

function EmProgresso() {
  const [isCopied, setIsCopied] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [ingredientsChecked, setIngredientsChecked] = useState({});

  const { pathname } = useLocation();
  const { id } = useParams();

  const {
    favoriteRecipes,
    handleFinished,
  } = useRecipes();

  const {
    item,
    ingredients,
    fetchRecipe,
  } = useDetails();

  useEffect(() => {
    const handleCheck = () => {
      const getChecksFromLocalStorage = (localStorage.getItem('checkedIngredients'));
      if (getChecksFromLocalStorage) {
        setIngredientsChecked(
          JSON.parse(localStorage.getItem('checkedIngredients')),
        );
      }
    };

    handleCheck();
  }, []);

  useEffect(() => {
    fetchRecipe(pathname, id);

    return setIsCopied(false);
  }, [pathname, id, fetchRecipe]);

  useEffect(() => {
    if (Object.keys(ingredientsChecked).length > 0) {
      localStorage
        .setItem('checkedIngredients', JSON.stringify({ ...ingredientsChecked }));
    }
  }, [ingredientsChecked]);

  const handleCopy = (bool) => {
    setIsCopied(bool);
  };

  const renderIngredients = () => (
    <form className="ingredients-checkbox-list">
      { ingredients.map((ingredient, index) => (
        <IngredientCheckbox
          key={ index }
          ingredient={ ingredient }
          index={ index }
          ingredientsChecked={ ingredientsChecked }
          setIngredientsChecked={ setIngredientsChecked }
          setAllChecked={ setAllChecked }
        />
      ))}
    </form>
  );

  const checkFavorites = (recipe, type, property) => {
    const checkIfIsFavorite = favoriteRecipes
      .some((fav) => fav.id === recipe[`id${property}`]);
    if (checkIfIsFavorite) {
      return (
        <FavoriteButton
          colorBeforeClick={ blackHeart }
          colorAfterClick={ whiteHeart }
          recipe={ recipe }
          type={ type }
        />
      );
    } return (
      <FavoriteButton
        colorBeforeClick={ whiteHeart }
        colorAfterClick={ blackHeart }
        recipe={ recipe }
        type={ type }
      />
    );
  };

  const renderDetails = (path, type, property) => {
    if (!item[type]) {
      return <span>Carregando...</span>;
    } return (
      <main className="inprogress-main-container">
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ item[type][0][`str${property}Thumb`] }
          alt={ item[type][0][`str${property}`] }
          height="300px"
          width="300px"
        />
        <h1
          className="recipe-title"
          data-testid="recipe-title"
        >
          { item[type][0][`str${property}`] }
        </h1>
        <RecipeCategory item={ item } type={ type } />
        <section className="btns-section">
          <ShareButton
            path={ path }
            id={ item[type][0][`id${property}`] }
            icon={ shareIcon }
            handleCopy={ handleCopy }
          />
          {checkFavorites(item[type][0], type, property)}
          {isCopied && <p>Link copiado!</p> }
        </section>
        <section className="ingredients-section">
          <h3>Ingredients</h3>
          {renderIngredients()}
        </section>
        <section className="recipe-instructions">
          <h3>Instructions</h3>
          <p data-testid="instructions">{item[type][0].strInstructions}</p>
        </section>
        {type === 'meal'
        && <VideoPlayer item={ item } type={ type } property={ property } />}
        <FinishRecipeButton
          enableBtn={ !allChecked }
          handleFinished={ handleFinished }
          recipe={ item[type][0] }
          type={ type }
        />
      </main>
    );
  };

  if (pathname.includes('comidas')) {
    return renderDetails('comidas', 'meal', 'Meal');
  }
  return renderDetails('bebidas', 'drink', 'Drink');
}

export default EmProgresso;
