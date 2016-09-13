require('./RollForm.less');

const React = require('react');
const restClient = require('../../restClient/');

module.exports = React.createClass({

    getClass: function() {
        return 'RollForm';
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
                <input
                    value={this.state.rollString}
                    onChange={this.handleRollStringChange}
                />
            <button onClick={this.roll}>Roll</button>
            </div>
        )
    }
});
