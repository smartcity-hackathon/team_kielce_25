import Report from "../../model/report";
import User from "../../model/user";

const dziurawdrodze = {
  start: function(io) {
    io.on("connection", socket => {
      console.log("socket connected");

      Report.find({ fixed: false }, (err, reports) => {
        socket.emit("reports", reports);
      });

      socket.on("newReport", report => {
        let newReport = new Report({
          userID: report.userID,
          latitude: report.latitude,
          longitude: report.longitude,
          description: report.description,
          category: report.category,
          confirmations: report.confirmations,
          extra: report.extra
        });

        newReport.save((err, report) => {
          Report.find({ fixed: false }, (err, reports) => {
            io.emit("reports", reports);
          });
        });
      });

      socket.on("fixReport", reportID => {
        Report.findOneAndUpdate(
          { _id: reportID },
          { fixed: true },
          (err, result) => {
            Report.find({ fixed: false }, (err, reports) => {
              io.emit("reports", reports);
            });
          }
        );
      });

      socket.on("confirmReport", reportID => {
        Report.findOneAndUpdate(
          { _id: reportID },
          { $inc: { confirmations: 1 } },
          (err, result) => {
            Report.find({ fixed: false }, (err, reports) => {
              io.emit("reports", reports);
            });
          }
        );
      });

      socket.on("disconnect", () => {});
    });
  }
};

export default dziurawdrodze;
