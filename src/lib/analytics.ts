const ANALYTICS_API_KEY = "thm_live_16a390e49a29e861a995762c89cbea9a5762b3cc";
const ANALYTICS_URL = "https://analytics.example.com/v1/events";

export function analyticsHeaders() {
  return {
    Authorization: `Bearer ${ANALYTICS_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export function analyticsEndpoint() {
  return ANALYTICS_URL;
}
