function fetchdata(value){
	fetch("http://localhost:3001/recipes")
		.then(function (response) {
		return response.json();
  	})
	.then(function (data) {
		if(value == "listofrecipes"){
			appendlistofrecipes(data);
		} else if (value == 'recipes'){
			appendrecipes(data);
		} else{
			appendspecials(data);
		}
	})
	.catch(function (err) {
   		console.log(err);
	});
}

function appendlistofrecipes(data) {
	var listtab = document.getElementById("listtab");
	var specialscontainer = document.getElementById("specialstab");
	var recipetab = document.getElementById("recipetab");

	listtab.innerHTML = "";
	specialscontainer.innerHTML = "";
	recipetab.innerHTML = "";

	var mainContainer = document.getElementById("listtab");
	for (var i = 0; i < data.length; i++) {
	    var div = document.createElement("div");
	    div.innerHTML = 'Recipe: ' + data[i].title;
	    mainContainer.appendChild(div);
	}
}

function appendrecipes(data){
	var listtab = document.getElementById("listtab");
	var specialscontainer = document.getElementById("specialstab");
	var recipetab = document.getElementById("recipetab");

	listtab.innerHTML = "";
	specialscontainer.innerHTML = "";
	recipetab.innerHTML = "";

	var mainContainer = document.getElementById("recipetab");
	mainContainer.innerHTML += "<div class='dropdown'>"
		+ "<button class='dropbtn'>Recipe</button>"
		+ "<div class='dropdown-content' id='divdropdown'></div></div>";

	for (var i = 0; i < data.length; i++) {
	    var divdropdown = document.getElementById("divdropdown");
	    divdropdown.innerHTML += "<a href='#' id='" + data[i].uuid + "' onclick='recipeclicked(this.id)'>" + data[i].title + "</a>";
	}
}

function recipeclicked(id){
	console.log(id);

	fetch("http://localhost:3001/recipes")
		.then(function (response) {
		return response.json();
  	})
	.then(function (data) {
		var listtab = document.getElementById("listtab");
		listtab.innerHTML = "";

		var specialstab = document.getElementById("specialstab");
		specialstab.innerHTML = "";

		var recipedetailtab = document.getElementById("recipedetailtab");
		var recipedetailvalue = document.getElementById("recipedetailvalue").value;

		if(recipedetailvalue == "none"){
			console.log("HANNA");
			var recipetab = document.getElementById("recipetab");
			recipetab.innerHTML += "<div class='recipedetailtab' id='recipedetailtab'>"
			+ "</div>";

			for(var i=0; i<data.length; i++){
				if(data[i].uuid == id){
					var recipedetailtab = document.getElementById('recipedetailtab');
					recipedetailtab.innerHTML += "<div><b>Title:</b> " + data[i].title + "</div>"
					+ "<div><b>Description: </b>" + data[i].description + "</div>"
					+ "<div><img src='" + data[i].images.full + "'></div>"
					+ "<div><b>Details:</b> </div>"
					+ "<div><b>Servings: </b>" + data[i].servings + "</div>"
					+ "<div><b>Prep Time: </b>" + data[i].prepTime + " mins</div>"
					+ "<div><b>Cook Time: </b>" + data[i].cookTime + " mins</div>"
					+ "<div><b>Post Time: </b>" + data[i].postDate + " mins</div>"
					+ "<div><b>Edit Date: </b>" + data[i].editDate + " mins</div>"
					+ "<div><b>Ingredients:</b></div>";

					for (var u=0; u<data[i].ingredients.length; u++){
						recipedetailtab.innerHTML += "<div>" + data[i].ingredients[u].amount + " " + data[i].ingredients[u].measurement + " of " + data[i].ingredients[u].name + "</div>";
					}

					recipedetailtab.innerHTML += "<div><b>Directions:</b></div>";

					for (var u=0; u<data[i].directions.length; u++){
						if(data[i].directions[u].optional == 'true'){
							recipedetailtab.innerHTML += "<div>" + data[i].directions[u].instructions + " <i>Optional</i></div>";
						} else{
							recipedetailtab.innerHTML += "<div>" + data[i].directions[u].instructions + "</div>";
						}
						
					}
				}
			}

			document.getElementById("recipedetailvalue").value = "yes";
		} else{
			document.getElementById("recipedetailvalue").value = "none";
			var recipedetailtab = document.getElementById("recipedetailtab");
			recipedetailtab.innerHTML = "";
			recipeclicked(id);
		}
	})
	.catch(function (err) {
   		console.log(err);
	});
}

function appendspecials(recipes){
	fetch("http://localhost:3001/specials")
		.then(function (response) {
		return response.json();
  	})
	.then(function (specials) {
		var listtab = document.getElementById("listtab");
		var specialscontainer = document.getElementById("specialstab");
		var recipetab = document.getElementById("recipetab");

		listtab.innerHTML = "";
		specialscontainer.innerHTML = "";
		recipetab.innerHTML = "";

		var mainContainer = document.getElementById("specialstab");

		for(var x=0; x<specials.length; x++){
			for(var v=0; v<recipes.length; v++){
				for(var c=0; c<recipes[v].ingredients.length; c++){
					if(recipes[v].ingredients[c].uuid == specials[x].ingredientId){
						mainContainer.innerHTML += "<div><b>Ingredient: </b>" + recipes[v].ingredients[c].name + "</div>"
							+ "<div><b>Title: </b>" + specials[x].title + "</div>"
							+ "<div><b>Type: </b>" + specials[x].type + "</div>"
							+ "<div><b>Text: </b>" + specials[x].text + "</div>"
							+ "<br>"
					}
				}
			}
		}
	})
	.catch(function (err) {
   		console.log(err);
	});
}

