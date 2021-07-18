import React from "react";

class ChangingProgressProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      valuesIndex: 0,
    };

    this._isMounted = false;
  }
  static defaultProps = {
    interval: 1000,
  };

  componentDidMount() {
    this._isMounted = true;
    setInterval(() => {
      if (this._isMounted) {
        this.setState({
          valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
        });
      }
    }, this.props.interval);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
