import { React, Spinner } from "../../common";

const Loader = (props) => {
  const { type } = props;

  switch (type) {
    case "section":
      return (
        <>
          {new Array(5).map((index) => (
            <Spinner
              key={index}
              className="custom-animated"
              animation="grow"
              variant="primary"
              size="sm"
              role="status"
            />
          ))}
        </>
      );
    default:
      return (
        <Spinner
          animation="border"
          variant="primary"
          className="mx-auto my-5"
          size="lg"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
  }
};

export default Loader;
