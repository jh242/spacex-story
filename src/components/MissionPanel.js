import React, { Component } from 'react';
import { connect } from 'react-redux';

import MissionCard from './MissionCard';

import './MissionPanel.css'

class MissionPanel extends Component {

    render() {
        let { missionData, mode } = this.props;
        return (
            <div className='missionPanel'>
                {
                    missionData.missions.map(element => {
                        return (<MissionCard mission={element} mode={mode} />);
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({ mode: state.displayMode, missionData: state.missionData });

export default connect(mapStateToProps)(MissionPanel);