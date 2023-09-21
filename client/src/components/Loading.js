import { GoPrimitiveDot } from "react-icons/go";
import styled, { keyframes } from "styled-components";

// Loading animation
const Loading = () => {
  return (
    <>
      <BigWrap>
        <WrapperOne>
          <GoPrimitiveDot />
        </WrapperOne>
        <WrapperTwo>
          <GoPrimitiveDot />
        </WrapperTwo>
        <WrapperThree>
          <GoPrimitiveDot />
        </WrapperThree>
      </BigWrap>
    </>
  );
};

export default Loading;

const BigWrap = styled.div`
  display: flex;
`;

const ChangeColors = keyframes`
0%   {color:black; font-size:2em}
  25%  {color:pink; font-size:2.3em}
  50%  {color:black; font-size:2em}  
  75%  {color:pink; font-size:2.3em}
  100% {color:black; font-size:2em}`;

const WrapperOne = styled.div`
  font-size: 1.8em;
  animation-name: ${ChangeColors};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: 0.1s;
`;

const WrapperTwo = styled.div`
  font-size: 1.8em;
  animation-name: ${ChangeColors};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: 0.4s;
`;

const WrapperThree = styled.div`
  font-size: 1.8em;
  animation-name: ${ChangeColors};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-delay: 0.7s;
`;
