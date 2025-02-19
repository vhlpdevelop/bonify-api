
module.exports = {
  apps: [
    {
      name: `HotSpot Service`,
      script: './src/hotspot_service/app.js',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
     
    },
    {
      name: `API GATEWAY`,
      script: './src/app.js',
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
   
    },
  ]
}