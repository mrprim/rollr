const componentName = 'RollDisplay';
require('./' + componentName + '.less');

const React = require('react');
const userUtils = require('../../util/userUtils');
const rollUtils = require('../../util/rollUtils');

const Tag = require('../Tag/Tag');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    render: function() {
        let rslt = rollUtils.getBBCode(this.props.roll);
        let tags = this.props.roll.tags;
        let tagRendering = tags.map((tag, i) => {
            if (i <= 20) {
                return <Tag tag={tag} key={i}/>;
            }
        });
        return <div className={this.getClass()}>
            <div>BBCode: {rslt}</div>
            <div>{tagRendering}</div>
        </div>;
    }
});
