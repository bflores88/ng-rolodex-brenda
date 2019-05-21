'use strict';

module.exports = function(req, res, next) {
  let userName = req.body.username.trim();
  let userNameLength = userName.length;
  let userPass = req.body.password;
  let userPassLength = userPass.length;

  if (userNameLength <= 18 && userNameLength >= 3 && userName.indexOf(' ') === -1) {
    if (userPassLength >= 6 && userPassLength <= 20) {
      return next();
    } else {
      return res.send('{ error: Password must be between 6 and 20 characters in length. }');
    }
  } else {
    return res.send('{ error: Username must be between 3 and 18 characters in length and not contain spaces. }');
  }
};
