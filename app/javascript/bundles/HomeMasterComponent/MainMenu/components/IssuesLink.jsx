import React from 'react'
import Modal from 'react-responsive-modal'
import CategoryContainer from '../../DisplayData/components/CategoryContainer'
import { kebabCase } from '../../../utilities'

class IssuesLink extends React.Component {
  state = {
    subMenu: this.props.menuClicked,
    popularIssues: [2, 93, 30, 32, 37, 38, 40, 101, 76, 67],
    favoriteIssues: [],
    filterIssues: 'Popular',
    open: false,
    allCategories: []
  }

  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.setState({ open: false })
    this.props.handleCategories(this.state.favoriteIssues)
  }

  handleIssuesFilter = filter => {
    this.setState({ filterIssues: filter })
    this.state.filterIssues == 'Popular' ? this.onOpenModal() : this.onCloseModal()
  }

  selectFavoriteIssues = e => {
    let issue = e.target.name
    let favIssues = this.state.favoriteIssues
    let issueIndex = favIssues.indexOf(issue)

    if (favIssues.includes(issue)) {
      favIssues.splice(issueIndex, 1)
    } else {
      favIssues.push(issue)
    }
    this.setState({ favoriteIssues: favIssues })
  }

  componentDidMount() {
    fetch('/categories.json')
      .then(res => res.json())
      .then(categories => this.setState({ allCategories: categories }))
  }

  showIssues() {
    if (this.state.filterIssues == 'Popular') {
      return this.state.popularIssues
    } else {
      return this.state.favoriteIssues
    }
  }

  handleIssueClick = name => () => {
    const id = `#${kebabCase(name)}-bill-container`
    const element = document.querySelector(id)
    element && element.scrollIntoView()
  }

  render() {
    const { open } = this.state
    // console.log('state', this.state)
    return (
      <React.Fragment>
        <div className='issues-filter'>
          <span
            className={this.state.filterIssues == 'Popular' ? 'issues-filter-selected' : ''}
            onClick={() => this.handleIssuesFilter('Popular')}
          >
            Popular Issues
          </span>
          <span
            className={this.state.filterIssues == 'Favorite' ? 'issues-filter-selected' : ''}
            onClick={() => this.handleIssuesFilter('Favorite')}
          >
            Favorite Issues
          </span>

          <Modal
            open={open}
            onClose={this.onCloseModal}
            center
            classNames={{ modal: 'issue-modal' }}
          >
            {this.state.allCategories.map((cat, index) => {
              return (
                <div key={index}>
                  <input
                    type='button'
                    name={cat.refid}
                    value={cat.name}
                    className={
                      this.state.favoriteIssues.includes(cat.refid.toString())
                        ? 'issue-button selected'
                        : 'issue-button'
                    }
                    onClick={this.selectFavoriteIssues}
                  />
                </div>
              )
            })}
          </Modal>
        </div>

        <div className='submenu-title title-text'>
          {this.state.filterIssues} {this.state.subMenu}
        </div>
        <div className='inner-links'>
          {this.showIssues().map((issue, id) => {
            const { name = String() } =
              this.state.allCategories.find(({ refid }) => refid === Number(issue)) || {}
            return (
              <div key={id} className='inner-link-with-divider'>
                <span onClick={this.handleIssueClick(name)} className='inner-link'>
                  {name}
                </span>
                <span className='link-divider'>{id < this.showIssues().length - 1 ? '|' : ''}</span>
              </div>
            )
          })}
        </div>
        <div className='img-pillars' />
        <div className='legend-background-color'>
          <div id='text-legend'>
            <span>Voted Yes</span>
            <div className='candidate-vote yay' />|<span>Voted No</span>
            <div className='candidate-vote nay' />|<span>Did Not Vote</span>
            <div className='candidate-vote dnv' />
          </div>
        </div>

        <CategoryContainer
          key={this.state.filterIssues}
          categories={this.showIssues()}
          subMenu={this.state.subMenu}
          candidateVotes={this.props.candidate_votes}
          allCategories={this.state.allCategories}
        />
      </React.Fragment>
    )
  }
}
export default IssuesLink
