"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const TournamentCard = ({ post, handleTagClick }) => {
  const startDate = new Date(post.start_date);

  return (
    <>
      {post.name ? (
        <li>
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.name}
          </h3>
          <p className="font-inter text-xs text-gray-400">
            {startDate.toDateString()}
          </p>
          {/* <Image
            src={ post.creator.image }
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          /> */}
        </li>
      ): ( null )}
    </>
  )
}

export default TournamentCard