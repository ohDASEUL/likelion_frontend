import PropTypes from "prop-types";

Shopping.propTypes = {
  shoppingFees: PropTypes.number.isRequired,
  handlePayment: PropTypes.func.isRequired,
};
export default function Shopping({ shoppingFees, handlePayment }) {
  return (
    <div>
      <h2>배송비</h2>
      <div>
        배송비: {shoppingFees.toLocaleString()}원
        <br />
      </div>
      <br />
      <button type="button" onClick={handlePayment}>
        결제
      </button>
    </div>
  );
}
