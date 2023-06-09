const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(";")[0]
    : "http://localhost:17998";

const context = [
    "/api/cliente",
    "/api/clientesegmento",
    "/api/clientecomunicacion",
    "/api/inventario",
    "/api/usuario",
    "/api/producto",
    "/api/orden",
    "/api/detalle",
    "/api/evento",
    "/api/reporte",
    "/api/historialrefreshtoken",
    "/api",
];

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
};

module.exports = function (
    /** @type {{ use: (arg0: import("http-proxy-middleware").RequestHandler) => void; }} */ app
) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        // Handle errors to prevent the proxy middleware from crashing when
        // the ASP NET Core webserver is unavailable
        onError: onError,
        secure: false,
        // Uncomment this line to add support for proxying websockets
        //ws: true,
        headers: {
            Connection: "Keep-Alive",
        },
    });

    app.use(appProxy);
};
