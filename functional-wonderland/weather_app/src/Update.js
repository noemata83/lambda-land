import * as R from 'ramda';

const MSGS = {
    UPDATE_CITY_INPUT: 'UPDATE_CITY_INPUT',
    ADD_CITY: 'ADD_CITY',
    DELETE_CITY: 'DELETE_CITY'
}

export function updateCityMsg(input) {
    return {
        type: MSGS.UPDATE_CITY_INPUT,
        input
    }
}

export function deleteCityMsg(editId) {
    return {
        type: MSGS.DELETE_CITY,
        editId
    }
}

export const addCity = { type: MSGS.ADD_CITY};

function update(msg, model) {
    switch(msg.type) {
        case(MSGS.UPDATE_CITY_INPUT):
            const cityInput = msg.input;
            return {
                ...model,
                cityInput
            }
        case(MSGS.ADD_CITY): {
            const { cityInput, nextId } = model;
            const city = { name: cityInput, editId: nextId }
            const cities = [...model.cities, city];
            return {
                ...model,
                cities,
                cityInput: '',
                nextId: model.nextId + 1,
            }
        }
        case(MSGS.DELETE_CITY): {
            const { editId } = msg;
            const cities = model.cities.filter(city => city.editId !== editId);
            return {
                ...model,
                cities
            }
        }
    }
  return model;
}

export default update;