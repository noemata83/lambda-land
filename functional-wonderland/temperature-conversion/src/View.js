import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const {
  div,
  h1,
  pre,
  input,
  select,
  option,
  br
} = hh(h);

const UNITS = ['Fahrenheit', 'Celsius', 'Kelvin'];


function unitOptions(selectedUnit) {
    return R.map(unit => option({ value: unit, selected: unit === selectedUnit}, unit), UNITS);
        //units.map(unit => option({selected: unit === sourceUnit}, unit))
}

function inputSet(dispatch, sourceLeft, value, unit) {
    return div({ className: 'w-50 ma1'}, [
        input({
            type: 'text', 
            className: 'db w-100 mv2 pa2 input-reset ba', 
            value}),
        select(
            {
                className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black'
            }, unitOptions(unit))
    ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({className: 'flex'}, [
        inputSet(
            dispatch,
            true,
            model.leftUnit,
            model.leftValue
        ),
        inputSet(
            dispatch,
            false,
            model.rightUnit,
            model.rightValue
        )
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;