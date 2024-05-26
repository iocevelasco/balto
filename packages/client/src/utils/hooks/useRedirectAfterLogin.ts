import React from "react";
import { useNavigate } from "react-router";


const useRedirectAfterLogin = () => {
  const navigate = useNavigate();

  const clearStorage = React.useCallback(() => {
    window.localStorage.removeItem("redirectAfterLogin");
  }, []);

  const redirectToPath = React.useCallback(
    (path: string) => {
      // Clear local storage (we want to redirect once)
      clearStorage();
      // Apply redirect
      navigate(path);
    },
    [navigate, clearStorage]
  );

  const redirect = React.useCallback(() => {
    const redirectAfterLogin = window.localStorage.getItem("redirectAfterLogin");
    if (redirectAfterLogin) {
      redirectToPath(redirectAfterLogin);
    }
  }, [redirectToPath]);

  const saveCurrentURL = React.useCallback(() => {
    window.localStorage.setItem("redirectAfterLogin", window.location.pathname);
  }, []);

  const setAfterLoginRedirectPath = React.useCallback(
    (path: string) => {
      window.localStorage.setItem("redirectAfterLogin", path);
    },
    []
  );

  return {
    redirect,
    saveCurrentURL,
    setAfterLoginRedirectPath,
  };
};

export { useRedirectAfterLogin };
