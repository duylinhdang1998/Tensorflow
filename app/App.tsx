import React, { Fragment } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
// import RealtimeDemo from "./RealTime/RealTime";

const BACKEND_TO_USE = "rn-webgl";

export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      isTfReady: false,
      currentScreen: "main",
    };
  }

  async componentDidMount() {
    await tf.setBackend(BACKEND_TO_USE);
    await tf.ready();
    this.setState({
      isTfReady: true,
    });
  }

  showRealtimeDemo = () => {
    this.setState({
      currentScreen: "realtime",
    });
  };

  renderRealtimeDemo = () => {
    return (
      <View>
        <Text>123123</Text>
      </View>
    );
  };

  renderMainScreen = () => {
    return (
      <Fragment>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.showRealtimeDemo}
          >
            <Text style={styles.text}>Show realtime demo</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  };

  renderLoadingTF = () => {
    return (
      <Fragment>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Loading TF</Text>
        </View>
      </Fragment>
    );
  };

  renderContent = () => {
    const { currentScreen, isTfReady } = this.state;
    if (isTfReady) {
      switch (currentScreen) {
        case "main":
          return this.renderMainScreen();
        case "realtime":
          return this.renderRealtimeDemo();
        default:
          return this.renderMainScreen();
      }
    } else {
      return this.renderLoadingTF();
    }
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.body}>{this.renderContent()}</View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
  },
  sectionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    marginBottom: 6,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  text: {
    color: "#fff",
    paddingHorizontal: 10,
  },
});
