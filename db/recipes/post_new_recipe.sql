insert into recipes (recipe_name, recipe_img, serving_size, category_id, recipe_notes, user_id)
values ($1, $2, $3, $4, $5, $6)
RETURNING *
