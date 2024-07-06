// GIFTED TECH //
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFKWGt1NkRuaktSdUNNUlhPclRZSHJSanAzTEljNE1EVC9rM0JZYXRXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNG9xTUhjUGs0eVd2YTBrbjdFT2lkeEZiWDJiM2pWZUhvSWZRMndkM2wydz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSzlxdWRsd1kxYTFWeForVGJDeHkwTW5KRVN0RmdsZHFOeWtSc2w0alVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiRmJoK0N5K3BhaVIra1hsc2dmVVNDam1zdGhoY3JEclQzOFloYkV1bDJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLeFMvdEtmcFYvMlpIcDdsZ1JzSFJ5M1JXZXJ3anJ6RmdLS2hVK3N5WDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFkUmpkS2dnSWZUMWNXRThTYVN2SW1HU0ZDVkVTQVNxM0x6YmIzRkNvVTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEFKMitPcVlWSnEzNkN2TnNrWHQ1UHZDVlJBUmtoR25jalIrbVorUWhGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWmxZUEhMdkdQeEtVVFFNTW54cDVDQlRtQWw2VVlWd1NpSEJjb3EwYWduaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxCejc2TGZmNG5sZm9UOU1JUDBLenROQVpiT2hORWZhbFhENGVxMVNKSG9NQmx4R2JHcGJ5OGpTdm5sc3lRL2kveWhQTGd5M21YbFRRV2s1cFg0aEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMwLCJhZHZTZWNyZXRLZXkiOiIrekZESFpqMUlKWGRlaHhJcHg1ZWNoS29jWUNPRmtFczg2MmJlbUNUMFEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmeWExTTR4Y1FJcVl1dDRnVUVkRnpBIiwicGhvbmVJZCI6IjE5OWFkM2UzLTc0MGEtNDI4ZS1hMTA4LWI1OWFlMDRkMmU3OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtNi9HYkNtcXhsRUwzM0xnc1ZOdWowNStoVGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMUpHeDdGWEhZZ2ZDZFN3T2RVSklOMFlrNlJRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVWMjJIQzI2IiwibWUiOnsiaWQiOiIyNTQ3NTM2NDA5MjA6MTBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p6czc3OEJFTDZLbTdRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRRNjJyd1liMWpWS0pUQTJTaURVR3l6SmkwdTJrWjJJVzZNM0RPWEZCa2s9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNtSEpLYWJ1RHZFOXRhQktieFRmdHZzT1JaWUl0cGJGa2tMYUZBbmNvQWVCOU5XR3A1VVFJQVluUU56MlVic0pDVUdsUDUyMWJmcUNJTWYzOFNyN0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2enFRMzlGRXh2a0R3VWF3RWE3Z21LQVRacDNtWGpKdWM5T2JWdEVFVDEyaC9ORHcwOXJ1WHFnQmdhY3ZmSHZhNHVkV0ZXRm85ZnRWbTZzTTQ3WENBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1MzY0MDkyMDoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVU90cThHRzlZMVNpVXdOa29nMUJzc3lZdEx0cEdkaUZ1ak53emx4UVpKIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMTA4MzYzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlzeiJ9",
  HEROKU_API_TOKEN: process.env.HEROKU_API_TOKEN || "HRKU-0a1fe665-8a35-42e8-b7ad-761f25ffe195",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  KOYEB_API_TOKEN: process.env.KOYEB_API_TOKEN || "",
  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || "",
  DEPLOYMENT_PLATFORM: process.env.DEPLOYMENT_PLATFORM || "",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DOWNLOAD: process.env.AUTO_DOWNLOAD !== undefined ? process.env.AUTO_DL === 'true' : true,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : true,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  AUTO_REJECT_CALLS: process.env.AUTO_REJECT_CALLS !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || 'private',
  PREFIX: process.env.PREFIX || '.',
  PORT: process.env.PORT || "5000", /* Where App Will Listen On */
  OWNER_NAME: process.env.OWNER_NAME || "ɢɪғᴛᴇᴅ ᴛᴇᴄʜ",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254110853827",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
