const componentName = 'Tag';
const React = require('react');
const restClient = require('../../restClient/');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    handleRemoveClick: function() {
        this.props.removeTag(this.props.tag);
    },

    render: function() {
        let removeIcon = this.props.removeTag ? <span className="glyphicon glyphicon-remove-sign" onClick={this.handleRemoveClick}></span> : '';
        return (
            <div className={this.getClass()}>
                {this.props.tag}
                {removeIcon}
            </div>
        )
    }
});
