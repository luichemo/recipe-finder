// src/components/home.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  ingredient: yup.string().required('Ingredient is required'),
});

const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate(`/recipes?ingredient=${data.ingredient}`);
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="ingredient" {...register('ingredient')} placeholder="Enter ingredient" />
        {errors.ingredient && <p>{errors.ingredient.message}</p>}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;
