import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({ onClick, label, type, isDisabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled ? true : false}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

Button.defaultProps = {
  onClick: () => { },
  label: 'Highlight top ranking',
  type: 'submit',
  isDisabled: false,
}

export default Button