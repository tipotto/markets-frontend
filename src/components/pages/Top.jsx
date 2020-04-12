import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Lesson from "../organisms/Lesson";
import FormContainer from "../organisms/Form";
import FormData from "../../constants/FormData";

class Main extends React.Component {
  handleClickClose() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const lessonList = [
      {
        name: "HTML & CSS",
        image:
          "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
        introduction:
          "WEBページはHTML、CSSという言語によってその見た目が作られています。 実際にWEBページを作りながら学んでみましょう！",
      },
      {
        name: "Sass",
        image:
          "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/sass.svg",
        introduction: "SassはCSSをより便利に効率的にするための言語です。",
      },
      {
        name: "JavaScript",
        image:
          "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/es6.svg",
        introduction:
          "JavaScriptはフロントエンドだけでなく、サーバーサイドまで広い可能性を持つプログラミング言語です。",
      },
      {
        name: "React",
        image:
          "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/react.svg",
        introduction:
          "ReactはHTMLのように、サイトの見た目をつくることができるJavaScriptのライブラリです。",
      },
    ];

    return (
      <React.Fragment>
        <MuiThemeProvider>
          <Header />
          <div className="main-wrapper">
            <div className="main">
              <div className="copy-container">
                <h1>Hello, World.</h1>
                <h2>プログラミングの世界へようこそ！</h2>
              </div>
              <div className="contact-container">
                <h3>フリマ一括検索</h3>
                <FormContainer form={FormData.SEARCH} />
              </div>
              <div className="lesson-container">
                <h3>あなたの検索結果</h3>
                {lessonList.map((lessonItem) => {
                  return (
                    <Lesson
                      name={lessonItem.name}
                      image={lessonItem.image}
                      introduction={lessonItem.introduction}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default Main;
