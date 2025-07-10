// hooks/useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to the login page if the user is not authenticated
      router.replace("/auth/login");
    }
  }, [user, router]);

  return user;
};

export default useAuth;
