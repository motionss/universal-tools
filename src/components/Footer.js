import React from "react";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-content-max-width mx-auto">
      <div className="w-full py-8 h-64 flex items-center">
        <div className="w-60 shrink-0">
          <img src="/universal-tools-logo.svg" className="h-28 px-7 object-contain" />
          <div className="w-full h-8 mt-3 flex justify-around gap-1">
            <RoundedButton
              logo={<FaFacebookF size="20" className="z-0" />}
              link="https://www.facebook.com/"
            />
            <RoundedButton
              logo={<FaInstagram size="20" className="z-0" />}
              link="https://www.instagram.com/"
            />
            <RoundedButton
              logo={<FaTwitter size="20" className="z-0" />}
              link="https://www.twitter.com/"
            />
            <RoundedButton
              logo={<FaYoutube size="20" className="z-0" />}
              link="https://www.youtube.com/"
            />
          </div>
        </div>
        <div className="h-full grow flex py-2 ml-10 text-sm text-neutral-300">
          <div className="grow basis-0 h-full">
            <p className="font-bold pb-2 font-sans-condensed text-lg">ACERCA DE UNIVERSAL TOOLS</p>
            <LinkTo text="¿Quiénes somos?" link="/faq/quienes-somos" />
            <LinkTo text="Preguntas frecuentes" link="/faq" />
            <LinkTo text="Terminos y condiciones" link="/faq/terms" />
          </div>
          <div className="w-[1px] bg-white h-full mx-10" />
          <div className="grow basis-0 h-full">
            <p className="font-bold pb-2 font-sans-condensed text-lg">CONTACTO</p>
            <a className="pb-2 w-max hover:text-white" href="tel:11 6547-5458">
              (11) 6547-5458
            </a>
            <a className="pb-2 w-max hover:text-white" href="mailto:santytbd@gmail.com">
              santytbd@gmail.com
            </a>
            <a
              className="pb-2 w-max hover:text-white"
              href="https://goo.gl/maps/38RNvpAjX4EZBQ8r5"
              target="_blank"
              rel="noreferrer"
            >
              Villa Insuperable, Buenos Aires
            </a>
          </div>
          <div className="w-[1px] bg-white h-full mx-10" />
          <div className="grow basis-0 h-full flex flex-col">
            <p className="font-bold pb-2 font-sans-condensed text-lg">COMPRÁ CON SEGURIDAD</p>
            <LinkTo text="¿Cómo comprar?" link="/faq/como-comprar" />
            <LinkTo text="Métodos de pago" link="/faq/metodos-de-pago" />
            <LinkTo text="Formas de envío" link="/faq/envio" />
            <div className="h-16 gap-2 flex mb-6">
              <div className="w-fit grow pr-16">
                <img className="h-full object-contain" src="/mercado-pago.png" alt="Mercado Pago" />
              </div>
              <img
                className="w-max h-full object-contain"
                src="/data-fiscal.jpg"
                alt="Data Fiscal AFIP"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-white py-2 flex justify-center text-xs font-light text-neutral-400">
        @ 2023 Todos los derechos reservados
      </div>
    </footer>
  );
}

function LinkTo({ text, link }) {
  return (
    <Link className="w-max pb-2 hover:text-white" to={link}>
      {text}
    </Link>
  );
}

function RoundedButton({ logo, link }) {
  return (
    <div className="w-8 h-full relative group">
      {/* <a
        className="w-8 h-8 border-[16px] border-solid border-white rounded-3xl flex items-center justify-center group-hover:border transition-all"
        href={link}
        target="_blank"
        rel="noreferrer"
      ></a>
      <div className="absolute top-0 left-0 ml-[6px] mt-[6px] text-black group-hover:text-white pointer-events-none transition-all">
        {logo}
      </div> */}
      <a
        className="w-8 h-8 flex items-center justify-center transition-all relative z-10 text-black hover:text-white
                   before:absolute before:w-full before:h-full before:border-[16px] before:border-white before:rounded-3xl
                   before:hover:border before:transition-all"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {logo}
      </a>
    </div>
  );
}

export default Footer;
