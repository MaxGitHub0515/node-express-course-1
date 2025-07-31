
// Hnadle env switching
let logger;
// dynamic import
if (process.env.NODE_ENV === 'production') {
    logger = await import("./loggerProd.js").then(mod => m.default);
} else {
    logger = await import("./loggerDev.js").then(mod => mod.default);
}


