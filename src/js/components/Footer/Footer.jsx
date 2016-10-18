const componentName = 'Footer';
const React = require('react');

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    render: function() {
        return (
            <div className={this.getClass()}>
                <span>Copyright © 2016 Sergio Rodriguez</span>
                <a href="https://github.com/mrprim/rollr" target="_blank" className="fa fa-github link-icon"></a>
            </div>
        )
    }
});
