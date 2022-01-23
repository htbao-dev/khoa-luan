const authRouter = require('./router.auth');
const userRouter = require('./router.user');
const roomRouter = require('./router.room');
function route(app){
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/room', roomRouter);
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    })
}

module.exports = route;