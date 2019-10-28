/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ fill, invert }) => {
  return (
    <svg
      width='100%'
      preserveAspectRatio='xMidYMax slice'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1366 64'
      sx={{
        verticalAlign: 'top'
      }}
    >
      <path
        fill={fill ? fill : `white`}
        d='M1366,0V60.42c-.2,2.32-88.53,7-218.38-.43-129.74-6.07-301-24.16-464.62-36.87C519.8,9.31,348.92,6,218.94,19.73,89,31.35-.15,60,0,61.54V0Z'
      ></path>
    </svg>
  )
}
