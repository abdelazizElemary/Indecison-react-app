class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.addone = this.addone.bind(this);
        this.minusone = this.minusone.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            count: 0
        };

    }

    componentDidMount() {
        const data = localStorage.getItem('count')
        const count = parseInt(data, 10)
        if (!isNaN(count)) {
            this.setState(() => ({ count }))
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count)
        }
    }

    addone() {
        this.setState((prev) => ({ count: prev.count + 1 }))

    }
    minusone() {
        this.setState((prev) => ({ count: prev.count - 1 }))
    }
    reset() {
        this.setState(() => ({ count: 0 }))
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.addone} >+1</button>
                <button onClick={this.minusone} >-1</button>
                <button onClick={this.reset} >reset</button>
            </div>
        );
    }
}


ReactDOM.render(<Counter />, document.getElementById('app'))