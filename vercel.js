{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.js",
      "use": "@nuxt/vercel-builder",
      "config": {}
    }
  ],
  "routes": [
    {
      "src": "/api/cut-video",
      "dest": "/api/cut-video.js"
    },
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}

