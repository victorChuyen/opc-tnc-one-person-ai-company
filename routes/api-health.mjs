// OPC-TNC — API Route: /api/health
// System health check endpoint for monitoring (UptimeRobot, Betterstack, etc.)

const startTime = Date.now();

/**
 * GET /api/health
 * Returns server uptime, memory usage, and system status
 */
export function handleHealth(req, res) {
    const uptimeMs = Date.now() - startTime;
    const uptimeMinutes = Math.floor(uptimeMs / 60000);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const mem = process.memoryUsage();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'OK',
        version: '2.0.0',
        uptime: {
            ms: uptimeMs,
            human: uptimeHours > 0
                ? `${uptimeHours}h ${uptimeMinutes % 60}m`
                : `${uptimeMinutes}m`
        },
        memory: {
            rss: `${Math.round(mem.rss / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)}MB`
        },
        domains: ['opc.breaths.live', 'ai.breaths.live'],
        engines: {
            telegram: !!process.env.TELEGRAM_BOT_TOKEN,
            resend: !!process.env.RESEND_API_KEY,
            composio: !!process.env.COMPOSIO_API_KEY,
            metaPixel: !!process.env.META_PIXEL_ID || true,
            vietqr: !!process.env.VIETQR_ACCOUNT_NO || true
        },
        timestamp: new Date().toISOString()
    }));
}
