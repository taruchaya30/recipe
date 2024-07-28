let newbtn=document.querySelector(".oldbtn");
let recipecontainer=document.querySelector(".recipecontainer");
let search=document.querySelector(".search");
let recipedetails = document.querySelector(".recipedetails");
let closebtn = document.querySelector("#clickme");
let recipepopupbox = document.querySelector(".recipepopupbox");




const  fetchrecipes = async(recipename) =>{
   recipecontainer.innerHTML= "<h4>Searching for your food items....</h4>";
   try{
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipename}`);
    const response= await data.json();

    recipecontainer.innerHTML=" ";
response.meals.forEach(meal => {
    const recipediv=document.createElement("div");
    recipediv.classList.add("recipes");
    recipediv.innerHTML=`
     <img src="${meal.strMealThumb}">
     <h3>${meal.strMeal}</h3>
     <p>${meal.strArea}</p>
       <p>${meal.strCategory}</p>
    
    `
    
    const button=document.createElement("button");
button.innerHTML="View Recipe";
recipediv.appendChild(button);
button.addEventListener("click",()=>{
    showrecipe(meal);
});
    recipecontainer.appendChild(recipediv);
});
}

catch(error){
    recipecontainer.innerHTML= "<h4>Error in finding your food items....</h4>";
}}

const showingredients = (meal) => {
    let Ingredientitems ="";
       for(let i=1;i<=20;i++){
           const Ingredients = meal[`strIngredient${i}`];
           console.log(Ingredients)
           if(Ingredients){
               let IngredientsMeasure= meal [`strMeasure${i}`];
               console.log(IngredientsMeasure)
               Ingredientitems =   Ingredientitems +
               `<li>${IngredientsMeasure} ${Ingredients} </li>`;
               console.log(Ingredientitems)
               console.log(meal)
           }
           else{
               break;
           }
           }
    return Ingredientitems; 
       console.log(meal)
   }


const showrecipe=(meal)=>{
recipedetails.innerHTML=`
<h2>${meal.strMeal}</h2>
<h2>Ingredients:</h2>
<ul>${showingredients(meal)}</ul>
<h2>Instructions:</h2>
<p>${meal.strInstructions}</p>

`

recipedetails.parentElement.style.display ="block";

}

closebtn.addEventListener("click",()=>{
    recipepopupbox.style.display="none";
})




newbtn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   
    let input=search.value.trim();
    if(input === ""){
        recipecontainer.innerHTML= "<h4>Please enter your food item....</h4>";
      }
    else{
    fetchrecipes(input);
    }
})