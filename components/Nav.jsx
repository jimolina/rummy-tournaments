"use client";

import { useState, Fragment, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceD20,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const { data: session } = useSession();

    const [ providers, setProviders ] = useState( null );
    const [ toggleDropdown, setToggleDropdown ] = useState( false );

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
    }, []);
    

    return (
        <nav className="flex-between w-full md:mb-16 mb-2 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <FontAwesomeIcon icon={faDiceD20} className="fa-2xl text-orange-600" />
                <p className="logo_text">
                    Bacardi Club
                </p>
            </Link>
            {/* Desktop Navigation */}
            <div className="lg:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        {/* <Link href="/create-tournament" className="black_btn">
                            Create Tournament
                        </Link> */}
                        <button type="button" onClick={ signOut } className="outline_btn">
                            Sign Out
                        </button>
                        <div>
                            {/* <Link href="/profile"> */}
                            <Image
                                src={session.user?.image}
                                className="rounded-full"
                                width={37}
                                height={37}
                                alt="User Profile"
                            />                    
                            {/* </Link> */}
                        </div>
                    </div>
                ): (
                    <>
                        {providers &&
                            Object.values( providers ).map( ( provider ) => (
                                <button
                                    type="button"
                                    key={ provider.name }
                                    onClick={ () => signIn( provider.id ) }
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex">
            {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session.user?.image}
                            className="rounded-full"
                            width={37}
                            height={37}
                            alt="User Profile"
                            onClick={ () => setToggleDropdown( (prev) => !prev ) }
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                {/* <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={ () => setToggleDropdown( false ) }
                                >
                                    My Profile
                                </Link> */}
                                <Link
                                    href="/create-tournament"
                                    className="dropdown_link"
                                    onClick={ () => setToggleDropdown( false ) }
                                >
                                    + Tournament
                                </Link>
                                <Link
                                    href="/create-player"
                                    className="dropdown_link"
                                    onClick={ () => setToggleDropdown( false ) }
                                >
                                    + Player
                                </Link>
                                <Link
                                    href="/create-score"
                                    className="dropdown_link"
                                    onClick={ () => setToggleDropdown( false ) }
                                >
                                    + Game
                                </Link>
                                <button
                                    type="button"
                                    onClick={ () => {
                                        setToggleDropdown( false );
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ): (
                    <>
                        {providers &&
                            Object.values( providers ).map( ( provider ) => (
                                <Fragment key={ provider.name }>
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className="fa-lg text-orange-600"
                                        onClick={ () => setToggleDropdown( (prev) => !prev ) }
                                    />
                                    {toggleDropdown && (
                                        <div className="dropdown">
                                            <button
                                                type="button"
                                                onClick={ () => {
                                                    setToggleDropdown( false );
                                                    signIn( provider.id );
                                                }}
                                                className="w-full black_btn"
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    )}
                                    {/* <button
                                        type="button"
                                        key={ provider.name }
                                        onClick={ () => signIn( provider.id ) }
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button> */}
                                </Fragment>
                            ))
                        }
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav