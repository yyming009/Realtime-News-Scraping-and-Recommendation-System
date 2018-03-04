const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri);

  mongoose.connection.on('error', (err) => {
    console.error('mongoose connection error: ${err}');
    process.exit(1);
  });

  require('./user');
}
