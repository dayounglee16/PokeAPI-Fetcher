import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// export default로 불러오지 않는 라이브러리 오류 => "esModuleInterop": true, 옵션추가
// 경로 jsx 오류 => "jsx": "react-jsx", "allowJs": true 옵션 추가
