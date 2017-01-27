var onvif = require('node-onvif');
var fs = require('fs');
 
// Create an OnvifDevice object
var device = new onvif.OnvifDevice({
  xaddr: 'http://172.16.10.73/onvif/device_service',
  user : 'admin',
  pass : '12345678y'
});
 
// Initialize the OnvifDevice object
device.init((error) => {
  if(error) {
    console.log('[ERROR] ' + error.message);
    return;
  }
  // Get the data of the snapshot
  console.log('fetching the data of the snapshot...');
  device.fetchSnapshot((error, res) => {
    if(error) {
      console.log(error.message);
      return;
    }
    // Save the data to a file
    fs.writeFile('snapshot.jpg', res.body, function (error) {
      if(error) {
        console.log(error.message);
      } else {
        console.log('Done!');
      }
    });
  });
});
