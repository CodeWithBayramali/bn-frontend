module.exports = {
    apps: [
      {
        name: "bn-frontend",
        script: "npm",
        args: "start",
        cwd: "/home/ozkan/bn-frontend", // Uygulamanızın dizinini buraya koyun
        watch: true,
        env: {
          NODE_ENV: "production",
        },
        env_production: {
          NODE_ENV: "production",
          NEXT_PUBLIC_BACKEND_API: "http://localhost:8080/v1/api",
          NEXT_PUBLIC_DOCUMENT_URL: "http://localhost:8080/v1/api/management",
          NEXTAUTH_URL: "https://bn.org.tr",
          JWT_SECRET: "RDDCT6me8cETAsAiABsYc0FwzLlu4CcNJWMBV8OdGt8Qrt2hleK1W/p/9K8kJuaNcqnsVgZ6PvfR2QcshYBGBqH3MJVekOHlQoyM9VspWkYFNovzBn/QOPiHyLGsaDhB/KIUleVCaMJK3YktQavVvGsFbld1QYXqnkeLZ9jb5tw=",
          NEXTAUTH_SECRET: "4a0b79ae5b104bbd39f7bfa1d9fa1e44e243c72fa4902b704230f17ae541b3e9",
        },
      },
    ],
  };