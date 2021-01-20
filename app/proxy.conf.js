var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/api/*',
  target: 'https://wsgap2.redsos.com.ar/api',
  secure: false,
  "logLevel":"debug"
}];

function setupForCorporateProxy(proxyConfig) {
  console.log("=================");
  console.log(proxyConfig);
  console.log(process.env.http_proxy);
  console.log(process.env.HTTP_PROXY);
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY || "https://wsgap2.redsos.com.ar/api";
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
