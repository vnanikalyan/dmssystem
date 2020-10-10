const controller = require('../controllers/controller');

function ControlInterceptor(objCollection) {
    new controller(objCollection);
}

module.exports = ControlInterceptor;