const componentName = 'TagInput';
const React = require('react');
const restClient = require('../../restClient/');

const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;
const Tag = require('../Tag/Tag');

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

    handleBlur: function(event) {
        let val = event.target.value;

        this.props.addTags(val);

        this.setState({value: ''});
    },

    renderTags: function() {
        let tags = this.props.tags;
        return tags.map((tag, i) => {
            return <Tag tag={tag} key={i} removeTag={this.props.removeTag}/>;
        });
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                <FormGroup controlId="tags">
                    <FormControl type="text" value={this.state.value} placeholder="Tags..."
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}/>
                    <FormControl.Feedback/>
                </FormGroup>

                {this.renderTags()}
            </div>
        )
    }
});
