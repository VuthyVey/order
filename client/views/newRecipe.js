// New Recipe Reactive Object template 
var newRecipe = new ReactiveObj({
	name: "",
	kh_name: "",
	serve: 0,
	duration: 0,
	level: "",
	ingredients: [],
	directions: [],
	owner: ""
});
//return everything from newRecipe reactiveObj to html template
Template.newRecipe.helpers({
	newRecipe: function() {
		return newRecipe.get();
	}
});
//all the events that listen from the html template
Template.newRecipe.events({
	'blur #enRecipeName':function(e,tpl){
		var name = $('#enRecipeName').val();
		var updater = function() {return name};
		newRecipe.update('name', updater);
	},
	'blur #khRecipeName':function(e,tpl){
		var kh_name = $('#khRecipeName').val();
		var updater = function() {return kh_name};
		newRecipe.update('kh_name', updater);
	},
	//when newIngredient button clicked or keyup, all of the values from inputs will update to newRecipe Obj
	'click #newIngredient, keyup .ingredientsInputs': function(e,tpl) {
		//if the event is click or Enter key keyup then the code is fire
		if(e.type == 'click' || (e.type == 'keyup' && e.keyCode == 13)){
			var name = $('#ingredientName');
			var amount = $('#ingredientAmount');
			var unit = $('#ingredientUnit');

			//Random.id() generates random numbers id
			//id need to modify or delete items

			//create objects for push ingredientsObj 
			var ingredientsObj = {id: Random.id(), "name": name.val(), "amount": amount.val(), "unit": unit.val()};
			newRecipe.push('ingredients', ingredientsObj);
			//clear all the inputs text
			name.val("");
			amount.val("");
			unit.val("");
		}
		
	},
	'click #deleteItem': function(e, tpl) {
		var id = this.id;
		var ingredients = newRecipe.get("ingredients");
		
		for(var i = 0; i < ingredients.length; i++) {
			if (ingredients[i].id == id) {
				newRecipe.splice("ingredients", i,1);
				break;
			}
		}
		//newRecipe.splice("ingredients", id-1, 1);			
	},
	'click #editItem': function(e, tpl) {
		console.log(e)
		var id = this.id;
		var ingredients = newRecipe.get("ingredients");
		
		var parentElement = e.target.parentElement;
		parentElement.style.display = "none";
		parentElement.nextElementSibling.style.display = "initial"
		console.log(parentElement); 

		for(var i = 0; i < ingredients.length; i++) {
			if (ingredients[i].id == id) {
				console.log(newRecipe.get("ingredients." + i));
				break;
			}
		}
		//newRecipe.splice("ingredients", id-1, 1);			
	},
	'click #editDone' : function (e, tpl) {
		var editName = $('#editIngredientName');
		var editNmount = $('#editIngredientAmount');
		var editUnit = $('#editIngredientUnit');

		

		//Random.id() generates random numbers id
		//id need to modify or delete items
	},
	'click #newDirection, keyup #direction': function(e,tpl) {
		if(e.type == 'click' || e.keyCode == 13) {
			var direction = $('#direction');
			var directionObj = {text: direction.val()}
			newRecipe.push('directions', directionObj);
			console.log(newRecipe.get())
			direction.val("");
		}
		
	}
});