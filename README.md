## FilterGPSDeviceAPI
### API Details 
GET: http://tether-server.freighttiger.com/connect/filter-location
### Demo:- https://drive.google.com/file/d/1RcDX3H_CbDhOmqUdfV2M8o3LkizGLwr2/view?usp=sharing 
### Requirement Analysis
All the Vehicles of Samrat Carrier should be tracked on GPS. Sometimes LSP does not pass the five required field like latitude, longitude, speed, device time, and vehicle number so they want the remaining vehicle should be tracked on GPS which have 5 required field. Our FT system tracking serivice is designed in such a way that if there will be a single field missing out of five required fields then it will fail for all vehicles instead of a single vehicle.

### Solution
There is a custom API that will act as an upper layer for GPS Vendor API. It will filter only those vehicle detail from GPS Vendor API that has 5 essential fields latitude, longitude, speed, device time, and vehicle number. 

### API Response
<img width="732" alt="image" src="https://user-images.githubusercontent.com/98572450/226126001-749addf8-2f01-4cd5-a9b6-6a06c34ac38b.png">
<img width="767" alt="image" src="https://user-images.githubusercontent.com/98572450/226126036-478fc5e6-b31b-4e6a-a257-86f0806a767c.png">



     
