"use client";

import React, { useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";

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
      <div className='user-other-items__loading'>Loading other items...</div>
    );
  }

  if (error) {
    return (
      <div className='user-other-items__error'>Failed to load other items</div>
    );
  }

  if (userOtherItems.length === 0) {
    return (
      <div className='user-other-items'>
        <h2 className='user-other-items__title'>
          Other items from this Swapper
        </h2>
        <p className='user-other-items__empty'>
          No other items available from this user.
        </p>
      </div>
    );
  }

  return (
    <div className='user-other-items'>
      <h2 className='user-other-items__title'>Other items from this Swapper</h2>

      <div className='user-other-items__grid'>
        {userOtherItems.map((listing) => (
          <Link
            href={`/details/${listing.id}`}
            key={listing.id}
            className='user-other-items__item'
          >
            <div className='user-other-items__item-container'>
              {listing.Asset?.url ? (
                <img
                  src={listing.Asset.url}
                  alt={listing.title}
                  className='user-other-items__image'
                />
              ) : (
                <div className='user-other-items__placeholder'>
                  <span>No image</span>
                </div>
              )}

              <div className='user-other-items__content'>
                <h3 className='user-other-items__item-title'>
                  {listing.title}
                </h3>
                {listing.description && (
                  <p className='user-other-items__description'>
                    {listing.description.length > 100
                      ? `${listing.description.substring(0, 100)}...`
                      : listing.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
