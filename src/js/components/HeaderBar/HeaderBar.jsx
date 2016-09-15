const componentName = 'HeaderBar';
const React = require('react');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    handleUserStatus: function() {
        const user = this.props.user;
        let name = this.getUserName(user);

        if (user) {
            return <div>Welcome, {name}</div>
        } else {
            return <a href="/api/auth/google">Sign In with Google</a>
        }
    },

    getUserName: function(user) {
        if (!user) {
            return '';
        }

        if (user.username)
            return user.username;
        if (user.email)
            return user.email;
        return user._id;
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
