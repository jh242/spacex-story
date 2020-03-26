import { combineReducers } from 'redux';
import { DisplayModes, CHANGE_DISPLAY, REQUEST_LAUNCHES } from '../actions';

const displayMode = (state = DisplayModes.LAUNCHES, action) => {
    switch(action.type){
        case CHANGE_DISPLAY:
            return action.display;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    displayMode
});

export default rootReducer;
