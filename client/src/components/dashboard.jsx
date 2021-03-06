import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  Image,
  Icon,
  Header,
  Grid,
  Segment,
  Container,
  Label,
  Form,
  Card,
  Feed
} from "semantic-ui-react";

const Wrapper = styled.div`

`;

const TopWrapper = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 5px solid black;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  padding-bottom: 20px;
  font-size: 5rem;
  color: #6f999d;
`;

const SubHeading = styled.h1`
  color: #9ab751;
  font-size: 3rem;
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDashboard: true
    };
    // this.onlineUpdate = this.onlineUpdate.bind(this);
  }
  componentDidMount() {
    console.log('I am on the dashboard: ', this.state.onDashboard);
    console.log('The user is: ', this.props.user);
    console.log("In dashboard, socket is ", this.props.socket);
    this.props.onlineUpdate();
  }

  // onlineUpdate() {
  //   this.props.socket.emit("onlineUpdate", this.props.user.username);
  // }


  // Friends
  // Site ranking
  // Current Level
    // Current XP
  // Challenges passed
    // your solutions
  // Available Challenges
  // Find a mentor
  // Become a mentor

  render() {
    const { user } = this.props;
    let completed = this.props.user.completedInitial ? 'YES' : 'NO';
    console.log('coooommmmppp', user.completedInitial);
    console.log('AYYYYYYY', user);
    return <Wrapper>
        <TopWrapper>
          <Label size="huge" color="black">
            <Icon name="marker" />
            Current Level:
            <Label.Detail>{user.level}</Label.Detail>
          </Label>
          <Label size="huge" color="black">
            <Icon name="code" />
            Completed Challenges:
            <Label.Detail>{user.completedChallenges.length}</Label.Detail>
          </Label>
          <Label size="huge" color="black">
            <Icon name="trophy" />
            Site Ranking:
            <Label.Detail>{user.level}</Label.Detail>
          </Label>
        </TopWrapper>
        <Heading>DASHBOARD</Heading>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Card centered raised color="blue" style={{ width: "70%", minHeight: "40vh" }}>
                <Card.Content>
                  <Card.Header><SubHeading>Your Learning Path</SubHeading></Card.Header>
                </Card.Content>
                <Card.Content>
                  <br />
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          <h3>
                            Initial Challenges Completed: {completed}
                          </h3>
                        </Feed.Summary>
                        <Feed.Date content="1 day ago" />
                      </Feed.Content>
                    </Feed.Event>
                    <br />
                    <br />
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          <h3>
                            Course Challenges Completed:{" "}
                            {
                              Object.keys(user.completedCourseChallenges)
                                .length
                            }
                          </h3>
                        </Feed.Summary>
                        <Feed.Date content="3 hours ago" />
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                  <br />
                  <br />
                  <Button as={Link} to="/course" content="Keep Learning" primary />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Card centered raised color="blue" style={{ width: "70%", minHeight: "40vh" }}>
                <Card.Content>
                  <Card.Header><SubHeading>Your Challenge Path</SubHeading></Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          <h3>
                            Total Challenges Completed:{" "}
                            {
                              Object.keys(user.completedCourseChallenges)
                                .length
                            }
                          </h3>
                        </Feed.Summary>
                        <Feed.Date content="1 hour ago" />
                      </Feed.Content>
                    </Feed.Event>
                    <br />
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          <h3>Your Solution Upvotes: 0</h3>
                        </Feed.Summary>
                        <Feed.Date content="1 hours ago" />
                      </Feed.Content>
                    </Feed.Event>
                    <br />
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Summary>
                          <h3>Added Challenges: 0</h3>
                        </Feed.Summary>
                        <Feed.Date content="1 hours ago" />
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                  <br />
                  <br />
                  <Button as={Link} to="/allChallenges" content="All Challenges" primary />
                  <Button as={Link} to="/newChallengeForm" content="Create a challenge!" primary />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>;
  }
}

export default Dashboard;