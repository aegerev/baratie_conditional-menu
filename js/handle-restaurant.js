const dateInput = document.getElementById('currentDateTime');
const nameInput = document.getElementById('customerName');
const greetingDisplay = document.getElementById('greetingMessage');
const mealRecommendationDisplay = document.getElementById('mealRecommendation');
const drinkRecommendationDisplay = document.getElementById('drinkRecommendation');
const dessertRecommendationDisplay = document.getElementById('dessertRecommendation');
const fridaySpecial = document.getElementById('fridaySpecial');
const loyaltyBonusDisplay = document.getElementById('loyaltyBonus');
const fridayBlock = document.getElementById('friday');
const visitsInput = document.getElementById('visitCount');

let guestName = "Guest";
let greeting = "Hello";

function debounce(func, delay) {
	let debounceTimer;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
}

let currentHour = new Date().getHours();
let currentDay = new Date().getDay();
let dishRecommendation;
let drinkRecommendation;
let dessertRecommendation;
let specialDinnerCombo;
let loyaltyBonus;

if(!dateInput.value) {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1 >= 10 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
	const date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`;
	const hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`;
	const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`;
	dateInput.value = `${year}-${month}-${date}T${hour}:${minutes}`;
}

function handleGreetingAndDishRecommendation(currentHour) {
	let greeting, dishRecommendation;

    return {
		greeting,
		dishRecommendation
	};
}

function handleDrinkRecommendation(greeting) {
	let drinkRecommendation = "";

    return drinkRecommendation;
}

document.addEventListener('DOMContentLoaded', () => {
	nameInput.addEventListener('input', debounce((event) => {
		guestName = event.target.value;
		nameInput.value = guestName;
		greetingDisplay.innerHTML = `${greeting}, ${guestName ? guestName : "Guest"}!`;
	}, 500));

	visitsInput.addEventListener('input', (event) => {
		const numVisitsThisMonth = parseInt(event.target.value);
		if(!numVisitsThisMonth && numVisitsThisMonth !== 0) {
			visitsInput.value = "";
		} else {
			visitsInput.value = `${numVisitsThisMonth}`;
			loyaltyBonus = handleLoyaltyBonus(numVisitsThisMonth, currentHour);
			loyaltyBonusDisplay.innerHTML = loyaltyBonus;
		}
	})

	handleDateChange(currentHour, currentDay);

	dateInput.addEventListener('change', (event) => {
		dateInput.value = event.target.value;
		currentHour = new Date(event.target.value).getHours();
		currentDay = new Date(event.target.value).getDay();
		handleDateChange(currentHour, currentDay);
	});
})