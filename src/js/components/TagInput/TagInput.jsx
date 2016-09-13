const componentName = 'TagInput';
const React = require('react');
const restClient = require('../../restClient/');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    getInitialState: function() {
        return {value: ''};
    },

    handleChange: function(event) {
        let val = event.target.value;
        let list = val.split(',');

        if (list.length >= 2) {
            val = list.pop();
            this.props.addTags(list);
        }

        this.setState({value: val});
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                <input value={this.state.value} onChange={this.handleChange}/> {this.props.tags}
            </div>
        )
    }
});
