import React from "react";

type PropsType = {
  description?: string;
};
export const Loading = (props: PropsType) => {
  return <h2 data-cy="loading">{props.description ?? "Loading..."}</h2>;
};
