import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import $ from 'jquery';

import 'brace/theme/kuroir';
import 'brace/mode/javascript';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import { Grid, Button } from 'semantic-ui-react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterUserSolutionCode: '',
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
    this.setState({ masterUserSolutionCode: e || this.props.starterCode });
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
        displayTestResults(data);
        this.setState({masterUserSolutionCode: '',})
      },
      error: err => console.log(err)
    });
  }  

  render() {
    return(
      <div>
        <AceEditor
          mode='javascript'
          theme="kuroir"
          onChange={this.onChange}
          value={this.state.masterUserSolutionCode || this.props.starterCode}
          editorProps={{ $blockScrolling: true }}
          width='100%'
          height='85vh'
        />
        <Button onClick={this.handleSubmit} content="Send to server" primary />
      </div>
    )
  }
}

export default Editor;