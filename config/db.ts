let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connect = (dbUrl: string) => {
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

export default connect;
