require('./Rollr.less');

const React = require('react');
const restClient = require('../../restClient/');

const RollForm = require('../RollForm/RollForm');
const RollListItem = require('../RollListItem/RollListItem');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            user: undefined,
            rolls: []
        }
    },

    componentDidMount: function() {
		this.initialize();
	},

    initialize: function() {
        this.loadUser();
        this.loadRolls();
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
        return 'Rollr';
    },

    handleLoginState: function() {
        const state = this.state;
        const user = state.user;

        if(user) {
            return <div>Welcome, {user._id}</div>
        } else {
            return <a href="/api/auth/google">Sign In with Google</a>
        }
    },

    render: function() {
        let state = this.state || {};
        let rolls = state.rolls || [];
        let renderRolls = rolls.map((roll, i)=> {
            return <RollListItem roll={roll} key={i}/>;
        });

        return (
            <div className={this.getClass()}>
                <h1>Rollr</h1>
                {this.handleLoginState()}
                <RollForm/>
                {renderRolls}
            </div>
        )
    }
});
