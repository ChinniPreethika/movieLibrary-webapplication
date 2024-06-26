import { Component } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./index.css";

class SignUp extends Component {
  state = { email: "", password: "", fname: "", lname: "" };

  getFname = (event) => {
    this.setState({ fname: event.target.value });
  };

  getLname = (event) => {
    this.setState({ lname: event.target.value });
  };

  getPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  getUsername = (event) => {
    this.setState({ email: event.target.value });
  };

  handleRegister = async (e) => {
    const { email, password, fname, lname } = this.state;
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      this.setState({ email: '', password: '', fname: '', lname: '' });
      toast.success("🎉 Welcome to Movie Library!", { position: "top-center" });
    } catch (error) {
      toast.error(`🚨 ${error.message}`, { position: "bottom-center" });
    }
  };

  render() {
    const { email, password, fname, lname } = this.state;
    return (
      <form className="overall-form-container" onSubmit={this.handleRegister}>
        <div className="form-container">
          <div className="heading-container">
            <h1>Movie Library</h1>
          </div>
          <div className="input-container">
            <label htmlFor="fname" className="label">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              id="fname"
              className="input"
              onChange={this.getFname}
              value={fname}
            />
          </div>
          <div className="input-container">
            <label htmlFor="lname" className="label">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              id="lname"
              className="input"
              onChange={this.getLname}
              value={lname}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="input"
              onChange={this.getUsername}
              value={email}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="input"
              onChange={this.getPassword}
              value={password}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Sign Up</button>
          </div>
          <div className="redirect-container">
            <p className="existing-user">
              🚀 Already have an account? <a href="/login" className="login-link">Login here</a>
            </p>
          </div>
        </div>
      </form>
    );
  }
}

export default SignUp;
