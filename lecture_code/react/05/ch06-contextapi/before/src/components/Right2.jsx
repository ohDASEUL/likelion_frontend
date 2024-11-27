import Right3 from "@components/Right3";
import PropTypes from "prop-types";
import { useEffect } from "react";

Right2.propTypes = {
  countUp: PropTypes.func.isRequired,
};

function Right2({ countUp }) {
  useEffect(() => {
    console.log("    # Right2 렌더링.");
  });
  return (
    <div>
      <h2>Right2</h2>
      <Right3 countUp={countUp} />
    </div>
  );
}

export default Right2;
