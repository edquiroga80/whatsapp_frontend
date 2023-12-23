import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Nombre es requerido")
    .matches(/^[a-zA-Z_ ]*$/, "Sin caracteres especiales")
    .min(2, "Nombre entre 2 a 16 caracteres")
    .max(16, "Nombre entre 2 a 16 caracteres"),
  email: Yup.string()
    .required("El correo es requerido")
    .email("Correo Electrónico Invalido"),
  status: Yup.string().max(64, "Estado maximo 64 caracteres"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("El correo es requerido")
    .email("Correo Electrónico Invalido"),

  password: Yup.string().required("La contraseña es requerida"),
});
