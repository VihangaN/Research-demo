import React, { useState } from "react";
import "./dashboard.css";
import { ReactComponent as Placeholder } from "../place.svg";
import Chart from "../components/Chart";
import axios from "axios";

export default function Dashboard() {
  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(coods.x, coods.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  const [image, setImage] = useState();
  const [coods, setCoods] = useState({
    x: 0,
    y: 0,
  });

  const genimg = () => {
    if (coods.x > 100 || coods.y > 100) {
      alert('Please input values between 0-100')
    } else {
      axios
        .get(`http://127.0.0.1:5000/process/${coods.x}/${coods.y}`)
        .then(function (response) {
          console.log(response);
          setImage(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div id="container">
        <div id="left">
          <input
            required
            type="number"
            id="inputBox"
            placeholder="X"
            onChange={(e) => setCoods({ ...coods, x: e.target.value })}
          />
          <input
            required
            type="number"
            id="inputBox"
            placeholder="Y"
            onChange={(e) => setCoods({ ...coods, y: 100 - e.target.value })}
          />
          <button id="send" onClick={genimg}>
            {" "}
            send to backend
          </button>
          <div id="coodpreview">
            <div id="canvas_base">
              <Chart draw={draw} />
            </div>
            <div id="cood">
              X : {coods.x} px <br /> Y : {100 - coods.y} px
            </div>
          </div>
        </div>
        <div id="right">
      
          {image ? (
            <img src={image} id="preview" alt="response from server" />
          ) : (
            <Placeholder id="place"></Placeholder>
          )}
        <span id="server_res">Server response</span>
        </div>
       
      </div>
    </>
  );
}
