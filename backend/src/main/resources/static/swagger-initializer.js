window.onload = function() {
    const ui = SwaggerUIBundle({
        url: "/v3/api-docs", // Endpoint API
        dom_id: '#swagger-ui',
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        requestInterceptor: (req) => {
            req.headers['ngrok-skip-browser-warning'] = 'true'; // Bỏ qua cảnh báo bảo mật
            return req;
        },
    })
    window.ui = ui
}
