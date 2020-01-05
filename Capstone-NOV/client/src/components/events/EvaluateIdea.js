import React, { Component } from 'react';
import { evaluateIdea } from '../../actions/event';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class EvaluateIdea extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.confirm = this.confirm.bind(this);
    this.state = {
      score: '',
      name: ''
    };
  }
  handleChange(e) {
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    this.setState({ score: value });
  }

  confirm() {
    confirmAlert({
      title: 'Evaluate idea',
      message: 'Are you sure you want to send the score ?',
      buttons: [
        {
          label: 'Send score!',
          onClick: this.handleSubmit
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit() {
    const score = { score: this.state.score + '' };
    this.props.evaluateIdea(
      this.state.id,
      score,
      this.props.history,
      '/userEvents'
    );
    console.log(score);
  }
  componentDidMount() {
    this.setState({
      id: this.props.location.state.id,
      name: this.props.location.state.name
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    const { name, id } = this.state;
    const { errors } = this.props;
    return (
      <div
        className="container justify-content-center align-content-center"
        style={{ maxWidth: '400px', marginTop: '50px' }}
      >
        <div className="justify-content-center">
          <h1 className="font-bold text-center" style={{ marginBottom: '2vh' }}>
            Evaluating Idea:
          </h1>
          <h2 className="text-center" style={{ marginBottom: '5vh' }}>
            {name}
          </h2>
        </div>

        <h3 className="text-center">Score: </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row" style={{ textAlign: 'center' }}>
            <div className="form-group justify-content-center col-md-12">
              <input
                className={classnames('form-control cust-input', {
                  'is-invalid': errors.score
                })}
                name="score"
                type="number"
                value={this.state.score}
                onChange={this.handleChange}
                min-="0"
                max="100"
              />
              %
              {errors.score && (
                <div className="invalid-feedback">{errors.score}</div>
              )}
              <small className="form-text text-muted">
                Please enter rating from 1 to 100
              </small>
            </div>
          </div>
        </form>
        <div
          className="form-row justify-content-around"
          style={{ marginTop: '10px' }}
        >
          <button className="btn btn-success" onClick={this.confirm}>
            Send!
          </button>

          <button className="btn btn-dark" onClick={this.handleBack}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { evaluateIdea }
)(EvaluateIdea);
