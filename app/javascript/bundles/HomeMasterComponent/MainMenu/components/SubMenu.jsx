import React from 'react'
import IssuesLink from './IssuesLink'
import HistoryLink from './HistoryLink'
import FundingLink from './FundingLink'

const SubMenu = props => {
  let subMenu = null
  switch (props.menuClicked) {
    case 'Issues':
      subMenu = (
        <IssuesLink
          menuClicked={props.menuClicked}
          handleCategories={props.handleCategories}
          candidate_votes={props.candidate_votes}
        />
      )
      break
    case 'History':
      subMenu = <HistoryLink menuClicked={props.menuClicked} />
      break
    case 'Funding':
      subMenu = <FundingLink menuClicked={props.menuClicked} />
      break
  }

  return <div className='sub-menu-container'>{subMenu}</div>
}

export default SubMenu
