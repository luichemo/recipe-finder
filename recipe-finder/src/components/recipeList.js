// src/components/recipelist.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useQuery();
  const ingredient = query.get('ingredient');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
          params: {
            ingredients: ingredient,
            number: 10,
            apiKey: '1ff8780de9fa42debf3450edd5c84828'
          }
        });
        setRecipes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [ingredient]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipes.length) return <p>No recipes found for {ingredient}</p>;

  return (
    <div>
      <h1>Recipes with {ingredient}</h1>
      <ul>
        {recipes.map((recipe) => (
          <motion.li
            key={recipe.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
