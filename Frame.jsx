import React, { Component } from "react";
import "./PublicLanding.css";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  takeAssessment = () => {
    this.props.history.push("/explore");
  };

  render() {
    return (
      <div className="homeContainer">
        <div className="col-md-12 landing-centerT">
          <div className="opacityLayerT">
            <div className="row">
              <div className="cotainer-fluid">
                <p className="textT">
                  LA Pathways offers help by providing resources to business
                  owners in the City of Los Angeles
                </p>
                <p className="textT">
                  Ever wondered about what resources are available to help you
                  start and grow your business in the city of Los Angeles? Look
                  no further because LA Pathways can help. When taking the
                  assessment survey this diagnostic tool can generate a list of
                  possible resource providers who are available with support.
                  Services include business coaching, access to capital,
                  procurement and contracting, license and permitting, among
                  others. This tool is for information only.
                </p>
                <p className="textT">
                  Click below and find out your pathway through the LA
                  entrepreneurial landscape.
                </p>

                <div className="exploreT">
                  <button
                    type="button"
                    className="btn btn-pill exploreButtonT"
                    onClick={this.takeAssessment}
                  >
                    <strong>Explore Your Pathway</strong>
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
