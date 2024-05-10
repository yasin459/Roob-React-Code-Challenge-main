import { Button } from "../../shared/components/button";
type PropsType = {
  page: number;
  handleClick: (page: number) => () => void;
};
export const Pagination = (props: PropsType) => {
  return (
    <div className="paginationContainer">
      {[0, 1, 2].map((pageNumber) => (
        <Button
          dataCy={`pagination-${pageNumber}`}
          disabled={props.page === pageNumber}
          onClick={props.handleClick(pageNumber)}
        >
          {String(pageNumber + 1)}
        </Button>
      ))}
    </div>
  );
};
