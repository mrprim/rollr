const componentName = 'RollListItem';
require('./'+componentName+'.less');

const React = require('react');
const restClient = require('../../restClient/');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    render: function() {
        let props = this.props || {};
        let roll = props.roll;
        let rollResult = roll && roll.result && JSON.parse(roll.result);
        return (
            <div className={this.getClass()}>
                {roll.diceString} = {rollResult.result}
            </div>
        )
    }
});
