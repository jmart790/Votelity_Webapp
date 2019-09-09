import React, { Component } from 'react'
import CandidateSearch from '../CandidateSearch/components/CandidateSearch'
import MainMenu from '../MainMenu/components/MainMenu'
import axios from 'axios'

class HomeMasterComponent extends Component {
  state = {
    candidate1: {},
    candidate2: {},
    categories: [2, 93, 30, 32, 37, 38, 40, 101, 76, 67],
    candidate_votes: []
  }

  checkForBoth = () => {
    if ('ballot_name' in this.state.candidate1 && 'ballot_name' in this.state.candidate2) {
      let categories = this.state.categories
      let candidate1 = this.state.candidate1['refid']
      let candidate2 = this.state.candidate2['refid']

      axios
        .get(`/api.json?candidate1=${candidate1}&candidate2=${candidate2}&categories=${categories}`)
        .then(response => this.setState({ candidate_votes: response.data.votes }))
      // console.log('Both candidates picked')
    }
  }

  handleChange = (key, val) => {
    this.setState({ [key]: val }, this.checkForBoth)
  }

  handleCategories = async categories => {
    await this.setState({ categories })
    // console.log(`MasterComponent has categories of:  ${this.state.categories}`)
  }

  render() {
    const { candidate1, candidate2 } = this.state
    return (
      <div>
        <CandidateSearch handleChange={this.handleChange} />
        <MainMenu
          candidates={[candidate1, candidate2]}
          handleCategories={this.handleCategories}
          candidate_votes={this.state.candidate_votes}
        />
      </div>
    )
  }
}
export default HomeMasterComponent
