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

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
}
