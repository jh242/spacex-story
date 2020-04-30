import { falcon, falconcrew, falconheavy } from '../assets';
import React, { Component } from 'react';

import './MissionCard.css'
import { findByLabelText } from '@testing-library/react';

export default class MissionCard extends Component {
    render() {
        let { mission, mode } = this.props;
        let rocketDisplay;

        let textColor = mode ? 'white' : 'black';

        console.log(mission.rocket.rocket_id)

        switch (mission.rocket.rocket_id) {
            case 'falcon9':
                rocketDisplay = mission.rocket.second_stage.payloads[0].payload_type === 'Crew Dragon' ? falconcrew : falcon;
                break;
            case 'falconheavy':
                rocketDisplay = falconheavy;
                break;
            default:
                rocketDisplay = falcon;
        }

        return (
            <div className="missionCard">
                <div style={{ height: '100px', marginTop: '5%' }}>
                    <img style={{ maxHeight: '100px', maxWidth: '100px' }} src={mission.links.mission_patch_small} />
                </div>
                <img style={{ maxHeight: '50%', marginTop: '5%', marginBottom: '5%' }} src={rocketDisplay} />
                <div className={mode ? 'launchCard' : 'landCard'}>
                    <h5 style={{ color: textColor }}>{mission.mission_name}</h5>
                    {mode ?
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                {mission.rocket.second_stage.payloads.slice(0, 5).map((payload, index) => {
                                    return (
                                        <div>
                                            <p>Payload {index + 1}:</p>
                                            <p>Payload type: {payload.payload_type}</p>
                                            <p>Payload mass: {payload.payload_mass_kg ? `${payload.payload_mass_kg} kg` : 'unavailable'}</p>
                                        </div>
                                    );
                                })}
                                {mission.rocket.second_stage.payloads.length > 5 ? <p>{mission.rocket.second_stage.payloads.length - 5} payloads omitted.</p> : null}
                            </div>
                            {mission.launch_success ?
                                <p>Launched successfully at {mission.launch_date_utc} from {mission.launch_site.site_name_long}</p>
                                :
                                mission.upcoming ?
                                    <p>Mission planned to launch at {mission.launch_date_utc} from {mission.launch_site.site_name_long}</p>
                                    :
                                    <p>{mission.launch_failure_details ? `Launch failed due to ${mission.launch_failure_details.reason} at ${mission.launch_failure_details.time} seconds.` : 'Launch failed, details unavailable.'}</p>
                            }
                        </div>
                        :
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            {mission.rocket.first_stage.cores.map((core, index) => {
                                return (
                                    <div>
                                        <p>Core {index + 1}</p>
                                        <p>Landing attempted: {core.landing_intent ? 'Yes' : 'No'}</p>
                                        {core.landing_intent ?
                                            <div>
                                                <p>Landing type: {core.landing_type === 'ASDS' ? 'Droneship' : 'Ground'}</p>
                                                <p>Landed successfully: {core.land_success ? 'Yes' : 'No'}</p>
                                            </div> : null}
                                    </div>
                                );
                            })}
                        </div>
                    }
                </div>
            </div>
        );
    }
}