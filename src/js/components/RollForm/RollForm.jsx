const componentName = 'RollForm';
require('./' + componentName + '.less');

const React = require('react');
const restClient = require('../../restClient/');
const TagInput = require('../TagInput/TagInput');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    getInitialState: function() {
        return {rollString: ''};
    },
    handleRollStringChange: function(event) {
        this.setState({rollString: event.target.value});
    },

    roll: function() {
        restClient.roll(this.state.rollString);
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                <input value={this.state.rollString} onChange={this.handleRollStringChange}/>
                <TagInput/>
                <button onClick={this.roll}>Roll</button>
            </div>
        )
    }
});
