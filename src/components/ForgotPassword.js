import React, { useEffect, useRef, useState } from "react";

import { MdLockOutline, MdMailOutline, MdOutlineMarkEmailRead, MdError } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { AES } from "crypto-js";
import { useAuthContext } from "./utils/AuthContext";

function ForgotPassword() {
  const { firebase } = useAuthContext();

  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [step, setStep] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ input: null, text: null });

  const nameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordConfirmInputRef = useRef(null);

  const checkEmail = async (ev) => {
    ev.preventDefault();
    if (step !== "email" || emailInput === "") return;

    const regex = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );
    if (regex.test(emailInput)) {
      setLoading(true);

      try {
        console.log(firebase.auth);
        const methods = await fetchSignInMethodsForEmail(firebase.auth, emailInput);

        setLoading(false);

        if (methods.length > 0)
          setError({ input: "email", text: "Ya hay una cuenta asociada a ese e-mail" });
        else {
          setError({ input: null, text: null });
          setStep("name");
        }
      } catch (e) {
        setLoading(false);
        switch (e.code) {
          case "auth/invalid-email":
            setError({ input: "email", text: "E-mail inválido" });
            break;
          default:
            setError({ input: "email", text: e.message });
            break;
        }
        console.log(e.message);
      }
    } else {
      setError({ input: "email", text: "E-mail inválido" });
    }
  };

  return (
    <section className="w-full grow bg-white">
      <div className="w-[900px] mx-auto py-12 flex text-black">
        <div className="w-0 grow">
          <h1 className="font-thin text-4xl pb-4">Ingresá el código que te enviamos por SMS</h1>
        </div>
        <div className="w-0 grow-[1.2]">
          <form className="w-full p-10 border border-black"></form>
        </div>
      </div>
    </section>
  );
}

function InputLabel({ text, error }) {
  return (
    <label>
      <span className={`block text-sm ${error ? "text-red-600" : ""}`}>{text}</span>
    </label>
  );
}

export default ForgotPassword;
