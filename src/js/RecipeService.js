'use strict';

function RecipeService($resource) {
    var url = './api/recipe.json';
    return $resource(url);
}
