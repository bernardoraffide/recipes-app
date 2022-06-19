import React from 'react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';
import ReceitasFeitas from './index';

describe('testes da tela de receitas feitas', () => {
  test('se renderiza os elementos de acordo com o protótipo', () => {
    const mockedFinishedRecipes = [{
      id: '52861',
      type: 'comida',
      area: 'American',
      category: 'Dessert',
      alcoholicOrNot: '',
      name: 'Peanut Butter Cheesecake',
      image: 'https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg',
      doneDate: '04/10/2021',
      tags: [
        'Cake',
        'Desert',
        'Treat',
        'UnHealthy',
        'Speciality',
      ],
    },
    {
      alcoholicOrNot: 'Non alcoholic',
      area: '',
      category: 'Coffee / Tea',
      doneDate: '05/10/2021',
      id: '12774',
      image: 'https://www.thecocktaildb.com/images/media/drink/uyrpww1441246384.jpg',
      name: 'Masala Chai',
      tags: [],
      type: 'bebida',
    },
    ];
    const { history } = renderWithRouterAndContext(<ReceitasFeitas />);
    history.push('./receitas-feitas');
    useEffect(() => {
      localStorage.getItem = jest.fn().mockReturnValue(mockedFinishedRecipes);
      const mockedRecipesArrayFromLocal = localStorage.getItem();
    }, []);
    expect(mockedRecipesArrayFromLocal[0]).toHaveAttribute('data-testid');
  });
});
