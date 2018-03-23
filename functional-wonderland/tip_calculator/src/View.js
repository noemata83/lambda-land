import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { updatePriceMsg, updateTipPctMsg } from './Update';

const {
  div,
  h1,
  label,
  input,
  pre,
} = hh(h);

function inputSet(dispatch, inputLabel, value, inputMsg) {
  return div({className: 'w-40'}, [
    label({ className: 'db fw6 lh-copy f5'}, inputLabel),
    input({ 
      className: 'border-box pa2 mb2 tr w-100',
      type: 'text',
      value,
      oninput: (e) => dispatch(inputMsg(e.target.value))
    })
  ])
}

function outputSet(tip, total) {
  return div({className: 'w-40 b bt mt2 pt2'}, [
    calculatedAmount('Tip: ', tip),
    calculatedAmount('Total: ', total)
  ]);
}

function calculatedAmount(description, amount) {
  return div({className: 'flex w-100' }, [
    div({ className: 'w-50 pv1 pr2' }, description),
    div({ className: 'w-50 tr pv1 pv2' }, amount)
  ])
}

const round = places => 
  R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places)
  );

const formatMoney = R.curry(
  (symbol, places, number) => {
    return R.pipe(
      R.defaultTo(0),
      round(places),
      num => num.toFixed(places),
      R.concat(symbol),
    )(number);
  }
);

const toMoney = formatMoney('$', 2);

function view(dispatch, model) {
  const { price, tipPct, tip, total } = model;
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet(
      dispatch,
      'Price',
      price,
      updatePriceMsg
    ),
    inputSet(
      dispatch,
      'Tip %',
      tipPct,
      updateTipPctMsg  
    ),
    outputSet(
      toMoney(tip),
      toMoney(total)
    )
    // pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;