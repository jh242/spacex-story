export const REQUEST_LAUNCHES = 'REQUEST_LAUNCHES';
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';

export function fetchLaunches(){
    return{
        type: 'FETCH_LAUNCHES'
    }
}

export function changeDisplay(displayMode){
    return{
        type: 'CHANGE_DISPLAY',
        display: displayMode
    }
}

export const DisplayModes = {
    LAUNCHES: 'LAUNCHES',
    LANDINGS: 'LANDINGS'
}