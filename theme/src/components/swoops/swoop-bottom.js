/** @jsx jsx */
import { jsx } from 'theme-ui'
import getDefaultFillColor from './get-default-fill-color'

export default ({ fill }) => {
  const defaultFillColor = getDefaultFillColor()

  return (
    <svg
      width='100%'
      preserveAspectRatio='xMidYMin slice'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1366 63'
      sx={{
        fill: fill || defaultFillColor,
        verticalAlign: 'bottom',
        // Hack to fix a bug in some browser where a fraction of a pixel
        // of space is sometimes rendered below the swoop
        marginBottom: '-1px'
      }}
    >
      <path
        fill='inherit'
        d='M1366,64V3.6c-.2-2.32-88.53-7-218.38.43C1017.88,10.1,846.62,28.18,683,40.89,519.8,54.69,348.92,58,218.94,44.28,89,32.66-.15,4,0,2.48V64Z'
      ></path>
    </svg>
  )
}
