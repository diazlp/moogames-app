import React from "react";
import { useParams } from "react-router-dom";
import LoginModal from "./LoginModal";
import PasswordModal from "./PasswordModal";

const AccountModals = () => {
  const { action } = useParams();

  if (action === "login") {
    return <LoginModal />;
  } else if (action === "setting") {
    return <PasswordModal />;
  } else {
    return <div>mau kemana bro?</div>;
  }
};

export default AccountModals;
