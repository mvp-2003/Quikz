import PropTypes from 'prop-types';

const Button = ({Text}) => {
  return (
    <button className="bg-button-light dark:bg-button-dark md:h-20 p-2 text-white font-semibold text-[20px] md:text-[45px] rounded-[15px]">
      {Text}
    </button>
  )
}

Button.propTypes = {
    Text: PropTypes.string.isRequired, // Make Text prop required and specify its type
  };
  
export default Button
