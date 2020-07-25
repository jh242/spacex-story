import { combineReducers } from 'redux';
import { CHANGE_DISPLAY, FETCH_MISSIONS } from '../actions';

const displayMode = (state = true, action) => { //TRUE FOR LAUNCHES, FALSE FOR LANDINGS
    switch (action.type) {
        case CHANGE_DISPLAY:
            return !state;
        default:
            return state;
    }
}

const initMissionState = {
    error: false,
    isFetching: true,
    missions: []
}

const missionData = (state = initMissionState, action) => {
    switch (action.type) {
        case FETCH_MISSIONS:
            return { ...action.payload, isFetching: false };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    displayMode,
    missionData
});

export default rootReducer;
