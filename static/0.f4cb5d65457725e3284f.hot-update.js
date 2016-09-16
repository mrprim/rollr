webpackHotUpdate(0,{

/***/ 670:
/*!***************************************************!*\
  !*** ./src/js/components/HeaderBar/HeaderBar.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var componentName = 'HeaderBar';
	var React = __webpack_require__(/*! react */ 51);
	var userUtils = __webpack_require__(/*! ../../util/userUtils */ 669);
	
	__webpack_require__(/*! . */ 671)("./" + componentName + '.less');
	
	module.exports = React.createClass({
	    displayName: 'exports',
	
	
	    getClass: function getClass() {
	        return componentName;
	    },
	
	    handleUserStatus: function handleUserStatus() {
	        var user = this.props.user;
	        var name = userUtils.getName(user);
	
	        if (user) {
	            return React.createElement(
	                'div',
	                null,
	                'Welcome, ',
	                name
	            );
	        } else {
	            return React.createElement(
	                'a',
	                { href: '/api/auth/google' },
	                'Sign In with Google'
	            );
	        }
	    },
	
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: this.getClass() },
	            'Rollr YEs ddd',
	            React.createElement(
	                'div',
	                { className: 'pull-right' },
	                this.handleUserStatus()
	            )
	        );
	    }
	});

/***/ }

})
//# sourceMappingURL=0.f4cb5d65457725e3284f.hot-update.js.map