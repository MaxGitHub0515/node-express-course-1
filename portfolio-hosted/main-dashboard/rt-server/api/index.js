

// Vercel Forced - API routes
import app from "../server.js"

export default function handler(req, res) {
    return app(req, res) // bridging express with vercel serverless
}

