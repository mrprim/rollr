const componentName = 'RollListItem';
require('./'+componentName+'.less');

const React = require('react');
const restClient = require('../../restClient/');
const userUtils = require('../../util/userUtils');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    getUsername: function() {

        let roll = (this.props && this.props.data) || {};
        return userUtils.getName(roll._user);
    },

    render: function() {
        let roll = this.props && this.props.data;
        let rollResult = roll && roll.result && JSON.parse(roll.result);
        return (
            <div className={this.getClass()}>
                <div>{this.getUsername()}</div>
                <div>{roll.diceString}</div>
                <div>{rollResult.result}</div>
            </div>
        )
    }
});
