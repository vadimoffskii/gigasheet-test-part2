import React, { useState } from 'react'
import axios from 'axios';

import './App.scss'

import Field from './components/Field';
import DomainList from './components/DomainList';

const App = () => {
  const [value, setValue] = useState('')
  const [domains, setDomains] = useState([])

  const onChange = (event) => {
    event.preventDefault()
    const enteredValues = event.target.value
    setValue(enteredValues)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const domainRegex = new RegExp(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/, 'g')
    const enteredValues = value.match(domainRegex)
    const endpoints = enteredValues.map((domain) => axios.get(`/${domain}`))
    try {
      let domainDetails = await axios.all(endpoints).then(axios.spread((...res) => res?.map((el) => el.data)))
      setDomains(domainDetails)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='wrapper'>
      <h2 className='title'>Website rank filtering</h2>
      <Field value={value} onChange={onChange} onSubmit={onSubmit} isRequired />
      <DomainList list={domains} />
    </div>
  )
}

export default App