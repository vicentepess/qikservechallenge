const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports=app =>{
    app.use(
        createProxyMiddleware("/products",
        {
            target: "http://localhost:8081",
            changeOrigin: true
        })
    )
}