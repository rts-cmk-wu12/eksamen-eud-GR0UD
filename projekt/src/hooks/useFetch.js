"use client";

import { useEffect, useState } from "react";

export default function useFetch(
  endpoint,
  baseUrl = "http://localhost:4000/api/v1"
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      if (typeof endpoint !== "string") {
        setError(new Error("endpoint is not a string"));
        return;
      }

      fetch(baseUrl + endpoint)
        .then(function (response) {
          if (response.status !== 200) {
            throw new Error("endpoint not found");
          }
          return response.json();
        })
        .then(function (data) {
          setData(data);
        })
        .catch(function (error) {
          setError(error);
        })
        .finally(function () {
          setLoading(false);
        });
    },
    [endpoint, baseUrl]
  );

  return { data, error, loading };
}
