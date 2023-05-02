import React, { useState } from 'react';
import ReactPlayer from 'react-player'

const VideoReader = () => {
  const [src, setSrc] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (event) => {
    try {
      // Get the uploaded file
      const file = event.target.files[0];
      setSrc(URL.createObjectURL(file));

      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append('file', file);

      // Create a new XMLHttpRequest and set the progress event listener
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload-video', true);
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progressPercent);
        }
      });

      // Set the onload and onerror event listeners
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('Video uploaded successfully!');
        } else {
          console.error('Error uploading video:', xhr.statusText);
        }
      };
      xhr.onerror = () => {
        console.error('Error uploading video:', xhr.statusText);
      };

      // Send the FormData object to the server
      xhr.send(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ReactPlayer
        url={src}
        width={480}
        height={272}
        controls
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleChange}
      />
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
    </>
  );
}

export default VideoReader;
