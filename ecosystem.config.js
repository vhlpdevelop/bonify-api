
module.exports = {
  apps: [
    {
      name: `HotSpot Service`,
      script: './src/hotspot_service/app.js',
     
      exec_mode: "cluster",
    },
    {
      name: `API GATEWAY`,
      script: './src/app.js',
 
      exec_mode: "cluster",
    },
  ]
}