const componentName = 'Rollr';
require('./' + componentName + '.less');

const React = require('react');
const restClient = require('../../restClient/');

const RollForm = require('../RollForm/RollForm');
const RollDisplay = require('../RollDisplay/RollDisplay');
const RollList = require('../RollList/RollList');
const HeaderBar = require('../HeaderBar/HeaderBar');
const Footer = require('../Footer/Footer');
const socket = io();
const url = require('url');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

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
        this.parseUrl();
        this.loadUser();
        this.loadRolls();
    },

    parseUrl: function() {
        const address = url.parse(window.location.toString(), true);

        if(address.query && address.query.roll) {
            this.showRoll(address.query.roll);
        }
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

    addRoll: function(roll) {
        let rolls = this.state.rolls;

        rolls.unshift(roll);
        this.setState({rolls});
    },

    showRoll: function(id) {
        restClient.getRoll(id).then((resp) => {
            console.log(resp);
            this.setState({roll: resp});
        });
    },

    handleRenderMode: function() {
        return this.renderModeRoller();
    },

    renderModeRoller: function() {
        let state = this.state || {};
        let rolls = state.rolls || [];
        let rollDisplay = state.roll ? <RollDisplay roll={state.roll}/> : null;

        return (
            <div>
                {rollDisplay}
                <RollForm addRoll={this.addRoll}/>
                <RollList rolls={rolls} showRoll={this.showRoll}/>
            </div>
        )
    },

    render: function() {
        return <div className={this.getClass()}>
            <HeaderBar user={this.state.user} />
            {this.handleRenderMode()}
            <Footer />
        </div>

    }
});
