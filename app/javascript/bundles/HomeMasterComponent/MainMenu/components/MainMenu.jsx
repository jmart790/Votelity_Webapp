import React from 'react'
// import './main-menu.css'
import SubMenu from './SubMenu'

class MainMenu extends React.Component {
  state = { submenu: 'Issues' }

  handleMenuClick = category => {
    this.setState({ submenu: category })
  }

  render() {
    return (
      <div className='index-background'>
        <div className='menu-container'>
          <div className='menu-categories'>
            <div
              className={`category-label title-text con-tooltip bottom ${
                this.state.submenu == 'History' ? 'category-selected' : ''
              }`}
              id='menu-history'
              // onClick={() => this.handleMenuClick('History')}
            >
              History
              <div class='tooltip '>
                <p>coming soon</p>
              </div>
              <div className={this.state.submenu == 'History' ? 'gradient-line' : ''}>&nbsp;</div>
            </div>
            <div
              className={`category-label title-text ${
                this.state.submenu == 'Issues' ? 'category-selected' : ''
              }`}
              id='menu-issues'
              onClick={() => this.handleMenuClick('Issues')}
            >
              Issues
              <div className={this.state.submenu == 'Issues' ? 'gradient-line' : ''}>&nbsp;</div>
            </div>
            <div
              className={`category-label title-text con-tooltip bottom ${
                this.state.submenu == 'Funding' ? 'category-selected' : ''
              }`}
              id='menu-funding'
              // onClick={() => this.handleMenuClick('Funding')}
            >
              Funding
              <div class='tooltip '>
                <p>coming soon</p>
              </div>
              <div className={this.state.submenu == 'Funding' ? 'gradient-line' : ''}>&nbsp;</div>
            </div>
          </div>
          <SubMenu
            menuClicked={this.state.submenu}
            subMenu={this.state.subMenu}
            handleCategories={this.props.handleCategories}
            candidate_votes={this.props.candidate_votes}
          />
        </div>
      </div>
    )
  }
}

export default MainMenu
