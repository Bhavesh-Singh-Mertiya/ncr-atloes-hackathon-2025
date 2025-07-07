import Toggle from 'react-toggle';
import "react-toggle/style.css"
import styled from 'styled-components';



const StyledToggle = styled(Toggle)`

  &.react-toggle .react-toggle-track {
    background-color: #d6dde1;
  }
  &.react-toggle--checked .react-toggle-track {
    background-color: #f15c60;
  }
  .react-toggle-thumb {
    border-color: #fff;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
  }
  &.react-toggle--checked .react-toggle-thumb {
    border-color: #fff;
    top: 3px;
    left: 27px;
    width: 18px;
    height: 18px;
  }
  &.react-toggle--focus .react-toggle-thumb,
  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: none;
  }

  &.react-toggle:hover:not(.react-toggle--checked) .react-toggle-track {
    background-color: #b2c2ca;
  }
`;

export default StyledToggle;
