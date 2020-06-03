# PaintJS

Javascript의 canvas API를 활용해서 그림판을 구현해보자

[Live Demo](https://dngwoo.github.io/nomad_paintjs/)

![paintjsimage](https://user-images.githubusercontent.com/56942649/83601801-43486f80-a5ac-11ea-8d2f-046bf00db7f6.png)

# 정리

```javascript
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClic);
canvas.addEventListener("contextmenu", handleCM);
```

mousemove : 마우스가 움직일 때
mousedown : 마우스를 클릭했을 경우
mouseup : 마우스 클릭을 풀었을 경우
mouseleave : 마우스가 영역을 벗어날 경우
click : 클릭했을 경우
contextmenu : 우클릭 방지를 위하여 사용

# 보완 해야 될 것

- [] gradient 사용해보기
- [] gulp 부분 좀 더 세분화 시키기
