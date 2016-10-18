const componentName = 'RollList';
require('./' + componentName + '.less');

const React = require('react');
const restClient = require('../../restClient/');
const userUtils = require('../../util/userUtils');

const RollListItem = require('../RollListItem/RollListItem');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    render: function() {
        let rolls = this.props.rolls || [];
        let renderRolls = rolls.map((roll, i) => {
            if (i <= 20) {
                return <RollListItem data={roll} key={roll._id}/>;
            }
        });
        return (
            <div className={this.getClass()}>
                {renderRolls}
            </div>
        )
    }
});
