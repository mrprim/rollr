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

    handleShowRollClick: function() {
        this.props.showRoll(this.props.data._id)
    },
    render: function() {
        let roll = this.props && this.props.data;
        let rollResult = roll && roll.result && JSON.parse(roll.result);
        return (
            <div className={this.getClass()}>
                <div className="user">{this.getUsername()}</div>
                <div className="dice-string">{roll.diceString}</div>
                <div className="result" onClick={this.handleShowRollClick}>{rollResult.result}</div>
            </div>
        )
    }
});
