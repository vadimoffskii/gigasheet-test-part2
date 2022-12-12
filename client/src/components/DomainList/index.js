import React from 'react'
import PropTypes from 'prop-types'

import './DomainList.scss'

const DomainList = ({ list }) => {
  if (!list.length) return null

  if (list.length >= 9) {
    return (
      <ul>
        <li>Results:</li>
        {list.slice(0, 10).map(({ domain, rank, ip, message }, idx) => (
          <li
            key={ip + idx || message + idx}
            className={`${rank <= 100 ? 'highlight' : ''}`}
          >
            {domain || message}
          </li>
        ))}
        <li>No more results available...&#128549;</li>
      </ul>
    )
  }
  return (
    <ul>
      <li>Results:</li>
      {list.map(({ domain, rank, ip, message }, idx) => (
        <li
          key={ip + idx || message + idx}
          className={`${rank <= 100 ? 'highlight' : ''}${message ? 'error' : ''}`}
        >
          {domain || message}
        </li>
      ))}
    </ul>
  )
}

DomainList.propTypes = {
  list: PropTypes.array.isRequired
}

export default DomainList