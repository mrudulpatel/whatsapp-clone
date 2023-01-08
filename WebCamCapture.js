import { RadioButtonUnchecked } from "@mui/icons-material";
import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user'
}

function WebCamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  })

  return <div className="webcamcapture">
    <Webcam
      audio={false}
      height={videoConstraints.height}
      width={videoConstraints.width}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
    <RadioButtonUnchecked className="webcamcapture_button" onClick={capture} fontSize="large" />
  </div>;
}

export default WebCamCapture;
