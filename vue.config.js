module.exports = {

    transpileDependencies: [
        'vuetify'
    ],
    configureWebpack: {
        module: {
            rules: [{
                    test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot|glb|obj|gltf)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(hdr)$/,
                    use: 'url-loader'
                }
            ]
        }
    },
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                changeOrigin: true
            }
        }
    }

}