import React, { Component } from "react";
import { Form } from "react-bootstrap";
var firebase = require("firebase");
var uuid = require("uuid");

var firebaseConfig = {
  apiKey: "AIzaSyCy9rAkF5FLi_SaBtnrfqfUiXP2WRkjbBE",
  authDomain: "usurvey-b080b.firebaseapp.com",
  databaseURL: "https://usurvey-b080b.firebaseio.com",
  projectId: "usurvey-b080b",
  storageBucket: "",
  messagingSenderId: "386625177926",
  appId: "1:386625177926:web:26db0eb34a730a16"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class UdemySurvey extends Component {
  state = {
    sname: "",
    sid: uuid.v1(),
    isSubmited: false,
    answer: {
      ans1: "",
      ans2: "",
      ans3: ""
    }
  };

  getInput = () => {
    var name = this.refs.name.value;
    this.setState(
      {
        sname: name
      },
      () => {
        console.log(this.state);
      }
    );
  };

  answerSubmited = event => {
    var answer = this.state.answer;
    if (event.target.name === "ans1") {
      answer.ans1 = event.target.value;
    } else if (event.target.name === "ans2") {
      answer.ans2 = event.target.value;
    } else if (event.target.name === "ans3") {
      answer.ans3 = event.target.value;
    }

    this.setState(
      {
        answer: answer
      },
      function() {
        console.log(this.state);
      }
    );
  };

  questionSubmit = () => {
    firebase
      .database()
      .ref("uServey/" + this.state.sid)
      .set({
        studentName: this.state.sname,
        answer: this.state.answer
      });
    this.setState({
      isSubmited: true
    });
  };

  render() {
    var studentInfo;
    var questions;

    if (this.state.sname === "" && this.state.isSubmited === false) {
      studentInfo = (
        <div>
          <h2>We are want to know your name</h2>
          <form onSubmit={this.getInput}>
            <input
              className="student-name-input"
              type="text"
              ref="name"
              placeholder="Enter your name"
            />
          </form>{" "}
        </div>
      );
      questions = "";
    } else if (this.state.sname !== "" && this.state.isSubmited === false) {
      studentInfo = <h2>Welcome to UdemySurvey {this.state.sname}</h2>;

      questions = (
        <div>
          <h3>Some questions for you</h3>
          <div>
            <Form onSubmit={this.questionSubmit}>
              <fieldset>
                <div className="card">
                  <Form.Group>
                    <Form.Label>Which course would you like most:</Form.Label>
                    <Form.Row style={{ justifyContent: "center" }}>
                      <Form.Check
                        style={{ marginRight: "1rem" }}
                        type="radio"
                        label="Web Developer"
                        name="ans1"
                        value="Web Developer"
                        onChange={this.answerSubmited}
                      />
                      <Form.Check
                        style={{ marginRight: "1rem" }}
                        type="radio"
                        label="Designing"
                        name="ans1"
                        value="Designing"
                        onChange={this.answerSubmited}
                      />
                      <Form.Check
                        type="radio"
                        label="Acting"
                        name="ans1"
                        value="Acting"
                        onChange={this.answerSubmited}
                      />
                    </Form.Row>
                  </Form.Group>
                </div>
                <div className="card">
                  <Form.Group>
                    <Form.Label>You are a:</Form.Label>
                    <Form.Row style={{ justifyContent: "center" }}>
                      <Form.Check
                        style={{ marginRight: "1rem" }}
                        type="radio"
                        label="Student"
                        name="ans2"
                        value="Student"
                        onChange={this.answerSubmited}
                      />
                      <Form.Check
                        style={{ marginRight: "1rem" }}
                        type="radio"
                        label="Looking-Job"
                        name="ans2"
                        value="Looking-Job"
                        onChange={this.answerSubmited}
                      />
                      <Form.Check
                        type="radio"
                        label="In-Job"
                        name="ans2"
                        value="In-Job"
                        onChange={this.answerSubmited}
                      />
                    </Form.Row>
                  </Form.Group>
                </div>
                <div className="card">
                  <Form.Group>
                    <Form.Label>Is online learning helpful:</Form.Label>
                    <Form.Row style={{ justifyContent: "center" }}>
                      <Form.Check
                        style={{ marginRight: "1rem" }}
                        type="radio"
                        label="Yes"
                        name="ans3"
                        value="Yes"
                        onChange={this.answerSubmited}
                      />
                      <Form.Check
                        style={{ marginRight: "1rem" }}
                        type="radio"
                        label="No"
                        name="ans3"
                        value="No"
                        onChange={this.answerSubmited}
                      />
                      <Form.Check
                        type="radio"
                        label="May-Be"
                        name="ans3"
                        value="May-Be"
                        onChange={this.answerSubmited}
                      />
                    </Form.Row>
                  </Form.Group>
                </div>
                <button className="bttn" type="submit">
                  Submit
                </button>
              </fieldset>
            </Form>
          </div>
        </div>
      );
    } else if (this.state.isSubmited === true) {
      studentInfo = <h2>Thanks {this.state.sname}</h2>;
    }

    return (
      <div>
        {studentInfo}
        ---------------------------------------------------------------------------------
        {questions}
      </div>
    );
  }
}
