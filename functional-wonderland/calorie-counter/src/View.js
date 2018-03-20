import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { showFormMsg, mealInputMsg, calorieInputMsg, saveMealMsg, deleteMealMsg, editMealMsg } from './Update';

import * as R from 'ramda';

const { pre, div, h1, button, form, label, input, table, tr, td, th, thead, tbody, i } = hh(h);

function fieldSet(labelText, inputValue, oninput) {
    return div([
        label({className: 'db mb1' }, labelText),
        input({className: 'pa2 input-reset ba w-100 mb2',
        type: 'text',
        value: inputValue,
        oninput})
    ]);
}

function buttonSet(dispatch) {
    return div([
        button({className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
                type: 'submit'}, 'Save'),
        button({className: 'f3 pv2 ph3 bn bg-light-gray dim',
                type: 'button',
                onclick: () => dispatch(showFormMsg(false))}, 'Cancel')
    ]);
}

function formView(dispatch, model) {
    const { description, calories, showForm } = model;
    if (showForm) {
        return form(
            { 
                className: 'w-100 mv2',
                onsubmit: e => {
                    e.preventDefault();
                    dispatch(saveMealMsg);
                }
            }, 
            [
                fieldSet('Meal',  description, e => dispatch(mealInputMsg(e.target.value))),
                fieldSet('Calories', calories || '', e => dispatch(calorieInputMsg(e.target.value))),
                buttonSet(dispatch)
            ]
        );    
    }
    return button(
        {
            className: 'f3 pv2 ph3 bg-blue white bn ',
            onclick: () => dispatch(showFormMsg(true))
        }, 'Add Meal');
}

function createCell (tag, className, data) {
    return tag({
        className
    }, data);
}

function mealRow (dispatch, className, meal) {
    return tr({ className}, [
        createCell(td, 'br pa2', meal.description),
        createCell(td, 'br pa2 tr', meal.calories),
        createCell(td, 'pa2', [ 
            i({ className: 'ph1 fa fa-trash-o pointer',
                onclick: () => dispatch(deleteMealMsg(meal.id))
            }),
            i({ className: 'ph1 fa fa-pencil-square-o pointer',
                onclick: () => dispatch(editMealMsg(meal.id))
            })
        ])
    ]);
}

function mealsBody(dispatch, className, meals) {
    const rows = R.map(R.partial(mealRow, [dispatch, 'stripe-dark']), meals);
    const rowsWithTotal = [...rows, createTotalRow(meals)];
    return tbody({ className }, rowsWithTotal);
}

const calorieSum = (acc, meal) => acc + meal.calories;

const headerRow = thead({ className: 'bg-gray' }, [
        createCell(th, 'pa2 tl', 'Meal'),
        createCell(th, 'bl br pa2 tr', 'Calories'),
        createCell(th, 'pa2', '')
    ]);

function createTotalRow(meals) {
    const total = R.pipe(
        R.map(meal => meal.calories),               // Partial application, since Ramda requires both a callback and the source of the data transformation
        R.reduce((acc, calories) => acc + calories, 0),
    )(meals); // partial application completed
    return tr({}, [
        createCell(td, 'pa2 tr', "Total:"),
        createCell(td, 'bl br pa2 tr', total),
        createCell(td, 'br pa2', '')
    ]);
}

function tableView(dispatch, className, meals) {
    if (meals.length === 0) {
        return div({className: 'mv2 i black-50'}, 'No meals to display...');
    }
    return table({className}, [
        headerRow,
        mealsBody(dispatch, '', meals),
    ]);
}


function view(dispatch, model) {
    return div({className: 'mw6 center'}, [
        h1({ className: 'f2 pv2 bb'}, 'Calorie Counter'),
        formView(dispatch, model),
        tableView(dispatch, 'mt2 ba center w-100 collapse', model.meals)
        // pre(JSON.stringify(model, null, 2))
    ])
}

export default view;