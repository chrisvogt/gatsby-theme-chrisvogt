/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ category, date, excerpt, link, title }) => (
  <Link sx={{ variant: `styles.PostCard` }} to={link}>
    <div sx={{ textAlign: `right` }}>
      <span
        sx={{
          backgroundColor: `dark`,
          color: `light`,
          fontSize: 0,
          py: 1,
          px: 2,
          borderRadius: `4px`
        }}
      >
        {category}
      </span>
    </div>
    <Styled.h4>{title}</Styled.h4>
    <div>
      <FontAwesomeIcon icon={faCalendarAlt} /> <span>Posted {date}</span>
    </div>
    <p>{excerpt}</p>
    <div style={{ textAlign: `right` }}>
      <span>View post &raquo;</span>
    </div>
  </Link>
)
