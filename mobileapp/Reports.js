import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";

class Reports extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.reports
          .filter(report => {
            let distance = this.calculateDistance(
              report.latitude,
              report.longitude
            ).toFixed(0);
            return distance < 2000;
          })
          .sort((a, b) => {
            let distanceA = this.calculateDistance(
              a.latitude,
              a.longitude
            ).toFixed(0);
            let distanceB = this.calculateDistance(
              b.latitude,
              b.longitude
            ).toFixed(0);
            return distanceA - distanceB;
          })
          .map((report, key) => (
            <TouchableOpacity
              key={key}
              style={{
                padding: 10,
                borderLeftColor: mapCategoryToColor(report.category),
                borderLeftWidth: 5,
                marginBottom: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 20 }}>{report.description}</Text>
                  <Text>{report.extra}</Text>
                  <Text>
                    {this.calculateDistance(
                      report.latitude,
                      report.longitude
                    ).toFixed(0)}{" "}
                    metrów
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly"
                    }}
                  >
                    <View>
                      <Icon
                        name="thumb-down"
                        disabled={report.confirmations !== 1}
                        color={
                          report.confirmations === 1 ? "#212121" : "#616161"
                        }
                      />
                    </View>
                    <View>
                      <Icon
                        name="thumb-up"
                        onPress={() => this.confirmReport(report)}
                        disabled={report.confirmations !== 1}
                        color={
                          report.confirmations === 1 ? "#212121" : "#616161"
                        }
                      />
                    </View>
                  </View>

                  <Text>{report.confirmations} potwierdzeń</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  }

  confirmReport(report) {
    this.props.socket.emit("confirmReport", report._id);
  }

  calculateDistance(lat, lng) {
    return this.getDistanceFromLatLonInKm(
      Number(lat),
      Number(lng),
      Number(this.props.region.latitude),
      Number(this.props.region.longitude)
    );
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000; // Distance in m
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

const mapCategoryToColor = category => {
  switch (category) {
    case "REPORT_NIEBEZPIECZENSTWO": {
      return "#E53935";
    }

    case "REPORT_USTERKA": {
      return "#FDD835";
    }

    case "REPORT_INFORMACJA": {
      return "#039BE5";
    }

    default: {
      return "#E53935";
    }
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 10
  }
});

const mapStateToProps = state => {
  return {
    region: state.appReducer.region,
    reports: state.appReducer.reports,
    socket: state.appReducer.socket
  };
};

export default connect(mapStateToProps)(Reports);
