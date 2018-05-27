import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../action/index.jsx';
import { logout } from '../action/authAction.jsx';


class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
      logout(event){
          event.preventDefault();
          this.props.logout().then(
              (res) => {
                this.props.addFlashMessage({
                    type: 'Success',
                    text: `Good Bye!!`
                })
              }
          )
      }

    render(){
        const { isAuthenticated, user } = this.props.auth;
        // console.log( isAuthenticated )
        // console.log( user )
        

        const userLinks = (
    <div>
       <Nav pills>
            <NavItem><NavLink href="#" onClick={this.logout.bind(this)} addFlashMessage={addFlashMessage} >Log Out</NavLink></NavItem>
            <NavItem><NavLink href="/recipes">Recipes</NavLink></NavItem>
            <NavItem><NavLink href="/recipes/new">Add Recipes</NavLink></NavItem>
        </Nav>
    </div>
        );

        const guestLinks = (
        <div>
            <Nav pills>
            
                <NavItem><NavLink href="/user/signUp">Sign Up</NavLink></NavItem>
                <NavItem><NavLink href="/user/login">Login</NavLink></NavItem>
            </Nav>
        </div>
        );

        return (
            <div>
          <Nav pills>
            <NavItem><NavLink href="/" active>Home</NavLink></NavItem> 
            { isAuthenticated ? userLinks : guestLinks }
          </Nav>
          </div>
        )
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,


}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout, addFlashMessage })(NavigationBar);