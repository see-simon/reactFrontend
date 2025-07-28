import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',        
  timeout: 30 * 1000,         
  retries: 1,                  
  use: {
    headless: false,            
    baseURL: 'http://localhost:3000',  
    slowMo: 5000,   
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',  
  },
  timeout: 30000,  
  reporter: [['list'], ['html']],  
});
