import { Component } from "react";
import { API_KEY, BASE_PATH } from "../key";

class Home extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       data: null,
  //     };
  //   }

  // create react app 에서는 이렇게 작성 가능
  state = {
    data: [], // initialState 를 [] 로 해주지 않으면 .map 함수가 존재하지 않는다고 에러가 나와버려용~
  };

  componentDidMount() {
    fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
      .then((data) => data.json())
      .then((data) => this.setState({ data: data.results })); // 왜 여기에서 setState 가 동작하지 않는걸까융?
  }

  render() {
    return (
      <div>
        {this.state.data === [] ? (
          "loading"
        ) : (
          <ul>
            {this.state.data.map((x, index) => (
              <li key={index}>{x.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Home;
