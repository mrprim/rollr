webpackHotUpdate(0,{

/***/ 734:
/*!***************************************************!*\
  !*** ./src/js/components/HeaderBar/HeaderBar.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var componentName = 'HeaderBar';
	var React = __webpack_require__(/*! react */ 121);
	var userUtils = __webpack_require__(/*! ../../util/userUtils */ 733);
	
	__webpack_require__(/*! . */ 735)("./" + componentName + '.less');
	
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
	            'Rollr!',
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
//# sourceMappingURL=0.d892f8587f0b1319bfcd.hot-update.js.map