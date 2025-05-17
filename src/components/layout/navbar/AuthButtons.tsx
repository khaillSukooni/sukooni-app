
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <>
      <Button variant="outline" asChild>
        <Link to="/login">Log In</Link>
      </Button>
      <Button asChild>
        <Link to="/signup">Join Now</Link>
      </Button>
    </>
  );
};

export default AuthButtons;
