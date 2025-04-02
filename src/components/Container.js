import { useState } from "react";
import Container from "react-bootstrap/Container";
import Box from "./Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import { faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";

//경우의 수
const choice = {
  rock: {
    name: "rock",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiusq_ptNOOC9XkVvWTa88nhB6I7n12fsf95zdnS-n269HpN9dVRd0JCCV0iL2u_tWrDU5XySM8-i9u38-tXp0Wgu6qRF4p-5A1djjVskwkB0SQFxULDss8Uj1o7CYfbMNRpT-kfn3cG4E/s220/janken_gu.png",
  },
  paper: {
    name: "paper",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQhsfUvWhhVJej7FEqYsQbe0EwLCOHYxKU4KnrF026nnfJkiM3yQO2NFmnnX0nD4P2IdCmg8qFQpZMW8vtbs-K7sLpoCqXwO0fkTT7UL5VkM-E2MOUNXpikYfspDKaxidAehqcuQoIrcM/s290/janken_pa.png",
  },
  scissors: {
    name: "scissors",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSYYvy3_ZU5FYb8Jug1Gssh483SEIn8hSwWO33rp-7j9m5AFsn9Fyis9oT1DKvykpCEMV6bJGMAaTtABep-1qqr9ZPtiI_aQQsJVWNL6H_i-b6I3O_1-dgwmavPoEI9HHMsuHHPQCHj90/s270/janken_choki.png",
  },
  default: {
    name: "default",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizQb-uhR2lvPNWzG-ubN3pK-qoEbb87nl8ZmmXnt6sY2OBcxRAh3racGtnnh5jsov2jzyvo2Dcpm9WyBC2cHZ_FYq_gsiKIRQ73VmGh-5bpyNVLvjD16p3qcfFXELDlWmekIm5fag0SKE/s500/janken_boys.png",
  },
};

function ContainerExample() {
  const [userSelect, setUserSelect] = useState(choice.default);
  //컴퓨터용 state
  const [computerSelect, setComputerSelect] = useState(choice.default);
  //결과 state
  const [userResult, setUserResult] = useState("START!");
  const [computerResult, setComputerResult] = useState("START!");
  //점수 state
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const play = (userChoice) => {
    //사용자: 누른 버튼에 따라 이미지 바뀜
    setUserSelect(choice[userChoice]);
    //컴퓨터: 사용자가 버튼을 누를때마다 랜덤으로 가위바위보 중 하나 선택
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    //승패결과(유저입장)
    let userJudge = judge(choice[userChoice], computerChoice);
    setUserResult(userJudge);
    //승패결과(컴퓨터입장)
    setComputerResult(computerJudge(userJudge));

    //점수계산
    if (userJudge === "win") {
      setUserScore((prev) => prev + 1);
    } else if (userJudge === "lose") {
      setComputerScore((prev) => prev + 1);
    }
  };

  //객체에서 랜덤으로 선택하는 함수
  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    itemArray.pop(); //마지막 key인 default는 필요없으므로 배열에서 삭제
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  //승패 판단하는 함수
  const judge = (user, computer) => {
    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "rock") {
      return computer.name === "scissors" ? "win" : "lose";
    } else if (user.name === "scissors") {
      return computer.name === "paper" ? "win" : "lose";
    } else if (user.name === "paper") {
      return computer.name === "rock" ? "win" : "lose";
    }
  };

  const computerJudge = (user) => {
    if (user === "win") {
      return "lose";
    } else if (user === "lose") {
      return "win";
    } else if (user === "tie") {
      return "tie";
    }
  };

  return (
    <Container className="container">
      <div className="title">
        <h1>가위바위보 게임</h1>
      </div>
      <div className="score">
        <div>현재 스코어</div>
        <div className="score-container">
          <div>{userScore}</div>
          <div>:</div>
          <div>{computerScore}</div>
        </div>
      </div>
      <div className="main">
        <Box title="you" item={userSelect} result={userResult} />
        <Box title="computer" item={computerSelect} result={computerResult} />
      </div>
      <div className="button">
        <button onClick={() => play("scissors")}>
          <FontAwesomeIcon icon={faHandPeace} size="2xl" />
        </button>
        <button onClick={() => play("rock")}>
          <FontAwesomeIcon icon={faHandBackFist} size="2xl" />
        </button>
        <button onClick={() => play("paper")}>
          <FontAwesomeIcon icon={faHand} size="2xl" />
        </button>
      </div>
      <div className="reset-button">
        <button
          onClick={() => {
            setUserScore(0);
            setComputerScore(0);
            setUserSelect(choice.default);
            setComputerSelect(choice.default);
            setUserResult("START!");
            setComputerResult("START!");
          }}
        >
          RESET
        </button>
      </div>
    </Container>
  );
}

export default ContainerExample;
