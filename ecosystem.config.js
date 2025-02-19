
module.exports = {
  apps: [
    {
      name: `HotSpot Service`,
      script: 'build/src/hotspot_service/app.js',
      instances: "max",
      exec_mode: "cluster",
    },
    {
      name: `API GATEWAY`,
      script: 'build/src/app.js',
      instances: "max",
      exec_mode: "cluster",
    },
  ]
}