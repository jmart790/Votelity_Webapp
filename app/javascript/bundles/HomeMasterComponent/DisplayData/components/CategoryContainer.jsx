import React, { Component } from 'react'
import BillsContainer from './BillsContainer'
import { kebabCase } from '../../../utilities'

class CategoryContainer extends Component {
  render() {
    const categories = this.props.categories
    const allCategories = this.props.allCategories
    let categoryNames = []

    categories.map(issue => {
      const { name = String() } = allCategories.find(({ refid }) => refid === Number(issue)) || {}
      categoryNames.push(name)
    })


    const first_candidate_votes =
      this.props.candidateVotes && this.props.candidateVotes.length
        ? this.props.candidateVotes[0]
        : {}

    const filtered_first = Object.keys(first_candidate_votes)
      .filter(key => categoryNames.includes(key))
      .reduce((obj, key) => {
        obj[key] = first_candidate_votes[key]
        return obj
      }, {})


    const second_candidate_votes =
      this.props.candidateVotes && this.props.candidateVotes.length
        ? this.props.candidateVotes[1]
        : {}

    const filtered_second = Object.keys(second_candidate_votes)
      .filter(key => categoryNames.includes(key))
      .reduce((obj, key) => {
        obj[key] = second_candidate_votes[key]
        return obj
      }, {})

    return (
      <div className='background-issues'>
        {Object.keys(filtered_first).map((category, id) => {
          return (
            <div
              key={id}
              className={`section-background ${
                id % 2 == 0 ? 'background-light' : 'background-dark'
              }`}
            >
              <span
                className='title-category-label title-text'
                id={`${kebabCase(category)}-bill-container`}
              >
                {category}
              </span>
              <BillsContainer
                firstCandidateVotes={first_candidate_votes[category]}
                secondCandidateVotes={second_candidate_votes[category]}
              />
            </div>
          )
        })}
      </div>
    )
  }
}
export default CategoryContainer
