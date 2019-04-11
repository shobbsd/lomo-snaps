import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon
} from "native-base";
import "@firebase/firestore";
import firebaseConnect from "../../firebaseConfig";
import Loading from '../components/Loading';


export default class UserList extends Component {

  state = {
    attendees: {},
    event: {}
  }

  componentDidMount() {
    const { event } = this.props
    this.setState({ event })
  }


  render() {
    const { event } = this.props
    if (!event) return <Loading />
    else {
      return (
        <Container>
          <Content>
            <List>
              {event.attendeesUids.map(attendee => {
                console.log(attendee)
                return <ListItem key={attendee}>
                  <Left>
                    <Text>{event.attendeesNames[attendee]}</Text>
                  </Left>
                  <Right>
                    <Text>{event.photosleft[attendee]}</Text>
                  </Right>
                </ListItem>
              })}

            </List>
          </Content>
        </Container>
      );
    }
  }
}
