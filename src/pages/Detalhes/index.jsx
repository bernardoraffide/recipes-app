import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import FavoriteButton from '../../components/FavoriteButton';
import RecommendationCard from '../../components/RecommendationCard';
import StartOrContinueButton from '../../components/StartOrContinueButton';

import { useRecipes } from '../../context';
import { useDetails } from '../../context/DetailsContext';

import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import ShareButton from '../../components/ShareButton';
import VideoPlayer from '../../components/VideoPlayer';
import RecipeCategory from '../../components/RecipeCategory';

import './styles.css';

function Detalhes() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();

  const [isCopied, setIsCopied] = useState(false);

  const {
    item,
    ingredients,
    recommendations,
    fetchRecipe,
    fetchRecommendations,
  } = useDetails();

  const {
    finishedRecipes,
    favoriteRecipes,
    handleInProgress,
    meals: { inProgress: mealsInProgress },
    cocktails: { inProgress: cocktailsInProgress },
  } = useRecipes();

  useEffect(() => {
    fetchRecommendations(pathname);
    fetchRecipe(pathname, id);

    return setIsCopied(false);
  }, [pathname, fetchRecipe, fetchRecommendations, id]);

  const handleCopy = (bool) => {
    setIsCopied(bool);
  };

  const renderIngredients = () => ingredients.map((ingredient, index) => (
    <li
      className="recipe-ingredient"
      key={ index }
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      {ingredient}
    </li>
  ));

  // Lógica do CSS do Carrossel feita com ajuda do Lucas Caribé
  const renderRecommendations = () => (
    <section className="recommendations-section">
      {recommendations.map((recipe, index) => {
        const MAX_RECOMMENDATIONS_CARDS = 6;
        if (index < MAX_RECOMMENDATIONS_CARDS) {
          return <RecommendationCard key={ index } index={ index } recipe={ recipe } />;
        } return null;
      })}
    </section>
  );

  const handleButton = (inProgress, path) => {
    const checkIfIsFinished = finishedRecipes.some((finished) => finished.id === id);
    if (!checkIfIsFinished && !inProgress[id]) {
      return (
        <StartOrContinueButton
          onClick={ () => {
            handleInProgress(path, id, ingredients);
            history.push(`/${path}/${id}/in-progress`);
          } }
          buttonDescription="Iniciar Receita"
        />
      );
    } if (inProgress[id]) {
      return (
        <StartOrContinueButton
          onClick={ () => {
            handleInProgress(path, id, ingredients);
            history.push(`/${path}/${id}/in-progress`);
          } }
          buttonDescription="Continuar Receita"
        />
      );
    }
    return null;
  };

  const typeOptions = {
    comidas: (inProgress, path) => handleButton(inProgress, path),
    bebidas: (inProgress, path) => handleButton(inProgress, path),
  };

  const checkRecipeStatus = (inProgress, path) => typeOptions[path](inProgress, path);

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

  const renderDetails = (path, type, property, inProgress) => {
    if (!item[type]) {
      return <span>Carregando...</span>;
    } return (
      <main className="details-main-container">
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
        <ul className="ingredients-list">
          <h3>Ingredients</h3>
          {renderIngredients()}
        </ul>
        <section className="recipe-instructions">
          <h3>Instructions</h3>
          <p data-testid="instructions">{item[type][0].strInstructions}</p>
        </section>
        {type === 'meal'
        && <VideoPlayer item={ item } type={ type } property={ property } />}
        {renderRecommendations()}
        {checkRecipeStatus(inProgress, path)}
      </main>
    );
  };

  if (pathname.includes('comidas')) {
    return renderDetails('comidas', 'meal', 'Meal', mealsInProgress);
  }
  return renderDetails('bebidas', 'drink', 'Drink', cocktailsInProgress);
}

export default Detalhes;
