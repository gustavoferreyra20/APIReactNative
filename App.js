import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Content, Footer, Text, Button, Grid, Title, Col, Row} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const llamarAPI = () => {
  return fetch('http://www.boredapi.com/api/activity/')
    .then((response) => response.json())
    .then((json) => {
      return json.activity;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      respuesta: null
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>

        <Header style={{padding: 10}}>
          <Title>API React-Native</Title>
        </Header>

        <Content>
          <Grid>
          <Col contentContainerStyle={{flex: 1}} style={{padding: 10}}>
                <Row style={{justifyContent: 'center', padding: 10} }>
                  <Text>Bored API React</Text>  
                </Row>

                <Row style={{justifyContent: 'center', padding: 10}}>
                <Button onPress={() => this.handlerClick()}>
                  <Text >Llamar API</Text>
                    
                </Button>
                </Row>

                <Row style={{justifyContent: 'center', padding: 10} }>
                  <Text>{this.state.respuesta}</Text>  
                </Row>
              </Col>
          </Grid>
        </Content>
        <Footer />
      </Container>
    );
  }

  handlerClick(){
    llamarAPI().then(resp=> {
      this.setState({respuesta: resp});
    });
  }
  
}
