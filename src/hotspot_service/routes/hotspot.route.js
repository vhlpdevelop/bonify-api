const express = require("express");
const controller = require("../controllers/hotspot_controllers");
const router = express.Router();
//const middleware = require("../../middleware/auth.admin.middleware")


router.post('/hotspot-redirect', controller.hotspot_redirect)
router.post('/hotspotAutorize', controller.hotspotAutorize)	
router.post('/getAds', controller.getAds) //METHOD POST
router.get('/', controller.Hello)
// Exemplo de middleware router.post('/fetchStoreFromEmpresa',middleware, controller.fetchStoreFromEmpresa)



module.exports = router;