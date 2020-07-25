import React from 'react';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import HorizontalScroll from 'react-scroll-horizontal';

import { fetchMissions, changeDisplay } from './actions';
import MissionPanel from './components/MissionPanel';

async function fetchData() {
    const resp = await fetch('https://api.spacexdata.com/v3/launches');
    const data = await resp.json();

    return { missions: data, error: !resp.ok }
}

function App() {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.displayMode);
    const fetching = useSelector(state => state.missionData.isFetching);

    fetchData().then(fetchResponse => {
        dispatch(fetchMissions(fetchResponse));
    });

    let className = mode ? 'launch' : 'land'

    if (fetching) {
        return (
            <div className='launch' style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Spinner animation='grow' variant='light' />
                <Spinner animation='grow' variant='light' />
                <Spinner animation='grow' variant='light' />
            </div>
        );
    } else {
        return (
            
            <div className={className}>
                <div className='modeGroup'>
                    <Button style={{ width: '100px', margin: '10px' }} variant={mode ? 'light' : 'dark'} onClick={() => dispatch(changeDisplay())}>{mode ? 'Landings' : 'Launches'}</Button>
                </div>
                <HorizontalScroll reverseScroll>
                    <div style={{ flex: 1 }}><MissionPanel /></div>
                </HorizontalScroll>
            </div >
        );
    }
}

export default App;
