import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { urls } from "../data/custom-data/urls";
import { useAuth } from "../features/auth/contexts/AuthProvider";

const Index = () => {
  const router = useRouter();
  const { isLoaded, isAdmin } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (isAdmin) {
        router.push(urls.admin.pages.homepage);
      } else {
        router.push(urls.agent.pages.homepage);
      }
    }
  }, [isLoaded]);

  return (
    <>
      <Loader />
    </>
  )
};

export default Index;
