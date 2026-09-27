import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.germanteacher.app',
  appName: 'German Teacher',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
