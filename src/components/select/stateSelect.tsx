import React from 'react'

import statesList from '../../data/states.json'

type StateSelectProps = {
   setSelectedState
   selectedState,
   fieldName
}

const StateSelect = (props: StateSelectProps) => {
  return (
    <div>
      <select onChange={props.selectedState}>
          {statesList.UF.map(state => {
            return <option value={state.sigla}>{state.sigla}</option>
          })}
        </select>
    </div>
  )
}

export default StateSelect
