import * as R from 'ramda';

const MSGS = {
    UPDATE_PRICE: 'UPDATE_PRICE',
    UPDATE_TIP_PCT: 'UPDATE_TIP_PCT'
}

function calcTip(model) {
    const price = toFloat(model.price);
    const tipPct = toFloat(model.tipPct);
    const tip = price * (tipPct / 100);
    return {...model, tip}
}

function calcTotal(model) {
    const price = toFloat(model.price);
    const { tip } = model;    
    return { ...model, total: price + tip }
}

function updateTotal(model) {
    return calcTotal(calcTip(model));
}

export function updatePriceMsg(price) {
    return {
        type: MSGS.UPDATE_PRICE,
        price
    }
}

export function updateTipPctMsg(tipPct) {
    return {
        type: MSGS.UPDATE_TIP_PCT,
        tipPct
    }
}

function toFloat(input) {
    return parseFloat(input) || 0;
}

function update (msg, model) {
    switch(msg.type) {
    case (MSGS.UPDATE_PRICE):
        const price = msg.price;
        return updateTotal({...model, price});
    case (MSGS.UPDATE_TIP_PCT):
        const tipPct = msg.tipPct;
        return updateTotal({...model, tipPct});
    default: 
        return model;
    }
}

export default update;