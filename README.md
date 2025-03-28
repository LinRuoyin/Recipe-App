# Recipe-App

2025.3.17 replaced the code below with shorter codes in index.html
    const recipeName = document.createElement("h1");
    recipeName.classList.add("recipe-name");
    recipeName.innerHTML = dish.title;
    const recipeImg = document.createElement("img");
    recipeImg.classList.add("recipe-img");
    recipeImg.src = dish.picture_url;
    recipeImg.alt = "Recipe Image";
    const recipeIngredients = document.createElement("h1");
    recipeIngredients.innerHTML = "Ingredients";
    recipeIngredients.classList.add("ingredients");
    const ingredientList = document.createElement("ul");
    ingredientList.classList.add("ingredient-list");
    dish.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      if (typeof ingredient.amount !== "string") {
        li.innerHTML = `${ingredient.name}: not provided`;
      } else {
        li.innerHTML = `${ingredient.name}: ${ingredient.amount}`;
      }
      ingredientList.appendChild(li);
    });

    const recipeDescription = document.createElement("h1");
    recipeDescription.innerHTML = "Description";
    recipeDescription.classList.add("description");
    const recipeDescriptionText = document.createElement("p");
    recipeDescriptionText.classList.add("recipe-description");
    recipeDescriptionText.innerHTML = dish.description;

    recipeBox.appendChild(recipeName);
    recipeBox.appendChild(recipeImg);
    recipeBox.appendChild(recipeIngredients);
    recipeBox.appendChild(ingredientList);
    recipeBox.appendChild(recipeDescription);
    recipeBox.appendChild(recipeDescriptionText);
    recipeContainer.appendChild(recipeBox);


2025/3/25 put the recipeObjectArray to JSON file
// const recipesObjectArray = [
//   {
//     id: 1,
//     title: "Gløgg",
//     picture_url:
//       "https://true-north-kitchen.com/wp-content/uploads/2020/12/swedish-glo%CC%88gg-1.jpg",
//     ingredients: [
//       { name: "Orange zest", amount: "0.5" },
//       { name: "Water", amount: "200" },
//       { name: "Sugar", amount: "275 g" },
//       { name: "Whole cloves", amount: "5" },
//       { name: "Cinnamon sticks", amount: "2" },
//       { name: "Spice", amount: undefined },
//       { name: "Bottle of red wine", amount: "1" },
//       { name: "Raisins", amount: "100 g" },
//       { name: "Slipped Almonds", amount: "50 g" },
//     ],
//     description: "Mix everything, heat it, and you are good to go!",
//   },
//   {
//     id: 2,
//     title: "Smørrebrød",
//     picture_url:
//       "https://images.food52.com/7inn08DiMvBhIQBLF0gDgieVNnU=/fit-in/1200x1200/5b89c0f4-250d-4810-bb03-75440a7327c0--2018-1206_sponsored_follow-your-heart_smorrebrod_3x2_rocky-luten_002_1-.jpg",
//     ingredients: [
//       { name: "Rye bread", amount: "2 slices" },
//       { name: "Butter", amount: "20 g" },
//       { name: "Herring", amount: "50 g" },
//       { name: "Red onion", amount: "0.5" },
//       { name: "Capers", amount: "1 tbsp" },
//       { name: "Egg", amount: "1" },
//     ],
//     description:
//       "Spread butter on rye bread and layer the toppings as you like!",
//   },
//   {
//     id: 3,
//     title: "Æbleskiver",
//     picture_url:
//       "https://spisbedre-production-app.imgix.net/images/recipes/klassiske-aebleskiver_11702.jpg?auto=format&ar=655%3A500&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5005652386656991&fp-z=1.0011317567567568&w=1446",
//     ingredients: [
//       { name: "Flour", amount: "250 g" },
//       { name: "Milk", amount: "300 ml" },
//       { name: "Eggs", amount: "3" },
//       { name: "Sugar", amount: "2 tbsp" },
//       { name: "Butter", amount: "50 g" },
//       { name: "Baking powder", amount: "1 tsp" },
//       { name: "Cardamom", amount: "0.5 tsp" },
//       { name: "Salt", amount: "1 pinch" },
//     ],
//     description:
//       "Mix all ingredients and cook in an æbleskiver pan until golden brown.",
//   },
//   {
//     id: 4,
//     title: "Rødgrød med fløde",
//     picture_url:
//       "https://meyers.dk/media/13095/roedgroed_med_floede.jpg?anchor=center&mode=crop&width=1260&format=jpeg&quality=80&rnd=132169219430000000",
//     ingredients: [
//       { name: "Strawberries", amount: "300 g" },
//       { name: "Red currants", amount: "200 g" },
//       { name: "Sugar", amount: "100 g" },
//       { name: "Water", amount: "250 ml" },
//       { name: "Cornstarch", amount: "2 tbsp" },
//       { name: "Heavy cream", amount: "100 ml" },
//     ],
//     description:
//       "Cook berries with sugar, thicken with cornstarch, and serve with cream.",
//   },
//   {
//     id: 5,
//     title: "Frikadeller",
//     picture_url:
//       "https://ff234d58.rocketcdn.me/wp-content/uploads/2020/10/IMG_1100-860x802.jpg",
//     ingredients: [
//       { name: "Ground pork", amount: "500 g" },
//       { name: "Egg", amount: "1" },
//       { name: "Milk", amount: "100 ml" },
//       { name: "Onion", amount: "1" },
//       { name: "Flour", amount: "2 tbsp" },
//       { name: "Salt", amount: "1 tsp" },
//       { name: "Pepper", amount: "0.5 tsp" },
//       { name: "Butter", amount: "50 g" },
//     ],
//     description:
//       "Mix the ingredients, form small patties, and fry until golden brown.",
//   },
// ];
