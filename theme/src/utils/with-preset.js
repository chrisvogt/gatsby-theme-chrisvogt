const withPreset = ({ preset }) => spec => spec(preset || {})

export default withPreset
