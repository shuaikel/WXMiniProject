

const HOSTS = {
  test: 'http://mall-api-test.ewgvip.com',
  dev: 'http://mall-api-dev.ewgvip.com',
  prev: 'https://mall-api-prev.ewgvip.com',
  prod: 'https://mall-api-prod.ewgvip.com',
}

const FILEHOSTS = {
  dev: 'http://file-service-api-dev.ewgvip.com',
  test: 'http://file-service-api-test.ewgvip.com',
  prev: 'https://file-service-api-prev.ewgvip.com',
  prod: 'https://file-service-api-prod.ewgvip.com',
}

const DevConfigTool = {
  getDevEnvConfigAction(){
    var app = getApp();
    var node_env = app.globalData.node_env;
    var config = {
      host: HOSTS[node_env],
      file: FILEHOSTS[node_env],
    }
    return config;
  }
} 


export const ISPRODUCT = false;
export const NODE_ENV = 'test' // prev test prod dev
export const VERSIONS = '2.0';
export const DevConfig = DevConfigTool;