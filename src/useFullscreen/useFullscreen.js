const useFullscreen = callback => {
  const element = useRef();
  const runCb = isFull => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };
  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullscreen) {
        element.current.mozRequestFullscreen();
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullscreen();
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullscreen();
      }
      runCb(true);
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullScreen) {
      document.webkitExitFullScreen();
    } else if (document.msExitFullScreen) {
      document.msExitFullScreen();
    }
    runCb(false);
  };
  return { element, triggerFull, exitFull };
};

const App = () => {
  const callback = isFull => {
    console.log(isFull ? "we are full" : "we are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen(callback);
  return (
    <div className="App">
      <div ref={element}>
        <img
          src="https://i.pinimg.com/736x/ba/4c/02/ba4c026714b09c542b4f3ac1c3922178.jpg"
          alt=""
          style={{ width: "70%" }}
        />
        <button onClick={exitFull}>Exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make fullscreen</button>
    </div>
  );
};
