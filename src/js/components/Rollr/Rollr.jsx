const componentName = 'Rollr';
require('./' + componentName + '.less');

const React = require('react');
const restClient = require('../../restClient/');

const RollForm = require('../RollForm/RollForm');
const RollListItem = require('../RollListItem/RollListItem');
const HeaderBar = require('../HeaderBar/HeaderBar');
const socket = io();

module.exports = React.createClass({

    getInitialState: function() {
        return {mode: 'roller', rolls: []}
    },

    componentDidMount: function() {
        let _this = this;

        socket.on('roll', function (roll) {
            _this.addRoll(roll);
        });
        this.initialize();
    },

    initialize: function() {
        this.loadUser();
        this.loadRolls();
    },

    addRoll: function(roll) {
        let rolls = this.state.rolls;

        rolls.unshift(roll);
        this.setState({rolls});
    },

    loadUser: function() {
        return restClient.getSession().then((resp) => {
            this.setState({user: resp.user});
        });
    },

    loadRolls: function() {
        return restClient.getRolls().then((resp) => {
            this.setState({rolls: resp});
        });
    },

    getClass: function() {
        return componentName;
    },

    handleRenderMode: function() {
        return this.renderModeRoller();
    },

    renderModeRoller: function() {
        let state = this.state || {};
        let rolls = state.rolls || [];
        let renderRolls = rolls.map((roll, i) => {
            if(i<= 20) {
                return <RollListItem data={roll} key={roll._id}/>;
            }
        });

        return (
            <div>
                <RollForm addRoll={this.addRoll}/> {renderRolls}
            </div>
        )
    },

    render: function() {
        return <div className={this.getClass()}>
            <HeaderBar user={this.state.user} />
            {this.handleRenderMode()}
        </div>

    }
});
