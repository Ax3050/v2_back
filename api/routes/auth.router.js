const express = require('express');
const passport = require('passport')
const jwt =  require('jsonwebtoken')
const {config}= require('./../config/config')
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (request, response, next) => {
    try {
      const payload = {
        sub: request.user.id
      }
      const token = jwt.sign(payload, config.jwtSecret)
      response.json({user: request.user, token})
    } catch (error) {
      next(error);
    }
})

module.exports = router;
