const canvas = document.querySelector("#jsCanvas");

if (canvas) {
  canvas.addEventListener("mousemove", (event) => {
    // client X,Y는 윈도우 전체 범위내에서 마우스 위치 값을 나타낸다.
    // offsetX,Y는 캔버스 안에서의 위치를 나타낸다.
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(`x: ${x} y: ${y}`);
  });
  canvas.addEventListener("mousedown", (event) => {
    // mousedown은 클릭했을 경우 발생하는 eventdla.
    console.log(event);
  });
}
