class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.state = {
            subtitle: 'Put your life in the hands of your computer',
            options: []
        }
    }

    //Adjusting the local storage for the old options
    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if (options) {
                this.setState(({ options }))
            }
        } catch (error) {

        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }


    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handlePick() {
        const randNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randNum]
        alert(option)
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter an option first'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option is already existed'
        }
        this.setState((prev) => ({ options: prev.options.concat(option) }));
    }
    handleDelete(optionToRemove) {
        this.setState((prev) => ({ options: prev.options.filter((option) => optionToRemove !== option) }));
    }
    render() {
        return (
            <div>
                <Header subtitle={this.state.subtitle} />
                <Action
                    hasOption={this.state.options.length === 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDelete={this.handleDelete}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};
Header.defaultProps = {
    title: "Indecision"

}


const Action = (props) => {
    return (
        <div>
            <button disabled={props.hasOption} onClick={props.handlePick} >What should i do ?</button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions} >Remove All</button>
            {props.options.length === 0 && <p>Please add some options to get started!</p>}
            <ol>
                {
                    props.options.map((option, index) => (
                        <Option
                            handleDelete={props.handleDelete}
                            key={index}
                            optionText={option}
                        />
                    ))
                }
            </ol>
        </div>
    );
}



const Option = (props) => {
    return (
        <div>
            <li>
                {props.optionText}
                <button onClick={(e) => { props.handleDelete(props.optionText) }}>remove</button>
            </li>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => ({ error }))
        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))
