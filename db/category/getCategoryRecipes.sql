SELECT *
FROM recipes
WHERE recipes.category_id = $1
ORDER BY recipes.recipe_name ASC;
