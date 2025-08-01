import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios"
const FaceExpressionDetector = ({ setSongs }) => {

  const videoRef = useRef();
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
  };

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    ]);
  };
  const detectMood = async () => {
    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    let mostProbableExpression = 0;
    let expression = "";
    if (!detections.length) {
      console.log("No face detected");
    } else {
      for (const [key, value] of Object.entries(detections[0]?.expressions || {})) {
        if (value > mostProbableExpression) {
          mostProbableExpression = value;
          expression = key;
        }
      }
    }
    console.log("Most probable expression:", expression);
    axios.get(`http://localhost:3000/api/allSongs?mood=${expression}`)
      .then(response => {
        setSongs(response.data.songs)
      })
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, [])
  return (
    <div className="w-screen  overflow-hidden flex items-start gap-4 p-[4rem]">
      <video className="h-[48vh] shadow-2xl w-[40vw] object-center rounded-2xl object-cover" ref={videoRef} autoPlay muted />
      <div className="flex text-white h-[40vh] w-[48%] flex-col items-start justify-start  gap-5">
        <h1 className="text-2xl font-semibold"> Let Your Face Choose the Music</h1>
        <h1 className="text-[3vh] opacity-70">Click the button below and let your camera detect your current mood. Based on your facial expression, the perfect music will be selected for you!</h1>
        <button className="px-5 shadow-2xl font-semibold cursor-pointer flex  py-2 bg-emerald-800 text-white rounded" onClick={() => detectMood()}>Start Detection</button>
      </div>
    </div>
  );
};

export default FaceExpressionDetector;