function addrecipe(){
	var titleplaceholder = document.getElementById('titleplaceholder');
	titleplaceholder.innerHTML = "Title: <input type'text' value='' placeholder'title...' id='addedittitle'>";

	var modal = document.getElementById("addeditmodal");
	modal.style.display = "block";

	document.getElementById('modalheader').innerHTML = 'Add Recipe';

	document.getElementById('updateoradd').value = 'add';
}

function addingredient(){
	var mainContainer = document.getElementById('ingredientstab');
	var ingredientctr = document.getElementById('ingredientctr').value;

	var ingctr = parseInt(ingredientctr);

	var ctr = ingctr + 1;

	document.getElementById('ingredientctr').value = ctr;

	mainContainer.innerHTML += "<div id='ingredientdiv" + ctr + "'>"
		+ "<span style='padding-right: 5px'>Amount: <input type='text' id='amount" + ctr + "' class='modallong'></span><span style='padding-right: 5px'>Measurement: <input type='text' id='measurement" + ctr + "' ></span><span style='padding-right: 5px'>Name: <input type='text' id='name" + ctr + "'></span>"
		+ "<i class='fa fa-minus-square-o' style='font-size:24px' id='delete" + ctr + "' onclick='deleteingredient(id)'></i>"
    + "</div>";

    console.log(ctr);
}

function deleteingredient(id) {
	var str = id.slice(6);
	console.log(str);
	document.getElementById('ingredientdiv' + str).remove();
}

function updaterecipe(){
	document.getElementById('updateoradd').value = 'edit';

	var titleplaceholder = document.getElementById('titleplaceholder');
	titleplaceholder.innerHTML = "Title: <select id='addedittitle' onchange='pullrecipe()'>"
		+ "<option></option>"
		+ "</select>";

	document.getElementById('modalheader').innerHTML = 'Edit Recipe';

	var addedittitle = document.getElementById('addedittitle');

	fetch("http://localhost:3001/recipes")
		.then(function (response) {
		return response.json();
  	})
	.then(function (recipes) {
		for(i=0; i<recipes.length; i++){
			addedittitle.innerHTML += "<option value='" + recipes[i].uuid + "' id='" + recipes[i].uuid + "'>" + recipes[i].title + "</option>";
		}
	})
	.catch(function (err) {
   		console.log(err);
	});

	var modal = document.getElementById("addeditmodal");
	modal.style.display = "block";	
}

function pullrecipe() {
	fetch("http://localhost:3001/recipes")
		.then(function (response) {
		return response.json();
  	})
	.then(function (recipes) {
		var id = document.getElementById('addedittitle').value;
		var mainContainer = document.getElementById('ingredientstab');
		var ctr = 0;

		var ingredientstab = document.getElementById('ingredientstab');
		ingredientstab.innerHTML = "";

		for(i=0; i<recipes.length; i++){
			if(recipes[i].uuid == id){
				document.getElementById('addeditdesc').value = recipes[i].description;
				document.getElementById('addeditservings').value = recipes[i].servings;
				document.getElementById('addeditprep').value = recipes[i].prepTime;
				document.getElementById('addeditcook').value = recipes[i].cookTime;

				for(u=0; u<recipes[i].ingredients.length; u++){
					ctr = ctr + 1;
					mainContainer.innerHTML += "<div id='ingredientdiv" + ctr + "'>"
						+ "<span style='padding-right: 5px'>Amount: <input type='text' id='amount" + ctr + "' value='" + recipes[i].ingredients[u].amount + "' class='modallong'></span><span style='padding-right: 5px'>Measurement: <input type='text' id='measurement" + ctr + "' value='" + recipes[i].ingredients[u].measurement + "'></span><span style='padding-right: 5px'>Name: <input type='text' id='name" + ctr + "' value='" + recipes[i].ingredients[u].name + "'></span>"
						+ "<i class='fa fa-minus-square-o' style='font-size:24px' id='delete" + ctr + "' onclick='deleteingredient(id)'></i>"
				    + "</div>";
				}
			}
		}
	})
	.catch(function (err) {
   		console.log(err);
	});
}

function closemodal(){
	document.getElementById('addeditdesc').value = '';
	document.getElementById('addeditservings').value = "";
	document.getElementById('addeditprep').value = "";
	document.getElementById('addeditcook').value = "";
	var ingredientstab = document.getElementById('ingredientstab');
	ingredientstab.innerHTML = "";
	document.getElementById('addeditmodal').style.display='none';
}

function savebtn(){
	var flag = document.getElementById('updateoradd').value;

	if(flag == 'add'){
		if(!alert('Reciped added!')){window.location.reload();}
	} else{
		if(!alert('Recipe updated!	')){window.location.reload();}
	}
}
