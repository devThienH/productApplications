import { Datatable } from "@o2xp/react-datatable";
import React, { Component } from "react";
import { chunk } from "lodash";
import PropTypes from "prop-types";
import * as adminServices from "../../services/adminServices";
import logger from "sabio-debug";
import "./CardView.css";
import resourcesTableServices from "../../services/resourcesTableServices";

const _logger = logger.extend("ResourcesTable");
class ResourcesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: "Resource",
        dimensions: {
          datatable: {
            width: "80vw",
            height: "95%"
          },
          row: {
            height: "60px"
          }
        },
        keyColumn: "id",
        font: "Arial",
        data: {
          columns: [
            {
              id: "id",
              label: "ID",
              colSize: "2px",
              editable: false
            },
            {
              id: "contactName",
              label: "Contact Name",
              colSize: "10px",
              editable: true,
              dataType: "text",
              inputType: "input"
            },
            {
              id: "phone",
              label: "Phone",
              colSize: "10px",
              editable: true,
              dataType: "number",
              valueVerification: val => {
                let error = val > 100 ? true : false;
                let message = val > 100 ? "Value is too big" : "";
                return {
                  error: error,
                  message: message
                };
              }
            },
            {
              id: "email",
              label: "Email",
              colSize: "10px",
              editable: true
            }
          ],
          rows: this.props.resources
          // email: this.props.resources.email
        },
        features: {
          canEdit: false,
          canDelete: false,
          canPrint: true,
          canDownload: true,
          canSearch: true,
          canRefreshRows: true,
          canOrderColumns: true,
          canSelectRow: true,
          canSaveUserConfiguration: true,
          userConfiguration: {
            columnsOrder: ["id", "contactName", "phone", "email"],
            copyToClipboard: false
          },
          rowsPerPage: {
            available: [10, 25, 50, 100],
            selected: 50
          },
          additionalIcons: [
            {
              title: "Resources Card View",
              icon: <i className="fa fa-arrow-circle-right"></i>,
              onClick: this.toggleView
            }
          ],
          selectionIcons: [
            {
              title: "Selected Rows",
              icon: <i className="fa fa-envelope"></i>
              // onClick: rows => console.log(rows.map(this.emailMapper))
            }
          ]
        }
      }
    };
  }

  componentDidMount() {
    adminServices
      .getAllRecources()
      .then(this.getResourcesSucc)
      .catch(this.getResourcesErr);
  }

  getResourcesSucc = data => {
    _logger(data);
    var Test = data.items.map(x => ({
      id: x.id,
      contactName: x.contactName,
      phone: x.phone,
      email: x.contactEmail
    }));

    this.setState(prevState => {
      return {
        ...prevState,
        options: {
          ...prevState.options,
          data: {
            ...prevState.options.data,
            rows: Test
          }
        }
      };
    });
  };

  actionsRow = ({ type, payload }) => {
    _logger(type, payload);
  };

  sendEmails = rows => {
    resourcesTableServices
      .requestUpdate(rows.map(this.emailMapper))
      .then(this.onPushSuccess)
      .catch(this.onPushError);
  };

  onPushSuccess = () => {
    _logger("pushsuccess");
  };

  onPushError = () => {
    _logger("Emails failed to send");
  };

  emailMapper = contact => {
    return contact.email;
  };

  refreshRows = () => {
    const { rows } = this.state.options.data;
    const randomRows = Math.floor(Math.random() * rows.length) + 1;
    const randomTime = Math.floor(Math.random() * 4000) + 1000;
    const randomResolve = Math.floor(Math.random() * 10) + 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomResolve > 3) {
          resolve(chunk(rows, randomRows)[0]);
        }
        reject(new Error("err"));
      }, randomTime);
    });
  };

  toggleView = () => {
    this.props.history.push("/admin/resources");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row cardView">
            <Datatable
              options={this.state.options}
              refreshRows={this.refreshRows}
              actions={this.actionsRow}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ResourcesTable.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  resources: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.number
  })
};

export default ResourcesTable;
