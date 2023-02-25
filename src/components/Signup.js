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

function Signup() {
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

  useEffect(() => {
    setStep("email");
  }, []);

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

    const regex = new RegExp("^([a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)){2,}$");
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

    const regex = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");

    if (regex.test(passwordInput)) {
      setError({ input: null, text: null });
      setLoading(true);

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
          url: `http://localhost:3000/login/user?p=${encodeURIComponent(encryptedData)}`,
          handleCodeInApp: true,
        });

        await firebase.auth.signOut();

        setLoading(false);
        setStep("validation");
      } catch (e) {
        setLoading(false);
        setError({ input: "password", text: e.message });
        console.log(e.message);
      }
    } else {
      setError({
        input: "password",
        text: "La contraseña tiene que cumplir estos requisitos mínimos:<br>8 caractéres, 1 mayúscula, 1 minúscula y 1 número",
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
          const newValue = value !== "" ? capitalizeFirstLetter(value) : value;
          nameInputRef.current.value = newValue;
          setNameInput(newValue);
        }
        break;
      case "lname":
        if (step === "name") {
          const newValue = value !== "" ? capitalizeFirstLetter(value) : value;
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

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <section className="w-full grow bg-white">
      <div className="w-[600px] mx-auto p-10 my-12 text-black border border-black">
        <h1 className="text-3xl">Registrarse</h1>
        <h2 className="font-thin text-lg mb-10">Ingresá los datos para crear tu cuenta</h2>
        <Step
          icon={<MdMailOutline size="20" className="w-8 h-8" />}
          titles={{
            inactive: "E-mail",
            active: "Ingresá tu e-mail",
            done: "E-mail ingresado ✓",
          }}
          first={true}
          state={step === "email" ? "active" : emailInput !== "" ? "done" : "inactive"}
          inputs={
            <>
              <InputLabel text="E-mail" error={error.input === "email"} />
              <input
                type="email"
                focus={true}
                disabled={step !== "email"}
                onChange={(ev) => {
                  onInputChange("email", ev.target.value);
                }}
                className={`w-[340px] h-12 mt-1 border ${
                  error.input === "email" ? "border-red-600" : "border-neutral-400"
                } px-2 hover:border-black focus:border-black focus:border-2 focus:rounded-md outline-none`}
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
            <div className="w-full flex gap-2">
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
                    error.input === "fname" ? "border-red-600" : "border-neutral-400"
                  } px-2 hover:border-black focus:border-black focus:border-2 focus:rounded-md outline-none`}
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
                    error.input === "lname" ? "border-red-600" : "border-neutral-400"
                  } px-2 hover:border-black focus:border-black focus:border-2 focus:rounded-md outline-none`}
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
            <div className="w-full flex gap-2">
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
                    error.input === "password" ? "border-red-600" : "border-neutral-400"
                  } px-2 hover:border-black focus:border-black focus:border-2 focus:rounded-md outline-none`}
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
                    error.input === "passwordconf" ? "border-red-600" : "border-neutral-400"
                  } px-2 hover:border-black focus:border-black focus:border-2 focus:rounded-md outline-none`}
                />
              </div>
            </div>
          }
          error={error}
          submitable={passwordInput !== "" && passwordConfirmInput !== ""}
          submitText="Crear cuenta"
          loading={loading}
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
              <span className="block mb-8 text-xl">Tu cuenta ha sido creada!</span>
              <span>
                Ingresá al link de verificación que te enviamos a:
                <br />
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
      <span className={`block text-sm ${error ? "text-red-600" : ""}`}>{text}</span>
    </label>
  );
}

function Step({
  icon,
  titles,
  first = false,
  state = "inactive",
  inputs,
  error = { input: null, text: null },
  submitable = false,
  submitText = "Continuar",
  loading = false,
  onSubmit,
  noSubmit = false,
}) {
  return (
    <div
      className={`w-full ${
        state === "active" ? "h-[260px]" : "h-12"
      } overflow-y-hidden px-2 border ${!first ? "border-t-0" : ""} border-black ${
        state === "done" ? "bg-black border-b-white" : ""
      } transition-all duration-700`}
    >
      <div
        className={`h-12 flex items-center [&>*]:transition-all [&>*]:duration-700 ${
          state === "done" ? "text-dewalt" : ""
        }`}
      >
        {icon}
        <span className="ml-4 text-lg">{titles[state]}</span>
      </div>
      <form onSubmit={(ev) => onSubmit(ev)} className="mt-5">
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
              loading
                ? "bg-black text-dewalt"
                : submitable
                ? "bg-black text-white hover:text-dewalt active:pt-1"
                : "bg-neutral-300 text-neutral-500"
            }`}
          >
            <span className={`transition-all duration-300 ${loading ? "-mt-9" : "mt-3"}`}>
              {submitText}
            </span>
            <img
              src="/loading.svg"
              className={`w-6 h-6 transition-all duration-200 mt-6`}
              alt="Loading"
            />
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup;
