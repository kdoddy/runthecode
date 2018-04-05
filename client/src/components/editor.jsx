import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import $ from 'jquery';
import PairingEditor from "./pairingEditor.jsx";
import {Link} from 'react-router-dom';

import 'brace/theme/kuroir';
import 'brace/mode/javascript';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import { Grid, Button } from 'semantic-ui-react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterUserSolutionCode: this.props.starterCode,
      challengeResults: []
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      masterUserSolutionCode: this.props.starterCode
    });
  }
  
  onChange(e) {
    this.setState({ masterUserSolutionCode: e });//|| this.props.starterCode });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {masterTests, displayTestResults, difficulty, challengeName} = this.props;
    const {masterUserSolutionCode} = this.state;
    $.ajax({
      type: "POST",
      url: "/challengeSolution",
      data: {
        masterUserSolutionCode: masterUserSolutionCode,
        masterTests: masterTests,
        challengeLevel: this.props.challengeLevel,
        challengeName: challengeName
      },
      success: data => {
        displayTestResults(data, masterUserSolutionCode);
        this.setState({masterUserSolutionCode: ''})
      },
      error: err => console.log(err)
    });
  }  

  render() {
    // let show = 
    return (
      <div>
        <AceEditor 
        mode="javascript" 
        theme="kuroir" 
        onChange={this.onChange} 
        value={this.state.masterUserSolutionCode || this.props.starterCode} 
        editorProps={{ $blockScrolling: true }} 
        width="100%" height="85vh" 
        />
        <Button onClick={this.handleSubmit} content="Submit Code" primary />
        <Button as={Link} to={`/pairing/${this.props.challengeName}/${this.props.roomname}`} content="Try Pair Programming" />
      </div>
    );
  }
}

export default Editor;