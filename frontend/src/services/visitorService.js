import apiClient from "./apiClient";

const VISITOR_UUID_KEY = "portfolio_visitor_uuid";
const VISITOR_DB_ID_KEY = "portfolio_visitor_db_id";

function getVisitorUUID() {
  let visitorUUID = localStorage.getItem(
    VISITOR_UUID_KEY
  );

  if (!visitorUUID) {
    visitorUUID = crypto.randomUUID();

    localStorage.setItem(
      VISITOR_UUID_KEY,
      visitorUUID
    );
  }

  return visitorUUID;
}

export async function initializeVisitor() {
  const visitorUUID = getVisitorUUID();

  const response = await apiClient.post(
    "/visitors",
    {
      visitor_id: visitorUUID,
      device_type: getDeviceType(),
      browser: getBrowser(),
      operating_system: getOperatingSystem(),
      referrer: document.referrer || null,
    }
  );

  const databaseId = response.data.id;

  localStorage.setItem(
    VISITOR_DB_ID_KEY,
    String(databaseId)
  );

  return databaseId;
}

export async function recordPageVisit(
  visitorDatabaseId,
  pagePath,
  sessionId
) {
  if (!visitorDatabaseId) return null;

  const response = await apiClient.post("/page-visits", {
    visitor_id: visitorDatabaseId,
    page_path: pagePath,
    page_title: document.title,
    session_id: sessionId,
  });

  return response.data;
}

export async function updateVisitorLocation(
  visitorUUID,
  latitude,
  longitude
) {
  const response = await apiClient.patch(
    "/visitors/location",
    {
      visitor_id: visitorUUID,
      latitude,
      longitude,
    }
  );

  return response.data;
}

function getDeviceType() {
  const width = window.innerWidth;

  if (width <= 600) {
    return "mobile";
  }

  if (width <= 1024) {
    return "tablet";
  }

  return "desktop";
}

function getBrowser() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Edg")) {
    return "Edge";
  }

  if (userAgent.includes("Chrome")) {
    return "Chrome";
  }

  if (userAgent.includes("Firefox")) {
    return "Firefox";
  }

  if (userAgent.includes("Safari")) {
    return "Safari";
  }

  return "Unknown";
}

function getOperatingSystem() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Windows")) {
    return "Windows";
  }

  if (userAgent.includes("Mac OS")) {
    return "Mac OS";
  }

  if (userAgent.includes("Android")) {
    return "Android";
  }

  if (
    userAgent.includes("iPhone") ||
    userAgent.includes("iPad")
  ) {
    return "iOS";
  }

  if (userAgent.includes("Linux")) {
    return "Linux";
  }

  return "Unknown";
}

export async function updatePageVisitDuration(
  pageVisitId,
  durationSeconds
) {
  if (!pageVisitId) return null;

  const response = await apiClient.put(
    `/page-visits/${pageVisitId}`,
    {
      duration_seconds: Math.max(
        0,
        Math.round(durationSeconds)
      ),
    }
  );

  return response.data;
}