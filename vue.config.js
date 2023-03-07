
module.exports ={
  
  devServer:{
    proxy:{
      '/api':{// /api 로 요청하면 밑으로 우회한다
        target:'http://localhost:8080',
        changeOrigin:true,
        pathRewrite:{
          '^/':''
        }
      }
    }
  }
}