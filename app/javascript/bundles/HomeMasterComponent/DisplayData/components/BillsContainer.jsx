import React, { Component } from 'react'
import './BillsView.css'

class BillsContainer extends Component {
  state = { expanded: false, expandClass: '' }

  voteButton(vote) {
    let button = ''
    switch (vote) {
      case 'D':
        button = 'dnv'
        break
      case 'Y':
      case 'C':
      case 'S':
      case 'P':
        button = 'yay'
        break
      default:
        button = 'nay'
    }
    return button
  }

  expandBills() {
    let expanded = this.state.expanded

    if (expanded) {
      this.setState({ expanded: false })
      this.setState({ expandClass: '' })
    } else {
      this.setState({ expanded: true })
      this.setState({ expandClass: 'expanded' })
    }
  }

  moreDetails(bill) {
    let expanded = this.state.expanded
    if (expanded) {
      return (
        <div className='bill-details'>
          <div className='date-outcome'>
            {bill.outcome_date} | {bill.outcome}
          </div>
          <div>&nbsp;</div>
          <div className='votesmart-label'>VoteSmart Synopsis</div>
          <div>{bill.synopsis || 'No Synopsis at the moment'} </div>
        </div>
      )
    }
  }

  removeDuplicates(candidateBills) {
    const seen = new Set()
    const uniqueVotes = candidateBills.filter(bill => {
      const duplicate = seen.has(bill.bill_name)
      seen.add(bill.bill_name)
      return !duplicate
    })
    return uniqueVotes
  }

  render() {
    console.log('before uniq ', this.props.firstCandidateVotes)
    let newFirstVotes = this.removeDuplicates(this.props.firstCandidateVotes)
    console.log('after uniq', newFirstVotes)
    let newSecondVotes = this.removeDuplicates(this.props.secondCandidateVotes)
    return (
      <div className='candidates-bills-container'>
        <div className={`bills-container ${this.state.expandClass}`}>
          {newFirstVotes.map((bill, id) => {
            return (
              <div key={id}>
                <div className={`bill-container ${this.state.expandClass}`}>
                  <div className='expand-btn' onClick={() => this.expandBills()}>
                    <span className='expand-logo'>{this.state.expanded ? '-' : '+'}</span>
                  </div>

                  <span className='bill-title' key={id}>
                    {bill.bill_name}
                  </span>

                  <div className={`candidate-vote ${this.voteButton(bill.candidate_vote)}`} />
                </div>
                {this.moreDetails(bill)}
                <div
                  className={id < this.props.firstCandidateVotes.length - 1 ? 'bill-divider' : ''}
                />
              </div>
            )
          })}
        </div>
        <div className={`bills-container ${this.state.expandClass}`}>
          {newSecondVotes.map((bill, id) => {
            return (
              <div key={id}>
                <div className={`bill-container ${this.state.expandClass}`}>
                  <div className='expand-btn' onClick={() => this.expandBills()}>
                    <span className='expand-logo'>{this.state.expanded ? '-' : '+'}</span>
                  </div>

                  <span className='bill-title' key={id}>
                    {bill.bill_name}
                  </span>

                  <div className={`candidate-vote ${this.voteButton(bill.candidate_vote)}`} />
                </div>
                {this.moreDetails(bill)}
                <div
                  className={id < this.props.secondCandidateVotes.length - 1 ? 'bill-divider' : ''}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default BillsContainer
