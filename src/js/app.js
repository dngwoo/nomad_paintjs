"use strict";

(() => {
  const canvas = document.querySelector("#jsCanvas");
  const colors = document.querySelectorAll("#jsColor");
  const range = document.querySelector("#jsRange");
  const mode = document.querySelector("#jsMode");
  const ctx = canvas.getContext("2d");
  const saveBtn = document.querySelector("#jsSave");

  const INITIAL_COLOR = "#2c2c2c";
  const CANVAS_SIZE = 600;

  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  // canvas는 위에서 아래로 실행되기 때문에 fillStyle을 하나 더 지정해줘도 앞의 fillRect에는 영향을 미치지 않는다.
  ctx.fillStyle = "white"; // save 시에 처음 색이 없으면 배경색이 없음. 그래서 지정해줘야 함.
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = INITIAL_COLOR; // 선 색깔 지정
  ctx.fillStyle = INITIAL_COLOR;
  ctx.lineWidth = 2.5; // 2.5px을 의미

  let painting = false;
  let filling = false;

  const stopPainting = () => {
    painting = false;
  };

  const startPainting = () => {
    painting = true;
  };

  const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
      ctx.beginPath(); // 새로운 선을 시작한다
      ctx.moveTo(x, y); // (x,y) 좌표로  옮긴다
    } else {
      // painting이 true라면 (마우스 클릭을 했을 경우)
      ctx.lineTo(x, y); // moveTo 좌표에서 lineTo 좌표까지 직선으로 연결된다.
      ctx.stroke(); // 연결 된 것을 획을 긋는다.
    }
  };

  const handleCanvasClick = () => {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  };

  const handleCM = (event) => {
    event.preventDefault();
  };

  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // 우클릭 방지(save 못하게 하기 위해서)
    canvas.addEventListener("contextmenu", handleCM);
  }

  // 정리
  /*
        1. canvas를 만들고 dom에 접근해 가져온다.
        2. canvas의 사이즈는 css와 화면에 보이는 사이즈를 정해줘야한다. (pixel manipulation 사이즈)
        3. 이벤트리스너를 상황별로 만들어준다.
        4. mousedown(클릭)일때 painting 변수값이 true가 되고 lineTo함수를 실행시켜서 moveTo좌표에서 lineTo 좌표까지 직선으로 연결시킨다.
        5. stroke() 함수를 이용해서 획을 그어줘야한다.
        6. canvas를 마우스가 벗어나거나 클릭이 풀렸을 경우 painting 변수값을 false로 해준다.
        알아야 될 것
        mousedown 이벤트는 딱 한번만 일어나기 때문에 painting이라는 변수를 이용한 것임.
        mousedown이 일어났을 경우 painting을 true로 변환되고 계속 유지된다.
        하지만 mouesup 이벤트를 이용하여 마우스 클릭이 떼어질 경우 painting은 다시 false가 된다.
    */

  const handleColorClick = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  };

  if (colors) {
    // Array.from을 해주는 이유는 일반 array로 변환 시켜주기 위해서이다.
    Array.from(colors).forEach((color) =>
      color.addEventListener("click", handleColorClick)
    );
  }

  const handleRangeChange = (event) => {
    ctx.lineWidth = event.target.value;
  };

  if (range) {
    // input event
    // https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/input_event
    range.addEventListener("input", handleRangeChange);
  }

  const handleModeClick = () => {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  };

  if (mode) {
    mode.addEventListener("click", handleModeClick);
  }

  const handleSaveClick = () => {
    // .toDataURL은 이미지형식과 함께 data URL을 반환한다. default는 png임
    // const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL();
    // abchor(앵컬) 태그 생성 및 클릭해서 다운로드 하는 용도임.
    // download 속성 사용!
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🖼]";
    link.click();
  };

  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }
})();
