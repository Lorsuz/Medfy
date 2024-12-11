"use client";

import styled from "styled-components";

interface IsSelected {
	$isActive: string;
}

export const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: var(--theme-color);
  min-width: 19.4375rem;
  justify-content: space-between;
  height: 52.125rem;
  padding: 1.6875rem 1.5rem 1.5rem 0;
  position: relative;
`;
export const HideSideBarContainer = styled.aside`
  display: flex;
  position: relative;

  align-items: center;
  border-radius: 20px;
  background: var(--theme-color);
  max-width: 3.5rem;
  justify-content: space-between;
  height: 52.125rem;
  padding: 0 2rem;
`;

export const HideAndShowSideBarButton = styled.button`
  background: #f3f3f3;
  border-radius: 99px;
  padding: 1rem;
  margin-left: 0.5rem;
  border: none;
  position: absolute;
  top: 40%;
  right: -20px;
  transform: translateY(-50%);
`;

export const ProfileInfoAndNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
`;

export const NameAndEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.55rem;
`;

export const ProfileInfoContainer = styled.article<IsSelected>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  border-bottom-left-radius: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "" : "20px" };
  border-top-left-radius: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "" : "20px" };

  background: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "var(--theme-color)" : "#f3f3f3" };

  svg {
    cursor: pointer;
    margin-left: 2.5rem;
  }

  h2 {
    color: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "var(--theme-color)" : "#FFFFFF" };
    font-size: 0.9rem;

    font-weight: 600;
  }

  p {
    font-size: 0.75rem;

    color: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "#5C5C5C" : "#FFFFFF" };
  }
`;

export const ProfileInfoContent = styled.div<IsSelected>`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  padding: 1.75rem 1rem 2rem 1.75rem;

  background: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "#f3f3f3" : "var(--theme-color)" };

  border-top-right-radius: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "20px" : "" };
  border-bottom-right-radius: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "20px" : "" };
  border-bottom-left-radius: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "20px" : "" };
`;

export const DashboardLink = styled.a<IsSelected>`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  background: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "var(--theme-color)" : "#f3f3f3" };

  &:hover {
    cursor: pointer;
  }

  div {
    display: flex;
    gap: 2.375rem;
    background: var(--theme-color);
    margin-right: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "3rem" : "" };

    width: 100%;
    height: 100%;
    padding: 1rem 0 0.8125rem 1.6875rem;

    background: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "#f3f3f3" : "var(--theme-color)" };

    color: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "var(--theme-color)" : "#FFFFFF" };
    border-bottom-left-radius: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "20px" : "" };
    border-top-left-radius: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "20px" : "" };
    border-top-right-radius: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "20px" : "" };
    border-bottom-right-radius: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "20px" : "" };
  }
`;

export const QuestionsLink = styled.a<IsSelected>`
  display: flex;
  text-decoration: none;

  align-items: center;
  width: 100%;

  color: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "var(--theme-color)" : "#FFFFFF" };

  background: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "var(--theme-color)" : "#f3f3f3" };

  div {
    display: flex;
    gap: 2.375rem;
    background: var(--theme-color);

    width: 100%;
    height: 100%;
    padding: 1rem 0 0.8125rem 1.6875rem;
    margin-right: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "3rem" : "" };

    background: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "#f3f3f3" : "var(--theme-color)" };

    color: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "var(--theme-color)" : "#FFFFFF" };

    border-top-right-radius: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "20px" : "" };

    border-bottom-right-radius: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "20px" : "" };

    border-top-left-radius: ${ ( { $isActive } ) =>
		$isActive === "dashboard" ? "20px" : "" };

    border-bottom-left-radius: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "20px" : "" };
  }
  &:hover {
    cursor: pointer;
  }
`;

export const MySignaturesLink = styled.a<IsSelected>`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  background: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "var(--theme-color)" : "#f3f3f3" };

  align-items: center;

  div {
    display: flex;
    gap: 2.375rem;
    background: var(--theme-color);
    margin-right: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "3rem" : "" };

    width: 100%;
    height: 100%;
    padding: 1rem 0 0.8125rem 1.6875rem;

    color: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "var(--theme-color)" : "#FFFFFF" };
    background: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "#f3f3f3" : "var(--theme-color)" };

    margin-right: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "3rem" : "" };

    border-top-left-radius: ${ ( { $isActive } ) =>
		$isActive === "questions" ? "20px" : "" };

    border-top-right-radius: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "20px" : "" };
    border-bottom-right-radius: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "20px" : "" };
  }

  &:hover {
    cursor: pointer;
  }
`;

export const MySignaturesSupportBorder = styled.div<IsSelected>`
  background: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "#f3f3f3" : "var(--theme-color)" };

  div {
    display: flex;
    background: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "var(--theme-color)" : "var(--theme-color)" };

    border-top-left-radius: ${ ( { $isActive } ) =>
		$isActive === "mySignatures" ? "20px" : "" };
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  font-weight: 700;
  margin-left: 1.625rem;
  border: none;
  padding: 0.6875rem 0 0.8125rem 1rem;
  color: #ffffff;
  background: transparent;
  border: 2px solid #f9f9f9;

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-right: 4rem;
  }
`;

export const SideBarNav = styled.nav`
  display: flex;
  flex-direction: column;
  background: var(--theme-color);
`;

export const LogoAndNameContainer = styled.div<IsSelected>`
  display: flex;
  background: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "var(--theme-color)" : "#f3f3f3" };

  background: #f3f3f3;

  h2 {
    color: #ffffff;
    margin-left: 1.3125rem;
  }

  div {
    padding-bottom: 1.5rem;
    padding-left: 1.6875rem;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    background: var(--theme-color);
    border-bottom-left-radius: ${ ( { $isActive } ) =>
		$isActive === "profile" ? "20px" : "" };
  }
`;
