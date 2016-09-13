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
        return {rollString: '', tags: []};
    },

    handleRollStringChange: function(event) {
        this.setState({rollString: event.target.value});
    },

    roll: function() {
        console.log(this.state.tags);
        restClient.roll({
            diceString:this.state.rollString,
            tags: this.state.tags
        }).then((roll)=> {
            console.log(roll);
            this.props.addRoll(roll);
        });
    },

    addTags: function(nTags) {
        let tags = this.state.tags;
        tags = tags.concat(nTags);
        this.setState({tags});
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                <input value={this.state.rollString} onChange={this.handleRollStringChange}/>
                <TagInput addTags={this.addTags} tags={this.state.tags}/>
                <button onClick={this.roll}>Roll</button>
            </div>
        )
    }
});
