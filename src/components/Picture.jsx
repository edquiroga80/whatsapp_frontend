import React, { useRef, useState } from "react";

export default function Picture({
  readablePicture,
  setReadablePicture,
  setPicture,
}) {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const hanldePicture = (e) => {
    let pic = e.target.files[0];
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp" &&
      pic.type !== "image/jpg"
    ) {
      setError(`${pic.name} formato no soportado`);
      return;
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} es demasiado grande, maximo una imagen de 5mb`);
      return;
    } else {
      setError("");
      setPicture(pic);
      // Leer la imagen
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    }
  };
  const handleChangePic = () => {
    setPicture("");
    setReadablePicture("");
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Imagen (Opcional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="Imagen"
            className="w-20 h-20 object-cover rounded-full"
          />
          {/* change pic */}
          <div
            className="mt-2 w-20 py-1 dark:bg-dark_bg_3 rounded-md text-sm flex items-center justify-center cursor-pointer"
            onClick={() => handleChangePic()}
          >
            Eliminar
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Cargar una Foto de perfil
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={hanldePicture}
      />
      {/* Error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}
