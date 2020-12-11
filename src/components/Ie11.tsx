import React from "react";
import "./Ie11.sass";
export default function Ie11() {
  return (
    <section id="ie11">
      <div className="container">
        <div className="title">
          2020 경기도마을공동체지원센터 어울림축제 웹사이트를 방문해주셔서
          감사합니다.
        </div>
        <div className="label">
          지원하지 않는 브라우저로 접속 시 이용이 제한될 수 있습니다.
          <br />
          웹사이트에 접속하려면 다른 브라우저를 이용하세요.
          <br />
          2020 경기도마을공동체지원센터 어울림축제 웹사이트는 Chrome, Microsoft
          Edge에 최적화되어 있습니다.
          <br />
        </div>
        <div className="images">
          <a
            href="https://www.google.com/intl/ko/chrome/"
            target="_blank"
            rel="noopener noreferrer"
            className="square"
          >
            <img src="/logo-chrom.png" alt="chrome" className="image" />
            <div className="flex-center">
              <span className="chrome">Chrome</span>
              <span>설치하기</span>
            </div>
          </a>
          <a
            href="https://www.microsoft.com/ko-kr/edge"
            target="_blank"
            rel="noopener noreferrer"
            className="square"
          >
            <img src="/logo-edge.png" alt="edge" className="image" />
            <div className="flex-center">
              <span className="edge">Edge</span>
              <span>설치하기</span>
            </div>
          </a>
        </div>
        <div className="text-center">
          <a
            href="https://pf.kakao.com/_DslxnK"
            target="_blank"
            rel="noopener noreferrer"
            className="ask"
          >
            문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
