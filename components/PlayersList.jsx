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

const PlayerCard = ({ post, winner, loser, loop, handleTagClick }) => {
  const playerAvatarSrc = ! post.avatar && post.email
    ? 'http://gravatar.com/avatar/' + Md5(post.email) + '.jpg'
    : post.avatar;

  return (
    <>
      {post.name ? (
        <li className={ post.count === winner ? 'winner' : post.count === loser ? 'loser' : '' }>
          <span className="icon">
            <FontAwesomeIcon icon={faTrophy} className="fa-lg" />
            <FontAwesomeIcon icon={faTruckMedical} className="fa-lg" />
            <span className="loop">
              {loop}
            </span>
          </span>
          <div className="relative">
            <Image
                src={ playerAvatarSrc }
                alt="Avatar"
                width={91}
                height={91}
                className="rounded-full object-fill avatar"
            />
          </div>
          <h3 className="title font-satoshi font-semibold flex items-center">
              {post.name}
          </h3>
          <div className="count flex items-stretch">
              <span className="flex items-center">
                {post.count}
              </span>
          </div>
        </li>
      ): ( null )}
    </>
  )
}

export default PlayerCard