const currentEnv = process.env.NODE_ENV;

export const isDev = currentEnv === 'development';
export const isProd = currentEnv === 'production';
