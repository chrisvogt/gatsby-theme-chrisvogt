/**
 * Select Metrics Payload
 * @param {object} response Response data from a Personal Metrics API response.
 * @returns {object} The selected metrics data.
 */
const selectMetricsPayload = (reponseData = {}) => {
  const { payload } = reponseData
  return payload
}

export default selectMetricsPayload
