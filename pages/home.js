import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProfileLogo from "../components/logo components/profile_logo";
import SideBar from "../components/sidebar";
import { useAuthContext } from "../context/UserContext";

const Home = () => {
  const router = useRouter();
  const { currentUser, isUserLoading } = useAuthContext();

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      router.push("/");
    }
  }, [currentUser, isUserLoading]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section id="home_main">
        <nav>
          <SideBar open={true} />
        </nav>
        <main className="bg-background">
          <div className="bg-white"></div>
        </main>
      </section>
    );
  }
};

export default Home;
