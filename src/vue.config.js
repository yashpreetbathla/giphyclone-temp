module.exports = {
    
    pwa:{
        name:"pwa-giphy",
        workboxPluginMode : "InjectManifest",
        workboxOption:{
            swSrc : "src/service-worker.js"
        }

    }
};