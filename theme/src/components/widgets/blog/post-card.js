/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ category, date, excerpt, link, title }) => (
  <Link sx={{ variant: `styles.PostCard` }} to={link}>
    <Styled.h4>{title}</Styled.h4>
    <div>
      <FontAwesomeIcon icon={faCalendarAlt} width='16' /> <span>{date}</span>
    </div>
    <p>
      <span
        sx={{
          backgroundColor: `muted`,
          color: `text`,
          fontSize: 0,
          py: 1,
          px: 2,
          borderRadius: `2px`
        }}
      >
        {category}
      </span>{' '}
      {excerpt}
    </p>
    <div style={{ textAlign: `right` }}>
      <span>View post &raquo;</span>
    </div>
  </Link>
)
