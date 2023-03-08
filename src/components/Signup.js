import React, { useEffect, useRef, useState } from "react"; //eslint-disable-line no-unused-vars

import {
  MdLockOutline,
  MdMailOutline,
  MdOutlineMarkEmailRead,
  MdError,
  MdDone,
} from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { AES } from "crypto-js";
import { useAuthContext } from "./utils/AuthContext";

function Signup() {
  const { firebase } = useAuthContext();

  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [accountCreated, setAccountCreated] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ input: null, text: null });

  const nameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordConfirmInputRef = useRef(null);

  // TODO: Descomentar por las dudas cuando este todo terminado
  // useEffect(() => {
  //   setStep("email");
  //   setError({ input: null, text: null });
  // }, []);

  const checkEmail = async (ev) => {
    ev.preventDefault();
    if (step !== "email" || emailInput === "") return;

    if (new RegExp(process.env.REACT_APP_REGEX_EMAIL).test(emailInput)) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));

      try {
        console.log(firebase.auth);
        const methods = await fetchSignInMethodsForEmail(firebase.auth, emailInput);

        setLoading(false);

        if (methods.length > 0) {
          const data = { ue: emailInput };
          const encryptedData = AES.encrypt(JSON.stringify(data), "xd").toString();

          setError({
            input: "email",
            text: `Ya hay una <a href='/login/user?p=${encodeURIComponent(
              encryptedData
            )}' style='display: inline; font-weight: bold'>cuenta asociada</a> a ese e-mail`,
          });
        } else {
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
            // TODO: Mandar error a DB
            break;
        }
        console.log(e.message);
      }
    } else {
      setError({ input: "email", text: "E-mail inválido" });
    }
  };

  const checkName = (ev) => {
    ev.preventDefault();
    if (step !== "name" || (nameInput === "" && lastNameInput === "")) return;

    const regex = new RegExp(process.env.REACT_APP_REGEX_NAME);
    if (regex.test(nameInput)) {
      if (regex.test(lastNameInput)) {
        setError({ input: null, text: null });
        setStep("password");

        // Vacio los refs y los inputs por si el browser autocompletó estos campos
        passwordInputRef.current.value = "";
        passwordConfirmInputRef.current.value = "";
      } else {
        setError({ input: "lname", text: "Apellido inválido" });
      }
    } else {
      setError({ input: "fname", text: "Nombre inváldio" });
    }
  };

  const checkPassword = async (ev) => {
    ev.preventDefault();
    if (step !== "password" || passwordInput === "" || passwordConfirmInput === "") return;

    if (passwordConfirmInput !== passwordInput) {
      setError({ input: "passwordconf", text: "La contraseña no coincide" });
      return;
    }

    if (new RegExp(process.env.REACT_APP_REGEX_PWD).test(passwordInput)) {
      setError({ input: null, text: null });
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));

      try {
        const userCredential = await createUserWithEmailAndPassword(
          firebase.auth,
          emailInput,
          passwordInput
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: `${nameInput} ${lastNameInput}` });

        const data = { ue: emailInput, v: 1 };
        const encryptedData = AES.encrypt(JSON.stringify(data), "xd").toString();

        console.log(encryptedData);
        await sendEmailVerification(user, {
          url: `${process.env.REACT_APP_BASE_URL}/login/user?p=${encodeURIComponent(
            encryptedData
          )}`,
          handleCodeInApp: true,
        });

        await firebase.auth.signOut();

        setLoading(false);
        setAccountCreated(true);

        await new Promise((r) => setTimeout(r, 1000));

        setStep("validation");
      } catch (e) {
        setLoading(false);
        setError({ input: "password", text: e.message });
        // TODO: Mandar error a DB
        console.log(e.message);
      }
    } else {
      setError({
        input: "password",
        text: "La contraseña tiene que tener al menos 6 dígitos",
      });
    }
  };

  const onInputChange = (input, value) => {
    setError({ input: null, text: null });
    switch (input) {
      case "email":
        if (step === "email") setEmailInput(value);
        break;
      case "fname":
        if (step === "name") {
          const newValue = value !== "" ? capitalizeWords(value) : value;
          nameInputRef.current.value = newValue;
          setNameInput(newValue);
        }
        break;
      case "lname":
        if (step === "name") {
          const newValue = value !== "" ? capitalizeWords(value) : value;
          lastNameInputRef.current.value = newValue;
          setLastNameInput(newValue);
        }
        break;
      case "password":
        if (step === "password") setPasswordInput(value);
        break;
      case "passwordconf":
        if (step === "password") setPasswordConfirmInput(value);
        break;
      default:
        return;
    }
  };

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <section className="w-full grow bg-pagebg">
      <div className="w-[550px] mx-auto p-10 my-12 bg-white text-black border border-gray-300 shadow-sm rounded-md">
        <h1 className="text-3xl">Registrarse</h1>
        <h2 className="font-thin text-lg mb-10">Ingresá los datos para crear tu cuenta</h2>
        <Step
          icon={<MdMailOutline size="20" className="w-8 h-8" />}
          titles={{
            inactive: "E-mail",
            active: "Ingresá tu e-mail",
            done: "E-mail ingresado ✓",
          }}
          state={step === "email" ? "active" : emailInput !== "" ? "done" : "inactive"}
          inputs={
            <>
              <InputLabel text="E-mail" error={error.input === "email"} />
              <input
                type="email"
                disabled={step !== "email"}
                onChange={(ev) => {
                  onInputChange("email", ev.target.value);
                }}
                className={`w-[340px] h-12 mt-1 border ${
                  error.input === "email"
                    ? "border-red-600"
                    : "border-gray-400 hover:border-gray-500 focus:border-dewalt"
                } px-2 rounded-md focus:border-2 outline-none`}
              />
            </>
          }
          error={error}
          submitable={emailInput !== ""}
          onSubmit={checkEmail}
          loading={loading}
        />
        <Step
          icon={<HiOutlineIdentification size="20" className="w-8 h-8" />}
          titles={{
            inactive: "Nombre completo",
            active: "Ingresá tu nombre completo",
            done: "Nombre completo ingresado ✓",
          }}
          state={
            step === "name"
              ? "active"
              : nameInput !== "" && lastNameInput !== ""
              ? "done"
              : "inactive"
          }
          inputs={
            <div className="w-full flex gap-4">
              <div className="w-0 grow">
                <InputLabel text="Nombre" error={error.input === "fname"} />
                <input
                  type="text"
                  autoComplete="off"
                  ref={nameInputRef}
                  onChange={(ev) => {
                    onInputChange("fname", ev.target.value);
                  }}
                  className={`w-full h-12 mt-1 border ${
                    error.input === "fname"
                      ? "border-red-600"
                      : "border-gray-400 hover:border-gray-500 focus:border-dewalt"
                  } px-2 rounded-md focus:border-2 outline-none`}
                />
              </div>
              <div className="w-0 grow">
                <InputLabel text="Apellido" error={error.input === "lname"} />
                <input
                  type="text"
                  autoComplete="off"
                  ref={lastNameInputRef}
                  onChange={(ev) => {
                    onInputChange("lname", ev.target.value);
                  }}
                  className={`w-full h-12 mt-1 border ${
                    error.input === "lname"
                      ? "border-red-600"
                      : "border-gray-400 hover:border-gray-500 focus:border-dewalt"
                  } px-2 rounded-md focus:border-2 outline-none`}
                />
              </div>
            </div>
          }
          error={error}
          submitable={nameInput !== "" && lastNameInput !== ""}
          onSubmit={checkName}
        />
        <Step
          icon={<MdLockOutline size="20" className="w-8 h-8" />}
          titles={{
            inactive: "Contraseña",
            active: "Creá tu contraseña",
            done: "Contraseña ingresada ✓",
          }}
          state={
            step === "password"
              ? "active"
              : step === "validation" || step === "finished"
              ? "done"
              : "inactive"
          }
          inputs={
            <div className="w-full flex gap-4">
              <div className="w-0 grow">
                <InputLabel text="Contraseña" error={error.input === "password"} />
                <input
                  type="password"
                  autoComplete="off"
                  ref={passwordInputRef}
                  onChange={(ev) => {
                    onInputChange("password", ev.target.value);
                  }}
                  className={`w-full h-12 mt-1 border ${
                    error.input === "password"
                      ? "border-red-600"
                      : "border-gray-400 hover:border-gray-500 focus:border-dewalt"
                  } px-2 rounded-md focus:border-2 outline-none`}
                />
              </div>
              <div className="w-0 grow">
                <InputLabel text="Confirmar contraseña" error={error.input === "passwordconf"} />
                <input
                  type="password"
                  autoComplete="off"
                  ref={passwordConfirmInputRef}
                  onChange={(ev) => {
                    onInputChange("passwordconf", ev.target.value);
                  }}
                  className={`w-full h-12 mt-1 border ${
                    error.input === "passwordconf"
                      ? "border-red-600"
                      : "border-gray-400 hover:border-gray-500 focus:border-dewalt"
                  } px-2 rounded-md focus:border-2 outline-none`}
                />
              </div>
            </div>
          }
          error={error}
          submitable={passwordInput !== "" && passwordConfirmInput !== ""}
          submitText="Crear cuenta"
          loading={loading}
          accountCreated={accountCreated}
          onSubmit={checkPassword}
        />
        <Step
          icon={<MdOutlineMarkEmailRead size="20" className="w-8 h-8" />}
          titles={{
            inactive: "Validación",
            active: "Validá tu e-mail",
            done: "E-mail validado ✓",
          }}
          state={step === "validation" ? "active" : step === "finished" ? "done" : "inactive"}
          inputs={
            <>
              <span className="block mb-8 text-xl">Tu cuenta ha sido creada con éxito!</span>
              <span className="hyphens-none">
                Para terminar, ingresá al link de verificación que te enviamos a:{" "}
                <strong>{emailInput}</strong>
              </span>
            </>
          }
          noSubmit={true}
        />
        <input autoComplete="on" style={{ display: "none" }} />
      </div>
    </section>
  );
}

