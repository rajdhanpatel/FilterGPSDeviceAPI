const getDataFromExternalAPI = require('../services/deviceLocationData');
const loconavUrl = process.env.LOCONAV_URL;
const logger = require('../logger/logger');
const { StatusCodes } = require('http-status-codes');
const { FILTER_LOCATION_DATA_CHANNEL, SLACK_WEBHOOK_URL } = require('../constants/slackConstants');
const SlackNotify = require('slack-notify');
const slack = SlackNotify(SLACK_WEBHOOK_URL);

module.exports.getFilteredData = async (req,res)=>{
    try {        
        const response = await getDataFromExternalAPI(loconavUrl);
        
        logger.info(`response from external device location API ${JSON.stringify(response)}`);
        const deviceVendorData = [];  
        const deviceLocationObject = response?.data; 
        slack.send({ channel: FILTER_LOCATION_DATA_CHANNEL, text: `response from external device location API:- ${deviceLocationObject.length} object`  });
        for(const obj of deviceLocationObject){
          const lattitude = obj?.additional_attributes?.movement_metrics?.location?.lat;
          const longitude = obj?.additional_attributes?.movement_metrics?.location?.long;
          const speed = obj?.additional_attributes?.movement_metrics?.speed?.value;
          const deviceTime = obj?.status_message?.received_at;
          const vehicleNumber = obj?.number;
          
          if (lattitude && longitude && speed>=0 && deviceTime && vehicleNumber) {
            deviceVendorData.push({
              Lat: lattitude,
              Long: longitude,
              Speed: speed,
              DeviceTime: deviceTime,
              VehicleNumber: vehicleNumber
            });
          } 
        }
        if(deviceVendorData.length>0) {
          slack.send({ channel: FILTER_LOCATION_DATA_CHANNEL, text: `response from filter device location API:- ${deviceVendorData.length} object` });
          logger.info(`response from filter device location API ${JSON.stringify(deviceVendorData)}`);
          return res.status(StatusCodes.OK).json({ success: true, data: deviceVendorData });
        }
    }
    catch (error) {
      slack.alert({ channel: FILTER_LOCATION_DATA_CHANNEL, text: `error occured in device location API ${error.message}` });
      logger.error(`error occured in device location API ${error.message}`);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false, 
        message: error.message 
      });
    }
}
