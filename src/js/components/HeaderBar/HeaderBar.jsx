const componentName = 'HeaderBar';
const React = require('react');
const userUtils = require('../../util/userUtils');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    handleUserStatus: function() {
        const user = this.props.user;
        let name = userUtils.getName(user);

        if (user) {
            return <div>Welcome, {name}</div>
        } else {
            return <a href="/api/auth/google">Sign In with Google</a>
        }
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                Rollr
                <div className="pull-right">{this.handleUserStatus()}</div>
            </div>
        )
    }
});
