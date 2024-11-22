import PropTypes from "prop-types";
import { memo } from "react";

const Shopping = memo(function Shopping({ fees, handlePayment }) {
  return (
    <>
      <h2>배송비</h2>
      <div>
        배송비: {fees.toLocaleString()}원<br />
      </div>
      <br />
      <button type="button" onClick={handlePayment}>
        결제
      </button>
    </>
  );
});

Shopping.propTypes = {
  fees: PropTypes.number.isRequired,
  handlePayment: PropTypes.func.isRequired,
};

export default Shopping;
