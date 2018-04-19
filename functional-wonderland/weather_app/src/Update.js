import * as R from 'ramda';

const MSGS = {
    UPDATE_CITY_INPUT: 'UPDATE_CITY_INPUT',
    ADD_CITY: 'ADD_CITY',
    DELETE_CITY: 'DELETE_CITY',
    HTTP_SUCCESS: 'HTTP_SUCCESS'
}

const APPID = require('./config/appid');

function weatherURL(city) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city,)}&units=imperial&APPID=${APPID}`;
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

const HttpSuccessMsg = R.curry((id, response) => ({
    type: MSGS.HTTP_SUCCESS,
    id,
    response
}));

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
            const city = { name: cityInput, editId: nextId, temp: '?', low: '?', high: '?' }
            const cities = [...model.cities, city];
            return [{
                ...model,
                cities,
                cityInput: '',
                nextId: model.nextId + 1,
            }, 
            {
                request: {
                    url: weatherURL(city.name)
                },
                successMsg: HttpSuccessMsg(nextId)
            }
            ]
        }
        case(MSGS.DELETE_CITY): {
            const { editId } = msg;
            const cities = model.cities.filter(city => city.editId !== editId);
            return {
                ...model,
                cities
            }
        }
        case(MSGS.HTTP_SUCCESS): {
            const { id, response } = msg;
            const { cities } = model;
            const { temp, temp_min, temp_max } = R.pathOr(
                {},
                ['data', 'main'],
                response
            );
            const updatedCities = R.map(city => {
                if (city.editId === id) {
                    return {
                        ...city,
                        temp: Math.round(temp),
                        low: Math.round(temp_min),
                        high: Math.round(temp_max)
                    }
                }
                return city;
            }, cities);
            return {
                ...model,
                cities: updatedCities
            }
        }
    }
  return model;
}

export default update;