select recipe_id, recipe_name, recipe_img, serving_size
from recipes
where recipes.user_id = $1
order by recipe_name asc;
