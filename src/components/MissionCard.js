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
                <img style={{ maxHeight: '60%', marginTop: '50%', marginBottom: '5%' }} src={rocketDisplay} />
                <div className={mode ? 'launchCard' : 'landCard'}>
                    <h5 style={{ color: textColor }}>{mission.mission_name}</h5>
                    {mode ?
                        <div>
                            <p>Payload type: {mission.rocket.second_stage.payloads[0].payload_type}</p>
                            <p>Payload mass: {mission.rocket.second_stage.payloads[0].payload_mass_kg} kg</p>
                            <p>Launched on {mission.launch_date_utc} from {mission.launch_site.site_name_long}</p>
                        </div>
                        :
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            {mission.rocket.first_stage.cores.map((core, index) => {
                                return (
                                    <div>
                                        <p>Core {index + 1}</p>
                                        <p>Landing attempted: {core.landing_intent ? 'Yes' : 'No'}</p>
                                        <p>Landed successfully: {core.land_success ? 'Yes' : 'No'}</p>
                                        <p>Landing type: {core.landing_type === 'ASDS' ? 'Droneship' : 'Ground'}</p>
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