import axios from "axios";

const api = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1",
});

export const getRandomRecipe = () => api.get("/random.php");
export const searchRecipes = (query: string) =>
    api.get(`/search.php?s=${query}`);
export const filterByCategory = (category: string) =>
    api.get(`/filter.php?c=${category}`);
export const getRecipeDetails = (id: string) => api.get(`/lookup.php?i=${id}`);

export default api;
