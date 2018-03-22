import * as R from 'ramda';

const MSGS = {
    LEFT_INPUT_CHANGED: 'LEFT_INPUT_CHANGED',
    RIGHT_INPUT_CHANGED: 'RIGHT_INPUT_CHANGED',
    LEFT_UNIT_CHANGED: 'LEFT_UNIT_CHANGED',
    RIGHT_UNIT_CHANGED: 'RIGHT_UNIT_CHANGED'
}

export function leftChanged(leftValue) {
    return {
        type: MSGS.LEFT_INPUT_CHANGED,
        leftValue,
    }
}

export function rightChanged(rightValue) {
    return {
        type: MSGS.RIGHT_INPUT_CHANGED,
        rightValue
    }
}

export function leftUnitChanged(unit) {
    return {
        type: MSGS.LEFT_UNIT_CHANGED,
        unit
    }
}

export function rightUnitChanged(unit) {
    return {
        type: MSGS.RIGHT_UNIT_CHANGED,
        unit
    }
}

const toInt = R.pipe(parseInt, R.defaultTo(0));

function update (msg, model) {
    switch(msg.type) {
        case(MSGS.LEFT_INPUT_CHANGED): {
            if (msg.leftValue === '') 
                return { ...model, sourceLeft: true, leftValue: '', rightValue: '' };
            let leftValue = toInt(msg.leftValue);
            return convert({ ...model, sourceLeft: true, leftValue});
        }
        case(MSGS.RIGHT_INPUT_CHANGED): {
            if (msg.rightValue === '') 
                return { ...model, sourceLeft: false, leftValue: '', rightValue: ''};
            let rightValue = toInt(msg.rightValue);
            return convert({...model, sourceLeft: false, rightValue});
        }
        case(MSGS.LEFT_UNIT_CHANGED): { 
            let leftUnit = msg.unit;
            return convert({
                ...model,
                sourceLeft: true,
                leftUnit,
            });
        }
        case(MSGS.RIGHT_UNIT_CHANGED): {
            let rightUnit = msg.unit;
            return convert({
                ...model,
                sourceLeft: false,
                rightUnit,
            });
        }
        default:
            return model;
    }
}

// function convert(model) {
//     const {leftValue, leftUnit, rightValue, rightUnit } = model;

//     const [ fromUnit, fromTemp, toUnit ] =
//         model.sourceLeft
//         ? [ leftUnit, leftValue, rightUnit ]
//         : [ rightUnit, rightValue, leftUnit ];

//     const otherValue = R.pipe(
//         convertFromToTemp,
//         round,
//     )(fromUnit, toUnit, fromTemp);

//     return model.sourceLeft ? {...model, rightValue: otherValue } : {...model, leftValue: otherValue };
// }

function convert(model) {
    const { leftValue, leftUnit, rightValue, rightUnit } = model;
    
    const [ fromUnit, fromTemp, toUnit ] =
            model.sourceLeft
            ? [ leftUnit, leftValue, rightUnit ]
            : [ rightUnit, rightValue, leftUnit ];
    
    const otherValue = round(fromCelsius(toUnit)(toCelsius(fromUnit,fromTemp)));

    return model.sourceLeft ? {...model, rightValue: otherValue} : {...model, leftValue: otherValue };
}

function toCelsius(from, temp) {
    switch(from){
        case('Fahrenheit'):
            return 5/9 * (temp - 32);
        case('Kelvin'):
            return temp - 273.15;
        default:
            return temp;
    }
}

function fromCelsius(to) {
    return temp => {
        switch(to) {
            case('Fahrenheit'):
                return 9/5 * (temp + 32);
            case('Kelvin'):
                return temp + 273.15;
            default:
                return temp
        }
    }
}

function round(value) {
    return Math.round(value * 10) / 10;
}

export default update;