import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ToolbarAndroid,
  TouchableOpacity,
  TouchableNativeFeedback,
  BackHandler
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { report, confirmReport, updateBottomState } from "./actions";
import { DELETE_REPORT } from "./actions/actionTypes";
import Button from "react-native-button";
import { TextField } from "react-native-material-textfield";
import * as Animatable from "react-native-animatable";

const actionByLevel = {
  1: updateBottomState,
  2: confirmReport
};

class ReportButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  render() {
    if (this.props.level === 0) {
      return (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Icon
              containerStyle={{ width: 55 }}
              name="person-outline"
              size={30}
            />
          </View>

          <View>
            <Icon containerStyle={{ width: 55 }} name="list" size={30} />
          </View>
        </View>
      );
    } else if (this.props.level === 3) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 2 }}>
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                {this.props.bottomText}
              </Text>
            </View>
            <View style={{ flex: 8 }}>
              <TextField
                label="Opcjonalny komentarz"
                value={this.state.comment}
                onChangeText={comment => this.setState({ comment })}
              />
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-evenly"
                }}
              >
                <Button
                  onPress={() => {
                    this.props.dispatch(
                      report(
                        ...this.props.payload,
                        this.props.category,
                        this.props.subcategory,
                        this.state.comment
                      )
                    );
                    this.props.dispatch(updateBottomState(DELETE_REPORT));
                    this.setState({ comment: "" });
                  }}
                  containerStyle={{
                    padding: 10,
                    height: 45,
                    overflow: "hidden",
                    borderRadius: 4,
                    backgroundColor: "#4CAF50",
                    width: 170
                  }}
                  disabledContainerStyle={{ backgroundColor: "grey" }}
                  style={{ fontSize: 20, color: "white" }}
                >
                  Wyslij
                </Button>
                <Button
                  onPress={() => {
                    this.props.dispatch(updateBottomState(DELETE_REPORT));
                    this.setState({ comment: "" });
                  }}
                  containerStyle={{
                    padding: 10,
                    height: 45,
                    overflow: "hidden",
                    borderRadius: 4,
                    backgroundColor: "#E53935",
                    width: 170
                  }}
                  disabledContainerStyle={{ backgroundColor: "grey" }}
                  style={{ fontSize: 20, color: "white" }}
                >
                  Anuluj
                </Button>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
            justifyContent: "center"
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            {this.props.bottomText}
          </Text>
        </View>

        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          {this.props.buttons.map(x => (
            <View key={x.text}>
              <Icon
                raised
                name={x.icon}
                type="font-awesome"
                color={x.color}
                onPress={() => {
                  this.props.dispatch(
                    actionByLevel[this.props.level](x.payload)
                  );
                }}
              />
              <Text style={{ textAlign: "center" }}>{x.text}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    payload: [
      state.appReducer.region.latitude,
      state.appReducer.region.longitude,
      state.appReducer.socket
    ],
    bottomState: state.uiReducer.bottomState,
    bottomText: state.uiReducer.bottomText,
    buttons: state.uiReducer.buttons,
    level: state.uiReducer.level,
    category: state.uiReducer.category,
    subcategory: state.uiReducer.subcategory
  };
};
export default connect(mapStateToProps)(ReportButtons);
