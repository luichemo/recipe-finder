// src/components/recipedetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: '1ff8780de9fa42debf3450edd5c84828'
          }
        });
        setRecipe(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();

    // Check if recipe is already favorited
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorited(favorites.some(fav => fav.id === parseInt(id)));
  }, [id]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Toggle favorite status
    if (isFavorited) {
      favorites = favorites.filter(fav => fav.id !== parseInt(id));
    } else {
      favorites.push(recipe); // Push whole recipe object
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      {/* Render instructions as HTML using dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      <button onClick={handleFavorite}>
        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </motion.div>
  );
};

export default RecipeDetail;
