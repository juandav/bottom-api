/*
* Module dependencies
*/
import jwt from 'jwt-simple';
import moment from 'moment';

export default (data) => {
  return () => {
    let payload = {
       sub: data._id,
       iat: moment().unix(),
       exp: moment().add(data.day, 'days').unix()
     };

    return jwt.encode(payload, data.secret);
  };
};

export let decode = (token, secret) => {
  return jwt.decode( token, secret );
}
