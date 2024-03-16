"use strict";

const { add } = require("lodash");
const AccessService = require("../services/access.service");

class AccessController {
  
  setSession = async (req, res, next) =>{
    req.session.user = { name: req.body.username || 'Guest', status: "ok" };
    // res.send('SET OK!');
    console.log(req.session.id);
    res.status(201).json(req.session.user);
  }

  getSession = async (req, res, next) =>{
    const payload = {
      isvalid: req.session?.id || false,
      username: req.session.user,
    };
    console.log('session id', req.session?.id);
    res.status(201).json(payload)
  }

  signUp = async (req, res, next) => {
    console.log(`[P]::signUp::`, req.body);
    return res.status(201).json(await AccessService.signUp(req.body));
  }

  login= async (req, res, next) => {
    console.log('login::', req.body);
  }

}

module.exports = new AccessController();
