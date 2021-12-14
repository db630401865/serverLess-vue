const nodesdk = require('@cloudbase/node-sdk') 

const clouddb = nodesdk.init({
  env:'mycloud-1g1jv3t870135c18', // 环境的id 
  secretId:'AKIDAAxncKt0vjUBfz71h8KI2XpvnRt89wXu',// 当前用户的ID
  secretKey:'CAtOegT7YkhT1KVenmY5MQGsELDqEPL2' // 当前用户的key
})

const app = clouddb.database()

module.exports = app

