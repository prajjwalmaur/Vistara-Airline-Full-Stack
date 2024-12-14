import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class Signin extends Component {
  Swal = withReactContent(Swal);

  constructor(props) {
    super(props);
    this.state = {
      usernameLogin: '',
      passwordLogin: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ usernameLogin: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ passwordLogin: event.target.value });
  };

  Login = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/login', {
      username: this.state.usernameLogin,
      password: this.state.passwordLogin,
    }).then((response) => {
      if (response.data.msg) {
        Swal.fire('Invalid Login!', '', 'error');
      } else {
        Swal.fire('Login Success!', '', 'success');
        setTimeout(() => this.props.history.push('/AdminPanel'), 500);
      }
    });
  };

  render() {
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      padding: '20px',
    };

    const formContainerStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '40px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      width: '100%',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
    };

    const formContentStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const titleStyle = {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '20px',
    };

    const inputStyle = {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ddd',
      outline: 'none',
      fontSize: '16px',
    };

    const buttonStyle = {
      backgroundColor: '#2575fc',
      border: 'none',
      color: '#fff',
      padding: '12px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
      backgroundColor: '#1a5ac7',
    };

    const linkStyle = {
      marginTop: '15px',
      textAlign: 'right',
      fontSize: '0.9rem',
      color: '#2575fc',
      textDecoration: 'none',
    };

    return (
      <div style={containerStyle}>
        <form style={formContainerStyle} onSubmit={this.Login}>
          <div style={formContentStyle}>
            <h3 style={titleStyle}>Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                onChange={this.handleUsernameChange}
                style={inputStyle}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                onChange={this.handlePasswordChange}
                style={inputStyle}
                placeholder="e.g rXhAz29$%1"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                style={{ ...buttonStyle }}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Login
              </button>
            </div>
            <p style={linkStyle}>
              Forgot <a href="Home" style={{ color: '#2575fc' }}>password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signin);
