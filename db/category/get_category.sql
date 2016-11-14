SELECT *
FROM category
WHERE category.user_id = $1
ORDER BY category_name ASC;
--
-- SELECT category.category_id, category.category_name, recipes.recipe_img
-- from category, recipes
-- where category.category_id = recipes.category_id
-- order by category.category_name ASC

-- SELECT category.category_id, category.category_name, recipes.recipe_img
-- FROM category
-- LEFT JOIN recipes
-- ON category.category_id = recipes.category_id
-- ORDER BY category.category_name ASC
