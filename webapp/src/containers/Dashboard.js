import React, { Component } from "react";

import { connect } from "react-redux";
import io from "socket.io-client";
import { initSocket, updateReports } from "../actions";
import { Link } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: {},
      selectedReport: {},
      showingInfoWindow: false,
      center: { lat: 50.87, lng: 20.62 }
    };
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedReport: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  fixReport = key => {
    this.props.socket.emit("fixReport", this.props.reports[key]._id);
  };

  showOnMap = key => {
    let report = this.props.reports[key];
    this.setState({
      center: { lat: report.latitude, lng: report.longitude }
    });
  };

  componentDidMount() {
    const socket = io("http://localhost:2137");
    this.props.dispatch(initSocket(socket));

    socket.on("reports", reports => {
      this.props.dispatch(updateReports(reports));
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <Link className="navbar-brand" to="/" style={{ color: "white" }}>
            Moduł Policja Kielce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>

        <main role="main" className="container-fluid">
          <div className="row">
            <div
              className="col-3"
              style={{ height: "90vh", marginTop: "2vh", overflow: "scroll" }}
            >
              {this.props.reports.map((report, key) => (
                <div className="card" key={key}>
                  <div
                    className="card-body"
                    style={{
                      borderLeft:
                        "20px solid " + mapCategoryToColor(report.category)
                    }}
                  >
                    <h5 class="card-title">{report.description}</h5>
                    <div class="card-text row">
                      <div className="col-6">{report.extra}</div>
                      <div className="col-6">
                        <div className="row">
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => this.fixReport(key)}
                          >
                            PRZYJMIJ ZGLOSZENIE
                          </button>
                        </div>
                        <div className="row">
                          <button
                            type="button"
                            class="btn btn-success"
                            onClick={() => this.showOnMap(key)}
                          >
                            POKAŻ NA MAPIE
                          </button>
                        </div>
                        <div className="row">
                          <h4>{report.confirmations} potwierdzenia</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-9">
              <Map
                className="map"
                google={this.props.google}
                onClick={this.onMapClicked}
                style={{ height: "90vh", position: "relative", width: "100%" }}
                zoom={14}
                initialCenter={{ lat: 50.87, lng: 20.62 }} // Kielce,
                center={this.state.center}
              >
                {this.props.reports.map((report, key) => (
                  <Marker
                    description={report.description}
                    extra={report.extra}
                    latitude={report.latitude}
                    longitude={report.longitude}
                    confirmations={report.confirmations}
                    onClick={this.onMarkerClick}
                    position={{ lat: report.latitude, lng: report.longitude }}
                    key={key}
                  />
                ))}

                <InfoWindow
                  marker={this.state.activeMarker}
                  onClose={this.onInfoWindowClose}
                  visible={this.state.showingInfoWindow}
                >
                  <div>
                    <h1>{this.state.selectedReport.description}</h1>
                    <p>{this.state.selectedReport.extra}</p>
                    <p>
                      [{this.state.selectedReport.latitude},{" "}
                      {this.state.selectedReport.longitude}]
                    </p>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reports: state.appReducer.reports,
    socket: state.appReducer.socket,
    showReportModal: state.appReducer.showReportModal
  };
};

const mapCategoryToColor = category => {
  switch (category) {
    case "REPORT_NIEBEZPIECZENSTWO": {
      return "red";
    }

    case "REPORT_USTERKA": {
      return "yellow";
    }

    case "REPORT_INFORMACJA": {
      return "deepSkyBlue";
    }

    default: {
      return "red";
    }
  }
};

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyC_0nCU1yWHQsAjKJbLb7zxvQ-us0CFjU4"
  })(Dashboard)
);
