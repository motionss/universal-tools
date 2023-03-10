import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { BsPersonCircle } from "react-icons/bs";
import { MdError, MdOutlineVerifiedUser, MdClose, MdDone } from "react-icons/md";
import { RiRotateLockFill } from "react-icons/ri";

import { useAuthContext } from "./utils/AuthContext";

import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { AES, enc } from "crypto-js";

function Login({ step }) {
  const { firebase, setFirebase } = useAuthContext();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];

  const [showVerified, setShowVerified] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ input: null, code: null, text: null });

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (searchParams.has("p")) {
      const encryptedData = decodeURIComponent(searchParams.get("p"));
      const str = AES.decrypt(encryptedData, "xd").toString(enc.Utf8);
      const decryptedData = JSON.parse(str);

      // ue = User E-mail (mail para mostrar en el input de /login/user)
      if ("ue" in decryptedData) {
        setEmailInput(decryptedData["ue"]);
        emailInputRef.current.value = decryptedData["ue"];
      }
      // fse = First Step E-mail (viene de continuar en /login/user)
      if ("fse" in decryptedData) {
        setEmailInput(decryptedData["fse"]);
        emailInputRef.current.value = decryptedData["fse"];
      }
      // v = Verified (viene de link de verificación)
      if ("v" in decryptedData && decryptedData["v"] === 1) setShowVerified(true);

      if (passwordInputRef.current.value !== "") setPasswordInput(passwordInputRef.current.value);
    }
  }, [searchParams]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setError({ input: null, code: null, text: null });
  }, []);

  const handleCredentialsLogin = async (ev) => {
    ev.preventDefault();
    if (step === "email" && emailInput !== "") {
      if (new RegExp(process.env.REACT_APP_REGEX_EMAIL).test(emailInput)) {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        try {
          const methods = await fetchSignInMethodsForEmail(firebase.auth, emailInput);

          setLoading(false);

          if (methods.length > 0) {
            const data = { fse: emailInput };
            const encryptedData = AES.encrypt(JSON.stringify(data), "xd").toString();

            navigate(`/login/pass?p=${encodeURIComponent(encryptedData)}`);
          } else {
            setError({ input: "email", text: "No existe un usuario con ese e-mail" });
          }
        } catch (e) {
          setLoading(false);
          switch (e.code) {
            case "auth/invalid-email":
              setError({ input: "email", code: e.code, text: "E-mail inválido" });
              break;
            default:
              setError({ input: "email", code: e.code, text: e.message });
              // TODO: Mandar error a DB
              break;
          }
          console.log(e.message);
        }
      } else {
        setError({ input: "email", code: "", text: "El e-mail ingresado es inválido" });
      }
    } else if (step === "password" && passwordInput !== "") {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      try {
        const userCredentials = await signInWithEmailAndPassword(
          firebase.auth,
          emailInput,
          passwordInput
        );
        // Signed in
        const user = userCredentials.user;
        setLoading(false);

        // Si el usuario todavía no validó el e-mail, muestro un error
        // y cierro la sesión
        if (user.emailVerified) {
          setFirebase({ ...firebase, user: user });
          await new Promise((r) => setTimeout(r, 1000));
          navigate("/");
        } else {
          setError({
            input: "email",
            code: "auth/email-not-verified", // Este codigo lo invente yo
            text: "El e-mail ingresado todavía no está verificado",
          });
          firebase.auth.signOut();
        }
      } catch (err) {
        setLoading(false);
        switch (err.code) {
          case "auth/user-not-found":
            setError({
              input: "login",
              code: err.code,
              text: "No existe un usuario con ese e-mail",
            });
            break;
          case "auth/invalid-email":
            setError({
              input: "email",
              code: err.code,
              text: "El e-mail ingresado es inválido",
            });
            break;
          case "auth/wrong-password":
            setError({
              input: "password",
              code: err.code,
              text: "La contraseña ingresada es incorrecta",
            });
            break;
          case "auth/too-many-requests":
            setError({
              input: "login",
              code: err.code,
              text: "Demasiados intentos, espere unos minutos",
            });
            break;
          default:
            setError({ input: "login", code: err.code, text: "Error desconocido" });
            // TODO: Mandar error a DB
            break;
        }
        console.log(err);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Muestro un popup para que el usuario inicie sesión con Google
      const result = await signInWithPopup(firebase.auth, new GoogleAuthProvider());
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = GoogleAuthProvider.credentialFromResult(result).accessToken;
      setFirebase({ ...firebase, user: result.user, googleAccessToken: token });
      navigate("/");
      // IdP data available using getAdditionalUserInfo(result)
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/popup-blocked":
          setError([
            {
              input: "login",
              code: err.code,
              text: "Habilitá los pop-ups para poder acceder con Google",
            },
          ]);
          break;
        case "auth/popup-closed-by-user":
          break;
        default:
          setError([
            {
              input: "login",
              code: err.code,
              text: err.message,
            },
          ]);
          // TODO: Mandar error a DB
          break;
      }
      console.log(err);
    }
  };

  const handleForgotPass = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(firebase.auth, emailInput);
      const data = { ue: emailInput };
      const encryptedData = AES.encrypt(JSON.stringify(data), "xd").toString();

      setLoading(false);
      navigate(`/login/forgot?p=${encodeURIComponent(encryptedData)}`);
    } catch (err) {
      setLoading(false);
      setError({
        input: "login",
        code: err.code ?? null,
        text: err.message ?? "Error desconocido",
      });
      // TODO: Mandar error a DB
      console.log(err);
    }
  };

  return (
    <section className="w-full grow bg-pagebg">
      <div className="w-full px-4 lg:w-[900px] lg:mx-auto py-12 flex flex-col lg:flex-row text-black">
        <div className="w-full lg:w-0 lg:grow">
          <h1 className="font-light text-4xl pb-4">
            Ingresá tu {step === "email" ? "e-mail" : step === "password" ? "contraseña" : "?"}
          </h1>
          {step === "password" ? (
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
          ) : (
            ""
          )}
          <div className="w-60 h-4 mb-3 flex items-center">
            <div className="w-0 grow h-[1px] bg-neutral-300" />
            <span className="mx-2 text-sm">o también podés</span>
            <div className="w-0 grow h-[1px] bg-neutral-300" />
          </div>
          <button
            type="button"
            className="w-72 h-12 mb-8 py-2 bg-white flex items-center 
                       border border-gray-300 shadow-sm rounded-md hover:shadow-lg hover:border-dewalt hover:text-amber-500 transition-all"
            onClick={handleGoogleLogin}
          >
            <img src="/google.svg" className="w-6 h-6 mx-4 object-contain" alt="Google" />
            <span>Ingresar con Google</span>
          </button>
          {/* <a
            className="w-72 h-12 mb-5 py-2 flex items-center 
                       border border-black hover:bg-black hover:text-white transition-all"
            href="/google"
          >
            <img src="/facebook.svg" className="w-6 h-6 ml-4 object-contain" alt="Facebook" />
            <span className="ml-4">Ingresar con Facebook</span>
          </a> */}
          {/* <div className="w-60 h-[1px] bg-neutral-300" /> */}
          {step === "password" ? (
            <div className="mb-8">
              <span className="block font-bold text-sm mb-1">Necesito ayuda</span>
              <button
                onClick={handleForgotPass}
                className="w-56 h-10 flex justify-start items-center 
                           hover:bg-black hover:text-white active:text-neutral-400 transition-all group"
              >
                <RiRotateLockFill
                  className="w-6 h-6 ml-0 group-hover:ml-3 mr-3 transition-all"
                  size="20"
                />
                <span className="text-sm select-none">Olvidé mi contraseña</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full lg:w-0 lg:grow-[1.2]">
          <form
            onSubmit={handleCredentialsLogin}
            className="w-full p-10 pt-12 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <div
              className={`w-full ${
                showVerified ? "h-12 mb-5 border" : "h-0 mb-0 border-0"
              } pl-3 font-bold text-dewalt border-gray-400 rounded-md shadow-md
              flex items-center overflow-y-hidden transition-all duration-500`}
            >
              <MdOutlineVerifiedUser className="w-6 h-6 mr-2" />
              <span className="block">Tu cuenta ha sido verificada!</span>
              <div className="h-full grow flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => setShowVerified(!showVerified)}
                  className="w-max h-max mr-3 hover:text-black transition-all"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className={`${step !== "email" ? "hidden" : ""}`}>
              <label>
                <span
                  className={`block mb-1 text-sm ${error.input === "email" ? "text-red-600" : ""}`}
                >
                  E-mail
                </span>
              </label>
              <input
                type="email"
                ref={emailInputRef}
                onChange={(ev) => {
                  setError({ input: null, code: null, text: null });
                  setEmailInput(ev.target.value);
                }}
                className={`w-full h-12 border ${
                  error.input === "email" ? "border-red-600" : "border-gray-400"
                } px-3 rounded-md hover:border-gray-500 focus:border-dewalt focus:border-2 outline-none`}
              />
            </div>
            <div className={`${step !== "password" ? "hidden" : ""}`}>
              <label>
                <span
                  className={`block mb-1 text-sm ${
                    error.input === "password" ? "text-red-600" : ""
                  }`}
                >
                  Contraseña
                </span>
              </label>
              <input
                type="password"
                ref={passwordInputRef}
                onChange={(ev) => {
                  setError({ input: null, code: null, text: null });
                  setPasswordInput(ev.target.value);
                }}
                disabled={step !== "password"}
                className={`w-full h-12 border ${
                  error.input === "password" ? "border-red-600" : "border-neutral-400"
                } px-3 rounded-md hover:border-black focus:border-dewalt focus:border-2 outline-none`}
              />
            </div>
            <div
              className={`w-full  ${
                error.text !== null ? "h-5 mt-5 mb-2" : "h-0 mt-12"
              } overflow-y-hidden text-red-700 flex justify-start items-center transition-all`}
              tabIndex="-1"
            >
              <MdError size="20" className="w-5 h-5" />
              <span className="grow ml-1">{error.text}</span>
            </div>
            <div className="w-full flex items-center">
              <button
                type="submit"
                className={`w-36 h-12 overflow-y-hidden flex flex-col justify-start items-center font-bold transition-all ${
                  loading || firebase.user !== null
                    ? "bg-black text-dewalt"
                    : (step === "email" && emailInput !== "") ||
                      (step === "password" && passwordInput !== "")
                    ? "bg-dewalt text-black hover:bg-black hover:text-dewalt active:pt-1"
                    : "bg-neutral-300 text-neutral-500"
                } rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`}
              >
                <span
                  className={`transition-all duration-300 ${
                    !loading && firebase.user !== null
                      ? "-mt-[5.25rem]"
                      : loading
                      ? "-mt-9"
                      : "mt-3"
                  }`}
                >
                  {step === "email" ? "Continuar" : step === "password" ? "Iniciar sesión" : ""}
                </span>
                <img
                  src="/loading.svg"
                  className={`w-6 h-6 transition-all duration-200 mt-6`}
                  alt="Loading"
                />
                <MdDone className="w-6 h-6 mt-6" />
              </button>
              {step === "email" ? (
                <div className="grow flex flex-col items-end ml-8">
                  <span className="w-max pb-1 text-sm text-neutral-600">¿No tenés cuenta?</span>
                  <Link
                    to="/signup"
                    className="w-max font-bold text-black hover:text-dewalt active:text-black transition-all"
                  >
                    Registrate
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
