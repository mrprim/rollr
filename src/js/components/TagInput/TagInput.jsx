const componentName = 'TagInput';
const React = require('react');
const restClient = require('../../restClient/');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    getInitialState: function() {
        return {value: '', tags: []};
    },

    handleChange: function(event) {
        let tags = this.state.tags;
        let val = event.target.value;
        let list = val.split(',');

        console.log(list);

        if (list.length >= 2) {
            val = list.pop();
            tags = tags.concat(list);
        }
        console.log(tags);
        this.setState({value: val, tags: tags});

    },

    render: function() {
        return (
            <div className={this.getClass()}>
                <input value={this.state.value} onChange={this.handleChange}/> {this.state.tags}
            </div>
        )
    }
});
