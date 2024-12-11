import styled from "styled-components";

export const LabelAndSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 16.1875rem;
`;
export const LabelAndSelect = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  position: relative;

  select {
    border: 1px solid #dcdcdc;
    padding: 1.1875rem 1.5rem 1.1875rem 1.1875rem;
    border-radius: 8px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  label {
    color: #5c5c5c;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  svg {
    position: absolute;
    top: 25%;
    right: 0.2rem;
    pointer-events: none;
    color: #5c5c5c;
    font-size: 1.5rem;
  }

  option {
    color: #242424;
  }
`;

export const LabelAndSvgContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
