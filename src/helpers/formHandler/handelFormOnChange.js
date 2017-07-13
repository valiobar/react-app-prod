/**
 * Created by UserX on 7/8/2017.
 */
export default (event, stateField,that) => {

    const target = event.target
    const field = target.name
    const value = target.value
    const state = that.state[stateField]
    state[field]=value
    that.setState({[stateField]: state})

}