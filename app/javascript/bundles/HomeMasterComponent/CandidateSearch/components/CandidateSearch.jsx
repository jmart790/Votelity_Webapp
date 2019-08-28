import React from 'react'
import Candidate from './Candidate'
// import ElectionTypes from './ElectionTypes'
import SelectCandidate from './SelectCandidate'

export default class CandidateSearch extends React.Component {
  state = {
    candidates: [],
    candidate1: {},
    candidate2: {}
  }

  setCandidate = e => {
    const name = e.target.name
    this.state.candidates.forEach(candidate => {
      if (e.target.value === candidate.ballot_name) {
        this.setState({ [e.target.name]: candidate })
        this.props.handleChange([e.target.name], candidate)
      } else if (!e.target.value) {
        this.setState({ [e.target.name]: {} })
      }
    })
  }

  componentDidMount() {
    fetch('/candidates.json')
      .then(res => res.json())
      .then(candidates => this.setState({ candidates }))
  }

  render() {
    let { candidates, candidate1, candidate2 } = this.state
    return (
      <div className='search-candidates'>
        <div className='select-candidates'>
          <p>Select Candidates</p>
        </div>
        <div className='title-candidates'>
          <p> 2020 Presidential Candidates</p>
        </div>
        <div className='search-candidates-1'>
          <div className='inputDiv'>
            <SelectCandidate
              candidates={candidates}
              position={1}
              setCandidate={this.setCandidate}
            />
          </div>
          <div className='inputDiv'>
            <SelectCandidate
              candidates={candidates}
              position={2}
              setCandidate={this.setCandidate}
            />
          </div>
        </div>
        <div className='vs-middle-line'>
          <div className='input-div-img-1'>
            <Candidate candidate={candidate1} />
          </div>
          <div className='vs'>vs</div>
          <div className='input-div-img-2'>
            <Candidate candidate={candidate2} />
          </div>
        </div>
      </div>
    )
  }
}
