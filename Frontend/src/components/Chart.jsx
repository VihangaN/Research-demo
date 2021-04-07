import React, { useRef, useEffect } from "react";

const Chart = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const render = () => {
      draw(context);
    };
    render();

    
  }, [draw]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      {...rest}
      width="100px"
      height="100px"
    />
  );
};

export default Chart;
