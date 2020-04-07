class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this);
        this.state = {
            buttonName: false
        };
    }
    showInfo() {
        this.setState((prev) => {
            return {
                buttonName: !prev.buttonName
            };
        });
    }
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.showInfo}>{this.state.buttonName ? 'Hide details' : 'Show details'}</button>
                {this.state.buttonName && (
                    <div>
                        <p>this is the hidden message</p>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<Toggle />, document.getElementById('app'))