import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse } from 'antd';

import { roadster } from '../assets';

import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';

export default function Roadster() {
    let [data, setData] = useState({});
    let [launch, setLaunch] = useState({});
    let history = useHistory();

    const missionId = "5eb87d13ffd86e000604b360";

    useEffect(() => {
        const init = async () => {
            const roadsterReq = await fetch(`${process.env.REACT_APP_SPACEX_API}/roadster`);
            const roadsterData = await roadsterReq.json();
            setData(roadsterData);
            const launchReq = await fetch(`${process.env.REACT_APP_SPACEX_API}/launches/${missionId}`);
            const launchData = await launchReq.json();
            setLaunch(launchData);
        };

        init();
    }, []);

    if (data.flickr_images && launch.links) {
        return (
            <div style={{ display: 'flex' }} >
                <LeftOutlined className="back" onClick={() => { history.goBack() }} />
                <div className="half">
                    <img alt="2008 Tesla Roadster" style={{ width: '90%', margin: '0 auto' }} src={roadster} />
                    <div className="grid">
                        {
                            data.flickr_images.map((image) => (
                                <a key={image} href={image} target="_blank" rel="noreferrer">
                                    <img alt="" src={image} />
                                </a>
                            ))
                        }
                    </div>
                </div>
                <div className="half">
                    <img alt="Falcon Heavy test mission patch" className="patch" src={launch.links.patch.small} />
                    <h1 style={{ textAlign: 'center' }}>{data.name}</h1>
                    <p>{data.details}</p>
                    <p>Launched on <span>{new Date(data.launch_date_unix * 1000).toDateString()}</span></p>
                    <p>Distance from Earth: <span>{data.earth_distance_km.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km</span>, or <span>{Math.floor(data.earth_distance_mi).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} miles</span></p>
                    <p>Current Speed: <span>{data.speed_kph.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km/h</span>, or <span>{Math.floor(data.speed_mph).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} mph</span></p>
                    <Collapse>
                        <Collapse.Panel header="Numbers for Nerds" key={1}>
                            <p>Launch Mass: <span>{data.launch_mass_kg} kg</span>/<span>{data.launch_mass_lbs} lbs</span></p>
                            <p>Orbit: <span>{data.orbit_type}</span></p>
                            <p>Apoapsis/Periapsis: <span>{data.apoapsis_au.toFixed(2)}</span>/<span>{data.periapsis_au.toFixed(2)} AU</span></p>
                            <p>Semi-major Axis: <span>{data.semi_major_axis_au.toFixed(2)} AU</span></p>
                            <p>Eccentricity: <span>{data.eccentricity.toFixed(4)}</span></p>
                            <p>Inclination: <span>{data.inclination.toFixed(4)}&#xb0;</span></p>
                            <p>Orbital Period: <span>{data.period_days.toFixed(0)} days</span></p>
                            <p>Distance from Mars: <span>{data.mars_distance_km.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km</span>/<span>{data.mars_distance_mi.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} mi</span></p>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                <LoadingOutlined spin />
            </div>
        );
    }

}