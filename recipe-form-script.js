document.querySelector("#home-page").addEventListener('click',function(){
  window.location.href = "home-page.html";
})




function addIngredient(){
const IngredientList = document.querySelector(".ingredient-list")

const addDiv = document.createElement("div")
addDiv.classList.add("ingredient-item")

const ingredientNameInput= document.createElement("input")
ingredientNameInput.type = 'text'
ingredientNameInput.classList.add("ingredient-name")
ingredientNameInput.placeholder="Ingredient"
ingredientNameInput.required = true

const amountAndUnitInput = document.createElement("input")
amountInput.type = 'text'
amountInput.classList.add("ingredient-amount-unit")
amountInput.placeholder = "Amount and Unit";
amountInput.required = true;



addDiv.appendChild(ingredientNameInput)
addDiv.appendChild(amountAndUnitInput)

IngredientList.appendChild(addDiv)

}


document.querySelector("#add-ingredient-button").addEventListener('click',addIngredient)