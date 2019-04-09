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
export default class UserList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Left>
                <Text>Mohammed</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Shaq</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Phil</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Chris</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
