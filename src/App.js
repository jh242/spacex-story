import React from 'react';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { fetchMissions, changeDisplay } from './actions';
import MissionPanel from './components/MissionPanel';

async function fetchData() {
    const resp = await fetch('https://api.spacexdata.com/v3/launches?limit=5&launch_year=2019');
    const data = await resp.json();

    return { missions: data, error: !resp.ok }
}

function App() {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.displayMode);

    fetchData().then(fetchResponse => {
        dispatch(fetchMissions(fetchResponse));
    });

    let className = mode ? 'launch' : 'land'

    return (
        <div className={className}>
            <div className='modeGroup'>
                <Button style={{ width: '100px', margin: '10px' }} variant={mode ? 'light' : 'dark'} onClick={() => dispatch(changeDisplay())}>{mode ? 'Landings' : 'Launches'}</Button>
            </div>
            <div style={{ flex: 1 }}><MissionPanel /></div>
        </div >
    );
}

export default App;
