import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { select: selectKnob } = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import HorizontalScroll from ".";
const MockItem = styled.div`
  width: 300px;
  height: 450px;
  background-color: cyan;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/HorizontalScroll`, module).add(
  "Default",
  () => {
    return (
      <HorizontalScroll
        arrowPlacement={selectKnob(
          "arrowPlacement",
          {
            Top: "top",
            Bottom: "bottom",
            Inner: "inner",
          },
          "inner",
        )}
      >
        <MockItem>1</MockItem>
        <MockItem>2</MockItem>
        <MockItem>3</MockItem>
        <MockItem>4</MockItem>
        <MockItem>5</MockItem>
        <MockItem>6</MockItem>
        <MockItem>7</MockItem>
        <MockItem>8</MockItem>
        <MockItem>9</MockItem>
        <MockItem>10</MockItem>
        <MockItem>11</MockItem>
        <MockItem>12</MockItem>
        <MockItem>13</MockItem>
        <MockItem>14</MockItem>
        <MockItem>15</MockItem>
        <MockItem>16</MockItem>
        <MockItem>17</MockItem>
        <MockItem>18</MockItem>
        <MockItem>19</MockItem>
        <MockItem>20</MockItem>
        <MockItem>21</MockItem>
        <MockItem>22</MockItem>
        <MockItem>23</MockItem>
        <MockItem>24</MockItem>
        <MockItem>25</MockItem>
      </HorizontalScroll>
    );
  },
);
