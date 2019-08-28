import React from 'react'
// import defaultImg from 'https://votelity-bucket.herokuapp.com/images/candidate-default.png'

const Candidate = props => {
  const { candidate } = props
  const defaultImg = 'https://votelity-bucket.herokuapp.com/images/candidate-default.png'
  const imageURL = 'https://votelity-bucket.herokuapp.com/images/'
  const image = candidate.refid
    ? candidate.refid && imageURL + '/candidates/' + candidate.refid + '.jpg'
    : defaultImg

  candidate.refid && imageURL + '/candidates/' + candidate.refid + '.jpg'
  return (
    <React.Fragment>
      <div>
        <img src={image} alt={candidate.ballot_name} />
      </div>
      <div className='candidates-names-title'>
        <div className='candidate-under-name'>
          <p>{candidate.ballot_name}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Candidate
