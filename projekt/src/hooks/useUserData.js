"use client";

import { useEffect, useState } from "react";
import { getUserToken, getUserId } from "@/utils/auth";

export default function useUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getUserId();
        const token = getUserToken();

        console.log("useUserData - userId:", userId);
        console.log("useUserData - token:", token ? "Present" : "Missing");

        if (!userId || !token) {
          setError(new Error("User not authenticated"));
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:4000/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.log("API Error response:", errorText);
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("User data fetched successfully:", data);
        setUserData(data);
      } catch (err) {
        console.error("useUserData error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
}
