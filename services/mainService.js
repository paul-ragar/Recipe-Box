angular.module('myApp').service('mainService', function($http) {

this.getCategories = function(id) {
  return $http({
    method: 'GET',
    url: '/categories/' + id
  }).then(function(response) {
    return response;
  });
}

this.getRecipeImages = function(id) {
  return $http({
    method: 'GET',
    url: '/recipe_images/' + id
  });
}

this.getRecipes = function(id) {
  return $http({
    method: 'GET',
    url: '/recipes/' + id
  }).then(function(response) {
    return response;
  });
}

this.getCategoryRecipes = function(id) {
    return $http({
      method: 'GET',
      url: '/get_category_recipes/' + id
    }).then(function(response) {
      return response;
    });
}

this.getDisplayRecipe = function(recipe_id) {
  console.log(recipe_id);
  return $http({
    method: 'GET',
    url: '/display_recipe/' + recipe_id
  }).then(function(response) {
    return response.data;
  });
}

this.addCategory = function(name, user_id) {
  return $http({
    method: 'POST',
    url: '/new_category',
    data: {
      category_name: name,
      user_id: user_id
    }
  })
}

this.deleteCategory = function(deleted_one) {
  // console.log(deleted_one);
  return $http({
    method: 'DELETE',
    url: '/delete_category/' + deleted_one
  }).then(function(response){
// console.log(response);
    return response
  })
}

this.putNewCategory = function(id, name) {
  return $http({
    method: 'PUT',
    url: '/put_category/' + id,
    data: {
      category_name: name
    }
  })
}

this.postNewRecipe = function(name, img, serving, category, notes, id) {
  return $http({
    method: 'POST',
    url: '/new_recipe',
    data: {
      recipe_name: name,
      recipe_img: img,
      serving_size: serving,
      category_id: category,
      recipe_notes: notes,
      user_id: id
    }
  })
}
this.newIngredient = function(name, measurement, recipe_id) {
  return $http({
    method: 'POST',
    url: '/new_ingredient',
    data: {
      ingredient_name: name,
      measurements: measurement,
      recipe_id: recipe_id
    }
  })
}
this.newDirection = function(direction, recipe_id) {
  return $http({
    method: 'POST',
    url: '/new_direction',
    data: {
      directions: direction,
      recipe_id: recipe_id
    }
  })
}


//AUTHSERVICE//
this.login = function(user) {
    return $http({
      method: 'post',
      url: '/login',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.logout = function() {
    return $http({
      method: 'get',
      url: '/logout'
    }).then(function(response) {
      return response;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    });
  };

  this.registerUser = function(user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.editUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: "/user/" + id,
      data: user
    }).then(function(response) {
      return response;
    });
  };

  //USERSERVICE//
  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      return response;
    });
  };

  this.getUserById = function(id) {
    return $http({
      method: 'GET',
      url: '/user?_id=' + id
    }).then(function(response) {
      return response;
    });
  };
});
