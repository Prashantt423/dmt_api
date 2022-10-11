let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = (dbUrl: string) => {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`[*] Connected to Database`);
    })
    .catch((err: Error) => {
      console.log(`[*] Error while connecting to DB, with error: ${err}`);
    });
};
