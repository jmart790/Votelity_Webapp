import React from 'react'

const BillList = props => {
  const { candidateBills, expandClass, expandBills, expanded, handleCandidateVote } = props

  return (
    <React.Fragment>
      {candidateBills.map((bill, id) => {
        return (
          <div key={id}>
            <div className={`bill-container ${expandClass}`}>
              <div className='expand-btn' onClick={() => expandBills()}>
                <span className='expand-logo'>{expanded ? '-' : '+'}</span>
              </div>

              <span className='bill-title' key={id}>
                {bill.bill_name}
              </span>

              <div className={`candidate-vote ${handleCandidateVote(bill.candidate_vote)}`} />
            </div>
            {this.moreDetails(bill)}
            <div className={id < candidateBills.length - 1 ? 'bill-divider' : ''} />
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default BillList
