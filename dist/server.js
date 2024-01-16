"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const secrets_1 = require("./util/secrets");
const mongoUrl = secrets_1.MONGODB_URI;
// const options: mongoose.ConnectionOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// }
//function connect(mongoUrl: string, options?: mongoose.ConnectionOptions): Promise<Mongoose>;
// mongoose.connect(mongoUrl, options)
mongoose_1.default
    .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
})
    .then(() => {
    // Start Express server
    app_1.default.listen(app_1.default.get('port'), () => {
        console.log('  App is running at http://localhost:%d in %s mode', app_1.default.get('port'), app_1.default.get('env'));
        console.log('  Press CTRL-C to stop\n');
    });
})
    .catch((err) => {
    //console.log(app.get('port'),app.get('env'))
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    process.exit(1);
});
/**
 * Error Handler. Provides full stack - remove for production
 */
app_1.default.use((0, errorhandler_1.default)());
//# sourceMappingURL=server.js.map