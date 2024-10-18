import * as process from "node:process";

export const appConfig = () => ({
    fluxApiKey: process.env.FLUX_API_KEY || 'key',
    domain: process.env.DOMAIN || 'localhost:3000',
    port: process.env.PORT || 3000,
});
