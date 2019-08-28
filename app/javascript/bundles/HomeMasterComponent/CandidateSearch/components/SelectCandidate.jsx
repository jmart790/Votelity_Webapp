import React, { Component } from 'react'

export class SelectCandidate extends Component {
  render() {
    return (
      <React.Fragment>
        <label htmlFor='candidate' />
        <input
          name={`candidate${this.props.position}`}
          className={`search-input-${this.props.position}`}
          type='text'
          placeholder='search Candidates '
          list='candidate-options'
          onChange={e => {
            this.props.setCandidate(e)
          }}
        />
        <datalist id='candidate-options'>
          {this.props.candidates.map((candidate, i) => {
            return (
              <option
                value={candidate.ballot_name}
                key={candidate.ballot_name + this.props.position}
              />
            )
          })}
        </datalist>
      </React.Fragment>
    )
  }
}

export default SelectCandidate
