SELECT recipes.recipe_img
FROM recipes
WHERE recipes.category_id = $1;
