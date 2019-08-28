import React from 'react'
import CategoryContainer from '../../DisplayData/components/CategoryContainer'

const HistoryLink = props => {
  let subMenu = props.menuClicked
  const innerLinks = ['Summary', 'Contributors', 'Industries', 'Sectors', 'Metro Areas']

  return (
    <React.Fragment>
      <div className='submenu-title title-text'>{`${subMenu} Categories`}</div>
      <div className='inner-links'>
        {innerLinks.map((innerLink, id) => {
          return (
            <div key={id} className='inner-link-with-divider'>
              <span className='inner-link'>{innerLink}</span>
              <span className='link-divider'>{id < innerLinks.length - 1 ? '|' : ''}</span>
            </div>
          )
        })}
      </div>
      <div className='img-pillars' />
      <CategoryContainer categories={innerLinks} subMenu={subMenu} />
    </React.Fragment>
  )
}

export default HistoryLink
