import React, { Component } from "react";
import "./PublicLanding.css";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  adminLogin = () => {
    this.props.currentUser.email
      ? this.props.history.push("/admin")
      : this.props.history.push("/login");
  };

  takeAssessment = () => {
    this.props.history.push("/explore");
  };

  static getDerivedStateFromProps(newState, prevState) {
    if ((prevState.currentUser = true)) {
      newState.currentUser.id = null;
      newState.currentUser.isLoggedIn = false;
      newState.currentUser.name = "";
      newState.currentUser.roles = 0;
      newState.currentUser.tenantId = null;
      newState.currentUser.userName = "";
      newState.currentUser.email = "";
      return newState;
    }
  }

  render() {
    return (
      <div className="homeContainer">
        <div className="col-md-12 landing-center">
          <div className="opacityLayer">
            <h1 className="titlePathways">LA Pathways</h1>
            <hr className="landingHr"></hr>
            <div className="row">
              <div className="container-fluid">
                <p className="text">
                  LA Pathways offers help by providing resources to business
                  owners in the City of Los Angeles
                </p>
                <p className="text">
                  Ever wondered about what resources are available to help you
                  start and grow your business in the city of Los Angeles? Look
                  no further because LA Pathways can help. When taking the
                  assessment survey this diagnostic tool can generate a list of
                  possible resource providers who are available with support.
                  Services include business coaching, access to capital,
                  procurement and contracting, license and permitting, among
                  others. This tool is for information only.
                </p>
                <p className="text">
                  Click below and find out your pathway through the LA
                  entrepreneurial landscape.
                </p>

                <div className="explore">
                  <button
                    type="button"
                    className="btn btn-pill exploreButton"
                    onClick={this.takeAssessment}
                  >
                    <strong>Explore Your Pathway</strong>
                  </button>
                </div>
                <div className="top-left">
                  <button
                    type="button"
                    className="btn btn-pill exploreButton"
                    onClick={this.adminLogin}
                  >
                    <strong>
                      {this.props.currentUser.email
                        ? "Admin Home"
                        : "Admin Login"}
                    </strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  currentUser: PropTypes.shape({ email: PropTypes.string }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default Home;
