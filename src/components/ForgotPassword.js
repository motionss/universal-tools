import { useEffect, useRef, useState } from "react";
import { Link, redirect, useSearchParams } from "react-router-dom";

import { BsPersonCircle } from "react-icons/bs";

import { useAuthContext } from "./utils/AuthContext";

import { AES, enc } from "crypto-js";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const { firebase } = useAuthContext();
  const searchParams = useSearchParams()[0];

  const resendTime = 30;
  const [sendable, setSendable] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ input: null, text: null }); //eslint-disable-line no-unused-vars
  const [timer, setTimer] = useState(resendTime);

  const emailInputRef = useRef(null);

  useEffect(() => {
    if (searchParams.has("p")) {
      try {
        const encryptedData = decodeURIComponent(searchParams.get("p"));
        const str = AES.decrypt(encryptedData, "xd").toString(enc.Utf8);
        const decryptedData = JSON.parse(str);

        // ue = User E-mail (mail para recuperar la contraseña)
        if ("ue" in decryptedData) {
          const email = decryptedData["ue"];
          setEmailInput(email);
          emailInputRef.current.value = email;
        }
      } catch (err) {
        console.log(err);
        // TODO: Mandar error a DB
        return redirect("/nf");
      }
    } else {
      return redirect("/nf");
    }
  }, [searchParams]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timer === 0) {
      setSendable(true);
      return;
    }
    const updateTimer = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setTimer(timer - 1);
    };
    updateTimer();
  }, [timer]);

  const handleResend = async () => {
    if (sendable) {
      setLoading(true);
      try {
        await sendPasswordResetEmail(firebase.auth, emailInput);
        setLoading(false);
        setSendable(false);
        setTimer(resendTime);
      } catch (err) {
        setLoading(false);
        setError({
          input: "reset",
          code: err.code ?? null,
          text: err.message ?? "Error desconocido",
        });
        // TODO: Mandar error a DB
        console.log(err);
      }
    }
  };

  return (
    <section className="w-full grow bg-pagebg">
      <div className="w-[900px] mx-auto py-12 flex text-black">
        <div className="w-0 grow">
          <h1 className="font-thin text-4xl pb-4">Revisá tu correo</h1>
          <div
            className="w-72 h-12 mb-3 py-2 flex items-center
                         bg-white rounded-md border border-gray-300 shadow-sm"
          >
            <BsPersonCircle className="w-6 h-6 mx-4 text-neutral-400" />
            <div className="grow flex flex-col">
              <span className="text-xs">{emailInput}</span>
              <Link
                className="w-max text-xs font-semibold text-amber-600 transition-all"
                to="/login/user"
              >
                Entrar a otra cuenta
              </Link>
            </div>
          </div>
        </div>
        <div className="w-0 grow-[1.2]">
          <div className="w-full p-10 bg-white border border-gray-300 rounded-md shadow-sm">
            <input type="email" className="hidden" hidden ref={emailInputRef} disabled readOnly />
            <div>Te enviamos un e-mail para cambiar tu contraseña a:</div>
            <div className="mb-8 font-bold">{emailInput}</div>
            <div className="mb-2">¿No te llegó?</div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleResend}
                className={`w-36 h-12 overflow-y-hidden flex flex-col justify-start items-center font-bold transition-all ${
                  loading
                    ? "bg-black text-dewalt"
                    : sendable
                    ? "bg-dewalt text-black hover:bg-black hover:text-dewalt active:pt-1"
                    : "bg-neutral-300 text-neutral-500"
                } rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`}
              >
                <span className={`transition-all duration-300 ${loading ? "-mt-9" : "mt-3"}`}>
                  Reenviar
                </span>
                <img
                  src="/loading.svg"
                  className={`w-6 h-6 transition-all duration-200 mt-6`}
                  alt="Loading"
                />
              </button>
              {timer > 0 ? (
                <span className="ml-3 text-sm text-neutral-400">
                  Podés reenviar el e-mail en 00:
                  {timer.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
