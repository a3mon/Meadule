'use strict';

function RecipeHelper() {
    return {
        addIngredientStep: function(recipe) {
            var step = {
                instruction: ""
            };

            angular.forEach(recipe.ingredients, function(value) {
                this.instruction = this.instruction.concat(value.quantity + " " + value.unit + " " + value.name + "<br>");
            }, step);

            step.img = recipe.steps[recipe.steps.length-1].img;

            recipe.steps.unshift(step);

            return recipe;
        }
    };
}