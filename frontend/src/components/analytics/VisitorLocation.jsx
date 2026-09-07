import { useEffect } from "react";
import { updateVisitorLocation } from "../../services/visitorService";

export default function VisitorLocation() {
  useEffect(() => {
    let cancelled = false;

    async function detectLocation() {
      try {
        // Check whether the browser already has location permission.
        if (navigator.permissions) {
          const permission = await navigator.permissions.query({
            name: "geolocation",
          });

          // Never ask the user.
          if (permission.state !== "granted") {
            return;
          }
        }

        // Location permission is already granted.
        if (!navigator.geolocation) {
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            if (cancelled) return;

            try {
              const visitorUUID = localStorage.getItem(
                "portfolio_visitor_uuid"
              );

              if (!visitorUUID) {
                return;
              }

              await updateVisitorLocation(
                visitorUUID,
                position.coords.latitude,
                position.coords.longitude
              );

              console.log("Visitor location stored.");
            } catch (error) {
              console.error(
                "Failed to store visitor location:",
                error
              );
            }
          },
          (error) => {
            // Permission denied/unavailable/timeout.
            // Do nothing and don't bother the visitor.
            console.log(
              "Location not available:",
              error.message
            );
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000,
          }
        );
      } catch (error) {
        console.error(
          "Location permission check failed:",
          error
        );
      }
    }

    detectLocation();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}