function InputLabel({ text, error }) {
  return (
    <label>
      <span className={`block pl-2 text-sm ${error ? "text-red-600" : ""}`}>{text}</span>
    </label>
  );
}

function Step({
  icon,
  titles,
  state = "inactive",
  inputs,
  error = { input: null, text: null },
  submitable = false,
  submitText = "Continuar",
  accountCreated = false,
  loading = false,
  onSubmit,
  noSubmit = false,
}) {
  return (
    <div
      className={`w-full rounded-b-md ${
        state === "active" ? "h-[260px] shadow-xl text-black" : "h-12 text-gray-400"
      } overflow-y-hidden px-2 transition-all duration-700`}
    >
      <div
        className={`h-12 flex items-center [&>*]:transition-all [&>*]:duration-700 ${
          state === "done" ? "text-dewalt font-semibold" : ""
        }`}
      >
        {icon}
        <span className="ml-4 text-lg">{titles[state]}</span>
      </div>
      <form
        onSubmit={(ev) => onSubmit(ev)}
        className={`mt-5 p-2 ${state === "done" || state === "inactive" ? "hidden" : ""}`}
      >
        {inputs}
        <div className="w-full h-10 flex items-end">
          <div
            className={`w-full ${
              error.text !== null ? "h-10" : "h-0"
            } overflow-hidden text-red-600 flex justify-start items-center transition-all`}
          >
            <MdError size="20" className="w-5 h-5" />
            <span
              className="grow ml-1 text-sm leading-4"
              dangerouslySetInnerHTML={{ __html: error.text }}
            ></span>
          </div>
        </div>
        {noSubmit ? (
          ""
        ) : (
          <button
            type="submit"
            className={`h-12 px-4 overflow-y-hidden flex flex-col justify-start items-center font-bold transition-all ${
              loading || accountCreated
                ? "bg-black text-dewalt"
                : submitable
                ? "bg-dewalt text-black hover:bg-black hover:text-dewalt active:pt-1"
                : "bg-neutral-300 text-neutral-500"
            } rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`}
          >
            <span
              className={`transition-all duration-300 ${
                accountCreated ? "-mt-[5.25rem]" : loading ? "-mt-9" : "mt-3"
              }`}
            >
              {submitText}
            </span>
            <img
              src="/loading.svg"
              className={`w-6 h-6 transition-all duration-200 mt-6`}
              alt="Loading"
            />
            <MdDone className="w-6 h-6 mt-6" />
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup;
