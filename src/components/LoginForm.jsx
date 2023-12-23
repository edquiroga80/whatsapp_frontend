import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../utils/validation";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/userSlice";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  // const [readablePicture, setReadablePicture] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values) => {
    try {
      let res = await dispatch(loginUser({ ...values }));
      if (res?.payload?.user) {
        navigate("/");
      }
    } catch (error) {
      // Manejar el error, por ejemplo, mostrándolo en la consola
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Bienvenidos!</h2>
          <p className="mt-2 text-sm">Iniciar Sesión</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            type="text"
            placeholder="Correo Electrónico"
            register={register}
            error={errors?.email?.message}
          />

          <AuthInput
            name="password"
            type="password"
            placeholder="Contraseña"
            register={register}
            error={errors?.password?.message}
          />

          {/* if we have an error */}

          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}

          {/* Boton de envio */}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
            disabled={status === "Cargando"}
          >
            {status === "Cargando" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Ingresar"
            )}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>No tienes una Cuenta?</span>
            <Link
              href="/register"
              className=" hover:underline cursor-pointer
            transition ease-in duration-300"
            >
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
