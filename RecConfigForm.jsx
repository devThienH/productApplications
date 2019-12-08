import React from "react";
import { Formik } from "formik";
import { Form, FormGroup, Label, Button } from "reactstrap";
import configValidationSchema from "./configValidationSchema";
import PropTypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class RecConfigForm extends React.Component {
  state = {
    formData: {
      answerOptionId: 0,
      resourceId: 0
    },
    options: [
      {
        text: "Cap1",
        value: "1"
      },
      {
        text: "Cap2",
        value: "2"
      },
      {
        text: "Cap3",
        value: "3"
      },
      {
        text: "Cap4",
        value: "4"
      }
    ],
    resourceOptions: [
      { text: "IF DEMO4 [AND] NET1", value: "5" },
      { text: "TA3", value: "6" },
      { text: "TA1", value: "7" },
      { text: "IF TA1 [OR] TA2 [OR] TA3", value: "8" },
      { text: "IF TA1 [OR] TA2", value: "9" }
    ]
  };

  render() {
    return (
      <div className="form-control col-md-4">
        <Formik
          enableReinitialize={true}
          validationSchema={configValidationSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting
            } = props;
            return (
              <Form onSubmit={handleSubmit} className={""}>
                <FormGroup>
                  <Label>Answer Options</Label>
                  <Typeahead
                    name="answerOptionId"
                    type="text"
                    clearButton
                    labelKey={option => `${option.text}`}
                    multiple
                    options={this.state.options}
                    values={values.answerOptionId}
                    placeholder="Answer Options..."
                    className="form-group"
                  />
                  {errors.answerOptionId && touched.answerOptionId && (
                    <span className="input-feedback">{errors.name}</span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Resource Identification</Label>
                  <Typeahead
                    clearButton
                    labelKey={resourceOption => `${resourceOption.text}`}
                    single
                    name="resourceId"
                    type="text"
                    options={this.state.resourceOptions}
                    values={values.resourceId}
                    placeholder="Resource Identification..."
                    autoComplete="off"
                    className="form-group"
                  />
                  {errors.resourceId && touched.resourceId && (
                    <span className="input-feedback">{errors.resourceId}</span>
                  )}
                </FormGroup>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="btn btn-primary"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default RecConfigForm;

RecConfigForm.propTypes = {
  answerOptionId: PropTypes.number.isRequired,
  resourceId: PropTypes.number.isRequired
};
