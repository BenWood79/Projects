
function userAccess(req, res, next) {
    if (req.user != null)
        if (req.user.role === 'admin' || req.user.role == 'member') {
            next();
            return;
        }
    res.redirect('/login');
}

function viewDetails(req, res, next) {
    if (req.user != null)
        if(req.user.role === "admin" || req.user.role == "member") {
            next()
            return;
        }
    res.redirect('/login');
}
