module.exports = {
    isAdmin: function(req, res, next) {
        if (req.user && req.user.role === 'admin') {
            return next();
        } else {
            return res.redirect('/?error=permission');
        }
    },
    isMember: function(req, res, next) {
        if (req.user && req.user.role === 'member') {
            return next();
        } else {
            return res.redirect('/?error=permission');
        }
    }
}




