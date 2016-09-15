const componentName = 'Tag';
const React = require('react');
const restClient = require('../../restClient/');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                {this.props.tag}
            </div>
        )
    }
});
