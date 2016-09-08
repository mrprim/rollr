require('./Rollr.less');

const React = require('react');
const restClient = require('../../restClient/');

module.exports = React.createClass({

    getInitialState: function() {
        return {user: undefined}
    },

    componentDidMount: function() {
		this.initialize();
	},

    initialize: function() {
        this.loadUser();
    },

    loadUser: function() {
        return restClient.getSession().then((resp) => {
            this.setState({user: resp.user});
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
        return (
            <div className={this.getClass()}>
                <h1>Rollr</h1>
                {this.handleLoginState()}
            </div>
        )
    }
});
