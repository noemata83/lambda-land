import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { updateCityMsg, addCity } from './Update';

const { div, h1, form, pre, input, button, label, ul, li } = hh(h);

function inputset(dispatch, value, inputLabel, inputMsg) {
    return div({}, form({}, [
        label({className: 'f6 b db mb2'}, inputLabel),
        input({
            className: 'pa2 w60',
            type: 'text',
            value,
            oninput: (e) => dispatch(inputMsg(e.target.value))
        }),
        button({
            className: 'pv2 ph3 br1', 
            onclick: (e) => {
                e.preventDefault();
                dispatch(addCity);
            } 
            }, 'Add')
    ]));
}

function citySet(dispatch, name, editId) {
    return li({
        className: 'pa3 bb b--light-silver flex justify-between relative'
    }, [
        div({
            className: 'w-60 tl',
        }, [
            div({
                className: 'f7 b'
            }, 'Location'),
            div(name)
        ])
    ])
}

function cityView(dispatch, cities) {
    if (cities.length === 0) return div();
    return ul({
        className: 'list pl0 ml0 ba b--light-silver br',
    }, cities.map(city => citySet(dispatch, city.name, city.editId)));
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Weather'),
    inputset(dispatch, model.cityInput, 'Location', updateCityMsg),
    cityView(dispatch, model.cities),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;