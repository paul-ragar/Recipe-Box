-- SELECT recipes.recipe_name, recipes.recipe_img, recipes.recipe_notes, recipes.serving_size, ingredients.ingredient_name, ingredients.measurements, directions.directions
-- FROM recipes
-- INNER JOIN ingredients
--   ON $1 = ingredients.recipe_id
-- INNER JOIN directions
--   ON $1 = directions.recipe_id;
SELECT *
from recipes
where recipes.recipe_id = $1
