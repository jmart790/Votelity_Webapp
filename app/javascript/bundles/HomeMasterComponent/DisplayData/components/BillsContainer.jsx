import React, { Component } from 'react'
import BillList from './BillList'

class BillsContainer extends Component {
  state = { expanded: false, expandClass: '' }

  handleCandidateVote(vote) {
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

  handleVotes(billList) {
    let display = null
    if (billList.length < 1) {
      display = (
        <div className='bill-container'>
          <span></span>
          <span className='bill-title'>
            Sorry, the candidate has no votes associated with this issue.
          </span>
        </div>
      )
    } else {
      display = billList.map((bill, id) => {
        return (
          <div key={id}>
            <div className={`bill-container ${this.state.expandClass}`}>
              <div className='expand-btn' onClick={() => this.expandBills()}>
                <span className='expand-logo'>{this.state.expanded ? '-' : '+'}</span>
              </div>

              <span className='bill-title' key={id}>
                {bill.bill_name}
              </span>

              <div
                className={`third-col candidate-vote ${this.handleCandidateVote(
                  bill.candidate_vote
                )}`}
              />
            </div>
            {this.moreDetails(bill)}
            <div className={id < billList.length - 1 ? 'bill-divider' : ''} />
          </div>
        )
      })
    }
    return display
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
    let newFirstVotes = this.removeDuplicates(this.props.firstCandidateVotes)
    let newSecondVotes = this.removeDuplicates(this.props.secondCandidateVotes)
    return (
      <div className='candidates-bills-container'>
        <div className={`bills-container ${this.state.expandClass}`}>
          {this.handleVotes(newFirstVotes)}
        </div>
        <div className={`bills-container ${this.state.expandClass}`}>
          {this.handleVotes(newSecondVotes)}
        </div>
      </div>
    )
  }
}

export default BillsContainer
