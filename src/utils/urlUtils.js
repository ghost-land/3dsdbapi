function getBaseUrl(req) {
    return `${req.protocol}://${req.get('host')}`;
  }
  
  module.exports = { getBaseUrl };