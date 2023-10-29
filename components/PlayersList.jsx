"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Md5 from "@utils/md5.min.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrophy,
  faTruckMedical
} from '@fortawesome/free-solid-svg-icons';

const PlayerCard = ({ post, winner, loser, handleTagClick }) => {
  const playerAvatarSrc = ! post.avatar && post.email
    ? 'http://gravatar.com/avatar/' + Md5(post.email) + '.jpg'
    : post.avatar;

  return (
    <>
      {post.name ? (
        <li className={ post.count === winner ? 'winner' : post.count === loser ? 'loser' : '' }>
          <Image
              src={ playerAvatarSrc }
              alt="Avatar"
              width={91}
              height={91}
              className="rounded-full object-contain"
          />
          <h3 className="title font-satoshi font-semibold">
              {post.name}
          </h3>
          <div className="count">
            <span>
              <FontAwesomeIcon icon={faTrophy} className="fa-lg" />
              <FontAwesomeIcon icon={faTruckMedical} className="fa-lg" />
              {` `}
              {post.count}
            </span>
          </div>
        </li>
      ): ( null )}
    </>
  )
}

export default PlayerCard