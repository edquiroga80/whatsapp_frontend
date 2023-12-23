import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../utils/validation";
import AuthInput from "./AuthInput";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/userSlice";
import Picture from "./Picture";
import axios from "axios";
import { changeStatus } from "../features/userSlice";

const REACT_APP_CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const REACT_APP_CLOUD_SECRET = process.env.REACT_APP_CLOUD_SECRET;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));
    if (picture) {
      // upload to cloudinary
      await uploadImage().then(async (response) => {
        let res = await dispatch(
          registerUser({ ...data, picture: response.secure_url })
        );
        if (res?.payload?.user) {
          navigate("/");
        }
      });
    } else {
      let res = await dispatch(registerUser({ ...data, picture: "" }));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  };

  const uploadImage = async () => {
    try {
      let formData = new FormData();
      formData.append("upload_preset", REACT_APP_CLOUD_SECRET);
      formData.append("file", picture);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
        formData
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error en la carga de la imagen:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Bienvenidos!</h2>
          <p className="mt-2 text-sm">Registrate</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Nombre completo"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Correo Electrónico"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Estado (opcional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Contraseña"
            register={register}
            error={errors?.password?.message}
          />

          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
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
              "Registrar"
            )}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Tienes una Cuenta?</span>
            <Link
              href="/login"
              className=" hover:underline cursor-pointer
            transition ease-in duration-300"
            >
              Ingresar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
