"use client";

import React, { useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Image from "next/image";

export default function UserOtherItems({ userId, currentListingId }) {
  const { data: allListings, error, loading } = useFetch("/listings");

  const userOtherItems = useMemo(() => {
    if (!Array.isArray(allListings)) return [];

    return allListings.filter(
      (listing) => listing.userId === userId && listing.id !== currentListingId
    );
  }, [allListings, userId, currentListingId]);

  if (loading) {
    return (
      <div className="user-other-items__loading">Loading other items...</div>
    );
  }

  if (error) {
    return (
      <div className="user-other-items__error">Failed to load other items</div>
    );
  }

  if (userOtherItems.length === 0) {
    return (
      <div className="user-other-items">
        <h2 className="user-other-items__title">
          Other items from this Swapper
        </h2>
        <p className="user-other-items__empty">
          No other items available from this user.
        </p>
      </div>
    );
  }

  return (
    <div className="user-other-items">
      <h2 className="user-other-items__heading">
        Other items from this Swapper
      </h2>

      <div className="user-other-items__container">
        {userOtherItems.map((listing) => (
          <Link
            href={`/details/${listing.id}`}
            key={listing.id}
            className="user-other-items__card"
          >
            <div className="user-other-items__image">
              {listing.asset?.url ? (
                <Image
                  src={listing.asset.url}
                  alt={listing.title}
                  width={415}
                  height={415}
                  loading="lazy"
                  className="user-other-items__img"
                />
              ) : (
                <span className="user-other-items__img-placeholder">
                  No image
                </span>
              )}
            </div>

            <div className="user-other-items__title-wrapper">
              <h3 className="user-other-items__title">{listing.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
