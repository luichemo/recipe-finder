// src/components/Favorites.js
import React from 'react';

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (!favorites.length) return <p>No favorites yet!</p>;

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <ul>
        {favorites.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>Instructions: {recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
