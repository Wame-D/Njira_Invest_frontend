module.exports = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: 'https://forex.xhed.net/' }, // Replace '*' with your frontend's origin if needed
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },
};