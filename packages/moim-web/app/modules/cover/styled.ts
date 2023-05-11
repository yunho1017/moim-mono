import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";

export const TRANSITION_DURATION = 300;

export const FadeTransitionGroup = styled(TransitionGroup)`
  height: 100%;

  .fade-enter {
    opacity: 0;
    transform: scale(0.9);
  }

  .fade-enter-active {
    transition: opacity, left ${TRANSITION_DURATION}ms ease-in-out;
    opacity: 1;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    transition: opacity, left ${TRANSITION_DURATION}ms ease-in-out;
    opacity: 0;
    transform: scale(0.9);
  }

  .fade-enter-done,
  .fade-exit-done {
    /* Clear transition style */
  }
`;
