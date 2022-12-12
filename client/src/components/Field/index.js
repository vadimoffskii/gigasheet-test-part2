import React from 'react'
import PropTypes from 'prop-types'

import './Field.scss'

import Button from '../Button'

const Field = ({ label, value, onChange, onSubmit, isRequired }) => {
  return (
    <form className='form-group' onSubmit={onSubmit}>
      {label && <label htmlFor="domains">{label}</label>}
      <input
        name='domains'
        type="text"
        placeholder='Enter any domains...'
        value={value}
        onChange={onChange}
        required={isRequired ? true : false}
      />
      <Button />
    </form>
  )
}


Field.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  domainRegex: PropTypes.string,
  isRequired: PropTypes.bool,
}

Field.defaultProps = {
  label: 'Up to 10 input domain names one per line:',
  onChange: () => { },
  isRequired: false,
}

export default Field
