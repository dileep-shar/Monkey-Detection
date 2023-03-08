import React, { useState } from "react";
import axios from "axios";
export default function Monkeys() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImageState, setLoadingImageState] = useState(false);
  const [predictedMonkey, setPredictedMonkey] = useState(null);
  const information = [
    "mantled_howler",
    "patas_monkey",
    "bald_uakari",
    "japanese_macaque",
    "pygmy_marmoset",
    "white_headed_capuchin",
    "silvery_marmoset",
    "common_squirrel_monkey",
    "black_headed_night_monkey",
    "nilgiri_langur",
  ];
  const nameOnIndex = [];
  async function getPredication() {
    var form = new FormData();

    form.append(selectedImage.name, selectedImage);
    console.log(form + "form");
    let req = await axios.post("localhost:5000/", {
      imageFile: form,
      headers: { "Content-Type": "image/jpeg" },
    });

    console.log(req);
    setPredictedMonkey(req.data.monkeyType);
    setLoadingImageState(false);
  }
  function handlePredict() {
    setLoadingImageState(true);
    getPredication();
  }
  return (
    <div className=" h-screen w-screen flex flex-col">
      <h1 className=" w-full  font-bold py-4 bg-blue-100 text-center text-2xl">
        Upload a monkey's image{" "}
      </h1>
      <div className=" grid grid-flow-col grid-cols-2 bg-gray-200 w-3/4 self-center">
        <div className=" px-2 py-4 border-r-2 border-gray-400 bg-slate-300">
          <input
            type="file"
            name="monkeyImage"
            onChange={(event) => {
              // console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>

        {selectedImage && (
          <div className=" flex  flex-col justify-center items-center  py-4 gap-1 ">
            <button
              className=" w-full py-3 text-white font-bold rounded-md shadow-md bg-blue-400 hover:bg-blue-500 "
              onClickCapture={handlePredict}
            >
              Predict
            </button>

            <img
              alt="not found"
              className=" w-full px-2 py-2"
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            {/* <button onClick={() => setSelectedImage(null)}>Remove</button> */}
            {predictedMonkey ? (
              <div>
                <h3>{nameOnIndex[predictedMonkey]}</h3>
                <p>{information[predictedMonkey]}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
