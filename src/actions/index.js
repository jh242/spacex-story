export const FETCH_MISSIONS = 'FETCH_MISSIONS';
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';

export function fetchMissions(fetchResponse) {
    return {
        type: FETCH_MISSIONS,
        payload: {
            missions: fetchResponse.missions,
            error: fetchResponse.error
        }
    }
}

export function changeDisplay() {
    return {
        type: CHANGE_DISPLAY
    }
}