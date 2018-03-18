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
    { description: 'Lunch', calories: 600 }
]

// const HEADINGS = [ { description: 'Meal', className='pa2 tl'}, { description: 'Calories', className='pa2 tr'}];

const {td, th, tr, tbody} = tags;

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
        createcell(th, 'pa2 tr', 'Calories')
    ]);
}

// function createTotalRow(meals) {
//     const total = meals.reduce( ())
//     return tr()
// }
const node = document.getElementById('app');

const view = mealsBody('', MEALS);

node.appendChild(view);