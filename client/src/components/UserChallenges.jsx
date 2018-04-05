import React from 'react';
import ChallengeInfo from './challengeInfo.jsx';
import Editor from './editor.jsx';
import AllChallengesResultsModal from './allChallengesResultsModal.jsx';
import {Grid, Button, Modal, Header, Icon} from 'semantic-ui-react';
import $ from 'jquery';
import PairingEditor from "./pairingEditor.jsx";
import socketIOClient from "socket.io-client";

class UserChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // challengeLevel: data.challengeLevel,
      // challengeName: data.challengeName,
      // masterTests: data.masterTests,
      // prompt: data.prompt,
      // starterCode: data.starterCode,
      // testDescriptions: data.testDescriptions,
      
      // currentChallengeResultMessage: '',
      // currentTestResults: results.masterTestResults,
      // currentTestDescriptions: this.state.currentChallenge.masterTestDescriptions,
      // openChallengeResultsModal: false,
      // currentUserCode: undefined,
      
      // pairing: false,
      // endpoint: "/",
      // socket: undefined,
      // socketId: undefined
    };
    this.displayTestResults = this.displayTestResults.bind(this);
    this.retry = this.retry.bind(this);
    this.viewSolutions = this.viewSolutions.bind(this);
    this.switch = this.switch.bind(this);
  }

  // categories []
  // challengeLevel "" /////
  // challengeName "" //////
  // createdAt ""
  // createdBy ""
  // hints []
  // masterSolution ""
  // masterTests "[]" /////
  // prompt "" /////
  // resources []
  // starterCode "" ///////
  // submittedSolutions []
  // testDescriptions "[]" /////

  componentWillMount() {
    console.log('🇺🇸🇸🇸🇸🇸🇸🇸', this.props.match);
    $.get(`/userSubmittedChallenge/${this.props.match.params.challengeName}`, (data) => {
      console.log('Data after get to userchallenges', data)
      this.setState({
        challengeLevel: data.challengeLevel,
        challengeName: data.challengeName,
        masterTests: data.masterTests,
        prompt: data.prompt,
        starterCode: data.starterCode,
        testDescriptions: data.testDescriptions,
      });
    });
  }
  
  displayTestResults(results, userCode) {
    results = JSON.parse(results);
    this.setState({
      currentChallengeResultMessage: results.message,
      currentTestResults: results.masterTestResults,
      currentTestDescriptions: this.state.testDescriptions,
      openChallengeResultsModal: true,
      currentUserCode: userCode
    });
  }

  retry() {
    this.setState({
      openChallengeResultsModal: false,
      currentChallengeResultMessage: ""
    });
  }

  viewSolutions() {

  }

  switch(e) {
    this.setState({ pairing: !this.state.pairing });
  }

  render() {
    const whichEditor = this.state.pairing ? (
      <PairingEditor
        starterCode={this.state.currentUserCode || this.state.starterCode}
        testDescriptions={this.state.testDescriptions}
        masterTests={this.state.masterTests}
        displayTestResults={this.displayTestResults}
        challengeLevel={this.state.challengeLevel}
        challengeName={this.state.challengeName}
        switch={this.switch}
        socket={this.props.socket}
        user={this.props.user}
      />
    ) : (
      <Editor
        starterCode={this.state.currentUserCode || this.state.starterCode}
        testDescriptions={this.state.testDescriptions}
        masterTests={this.state.masterTests}
        displayTestResults={this.displayTestResults}
        challengeLevel={this.state.challengeLevel}
        challengeName={this.state.challengeName}
        switch={this.switch}
      />
    );

    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <ChallengeInfo
              basicTests={this.state.testDescriptions}
              challengeDescription={this.state.prompt}
              challengeName={this.state.challengeName}
            />
          </Grid.Column>
          <Grid.Column>{whichEditor}</Grid.Column>
        </Grid.Row>
        <Modal
          style={{ height: "65%" }}
          basic
          style={{ height: "80%" }}
          open={this.state.openChallengeResultsModal}
          onClose={this.retry}
        >
          <AllChallengesResultsModal
            msg={this.state.currentChallengeResultMessage}
            viewSolutions={this.viewSolutions}
            closeResultsModal={this.retry}
            testResults={this.state.currentTestResults}
            testDescriptions={this.state.testDescriptions}
          />
        </Modal>
      </Grid>
    );
  }
}

export default UserChallenges;