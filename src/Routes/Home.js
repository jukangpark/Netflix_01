import styled from "styled-components";
import { Component } from "react";
import { API_KEY, BASE_PATH } from "../key";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";

const Banner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
`;

const Box = styled(motion.div)`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  font-size: 66px;
  /* position: relative; */
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: black;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    // zIndex: 99,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.15,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.15,
      type: "tween",
    },
  },
};

const offset = 6;

// const Row = styled(motion.div)`
//   position: absolute;
//   width: 100%;
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   margin-bottom: 5px;
// `;

class Home extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       data: [],
  //       leaving: false,
  //       index: 0,
  //     };
  //   }

  // create react app 에서는 이렇게 작성 가능
  state = {
    data: [], // initialState 를 [] 로 해주지 않으면 .map 함수가 존재하지 않는다고 에러가 나와버려용~
    leaving: false,
    index: 0,
  };

  toggleLeaving = () =>
    this.setState((prev) => ({ ...prev, leaving: !prev.leaving }));

  increaseIndex = () => {
    if (this.state) {
      if (this.state.leaving) return;
      this.toggleLeaving();
    }
  };

  componentDidMount() {
    fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
      .then((data) => data.json())
      .then((data) => this.setState({ data: data.results }));
  }

  render() {
    console.log(this.state.data);
    return (
      <>
        <Banner
          bgPhoto={makeImagePath(this.state.data[0]?.backdrop_path || "")}
        >
          <Title>{this.state.data[0]?.title}</Title>
          <Overview>{this.state.data[0]?.overview}</Overview>
        </Banner>
        <Slider>
          <AnimatePresence initial={false} onExitComplete={this.toggleLeaving}>
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={this.state.index}
              transition={{ type: "tween", duration: 1 }}
            >
              {this.state.data
                ?.slice(1)
                .slice(
                  offset * this.state.index,
                  offset * this.state.index + offset
                )
                .map((movie) => (
                  // 이렇게 작ㅇㅏ면 첫번째 영화는 제외
                  <Box
                    layoutId={`${movie.id}`} // string이어야 하기 때문.
                    key={movie.id}
                    whileHover="hover"
                    initial="normal"
                    // onClick={() => onBoxClicked(movie.id)}
                    variants={boxVariants}
                    transition={{ type: "tween" }}
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider>
      </>
    );
  }
}

export default Home;
