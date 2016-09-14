const componentName = 'HeaderBar';
const React = require('react');

const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const NavDropdown = require('react-bootstrap').NavDropdown;
const MenuItem = require('react-bootstrap').MenuItem;

require('./' + componentName + '.less');

module.exports = React.createClass({

    getClass: function() {
        return componentName;
    },

    handleUserStatus: function() {
        const user = this.props.user;
        let name = this.getUserName(user);

        if (user) {
            return <div>Welcome, {name}</div>
        } else {
            return <a href="/api/auth/google">Sign In with Google</a>
        }
    },

    getUserName: function(user) {
        if (!user) {
            return '';
        }

        if (user.username)
            return user.username;
        if (user.email)
            return user.email;
        return user._id;
    },

    render: function() {
        return (
            <Navbar className={this.getClass()} inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Rollr</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                </Navbar.Collapse>
            </Navbar>
        )
    }
});
