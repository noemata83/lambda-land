/* Functions needed:
createCell
createMealRow
createHeaderRow
createTotalRow
mealsBody
mealHeader
mealsTable
*/

const MEALS = [
    { description: 'Breakfast', calories: 460},
    { description: 'Snack', calories: 230 },
    { description: 'Lunch', calories: 603 }
]

// const HEADINGS = [ { description: 'Meal', className='pa2 tl'}, { description: 'Calories', className='pa2 tr'}];

const {table, thead, td, th, tr, tbody} = tags;

function createCell (tag, className, data) {
    return tag({
        className
    }, data);
}

function mealRow (className, meal) {
    return tr({ className}, [
        createCell(td, 'pa2', meal.description),
        createCell(td, 'pa2 tr', meal.calories)
    ]);
}

function mealsBody(className, meals) {
    const rows = R.map(R.partial(mealRow, ['stripe-dark']), meals)
    return tbody({ className }, meals.map(meal => mealRow('stripe-dark', meal)));
}

function createHeaderRow() {
    return thead({ }, [
        createCell(th, 'pa2 tl', 'Meal'),
        createCell(th, 'pa2 tr', 'Calories')
    ]);
}

calorieSum = (acc, meal) => acc + meal.calories;

function createTotalRow(meals) {
    const total = R.pipe(
        R.map(meal => meal.calories),               // Partial application, since Ramda requires both a callback and the source of the data transformation
        R.reduce((acc, calories) => acc + calories, 0),
    )(meals); // partial application completed
    return tr({}, [
        createCell(td, 'pa2 tr', "Total:"),
        createCell(td, 'pa2 tr', total)
    ]);
}

function mealsTable(className, meals) {
    return table({className}, [
        createHeaderRow(),
        mealsBody('', meals),
        createTotalRow(meals)
    ]);
}

const node = document.getElementById('app');

const view = mealsTable('mw5 center w-100 collapse', MEALS);

node.appendChild(view);