const componentName = 'RollForm';
require('./' + componentName + '.less');

const React = require('react');
const restClient = require('../../restClient/');
const TagInput = require('../TagInput/TagInput');
const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    getInitialState: function() {
        return {rollString: '', tags: []};
    },

    handleRollStringChange: function(event) {
        const value = event.target.value;
        let msg;

        this.setState({rollString: value});

        if (value.length === 0) {
            return this.setState({rollStringValidation: null});
        }

        restClient.validateRoll(value).then((resp) => {
            if (resp.valid) {
                msg = 'success';
            } else {
                msg = 'error';
            }
            this.setState({rollStringValidation: msg});
        }).catch(() => {
            this.setState({rollStringValidation: 'error'});
        });
    },

    roll: function() {

        if (this.state.rollStringValidation === 'success') {
            restClient.roll({diceString: this.state.rollString, tags: this.state.tags}).then((roll) => {
                if (roll.error) {
                    this.setState({rollStringValidation: 'error'});
                } else {
                    this.setState(this.getInitialState());
                }
            });
        } else {
            this.setState({rollStringValidation: 'error'});
        }

    },

    addTags: function(nTags) {
        let tags = this.state.tags.concat(nTags).filter((elem, pos, arr) => {
            if (elem && elem.trim().length > 0) {
                return arr.indexOf(elem) == pos;
            }
        });

        this.setState({tags});
    },

    removeTag: function(tag) {
        let tags = this.state.tags.filter((val) => {
            return val !== tag;
        });
        this.setState({tags});
    },
    getDiceStringValidationState() {
        const diceString = this.state.diceString;
        restClient.validateRoll(diceString).then((resp) => {
            if (resp.valid) {
                return 'success';
            }
            return 'error';
        });
        if (length > 10)
            return 'success';
        else if (length > 5)
            return 'warning';
        else if (length > 0)
            return 'error';
        }
    ,

    render: function() {
        return (
            <div className={this.getClass()}>
                <FormGroup controlId="diceString" validationState={this.state.rollStringValidation}>
                    <FormControl type="text" value={this.state.rollString} placeholder="Enter Dice String" onChange={this.handleRollStringChange}/>
                    <FormControl.Feedback/>
                </FormGroup>

                <TagInput addTags={this.addTags} tags={this.state.tags} removeTag={this.removeTag}/>
                <div className="roll-button" onClick={this.roll}>Roll</div>
            </div>
        )
    }
});
