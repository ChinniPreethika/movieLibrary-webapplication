import { Component } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

class Login extends Component {
  state = { email: '', password: '' };

  getUsername = (event) => {
    this.setState({ email: event.target.value });
  };

  getPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (e) => {
    const { email, password } = this.state;
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
      toast.success("🎉 User Logged In Successfully!!", { position: "top-center" });
    } catch (error) {
      console.log(error.message);
      toast.error(`❌ ${error.message}`, { position: "bottom-center" });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <form className="overall-form-container" onSubmit={this.handleSubmit}>
        <div className="form-container">
          <div className="heading-container">
            <h1>Movie Library</h1>
          </div>
          <div className="input-container">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="input"
              value={email}
              onChange={this.getUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input"
              value={password}
              onChange={this.getPassword}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">Login</button>
          </div>
          <div className="new-user-container">
            <p className="new-user">New User? <a href="/signup" className="new-user-link">Register here</a></p>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
