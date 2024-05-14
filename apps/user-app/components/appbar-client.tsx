"use client";

import { Appbar } from "@repo/ui/app-bar";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React from "react";

const Logo = () => {
  return <Link href={"/"}>PayTM</Link>;
};

const AppbarClient = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        logo={Logo}
        user={session.data?.user}
      />
    </div>
  );
};

export default AppbarClient;
