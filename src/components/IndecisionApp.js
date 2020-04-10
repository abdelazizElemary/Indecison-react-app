import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        subtitle: 'Put your life in the hands of a computer.',
        options: [],
        selectedOption: undefined
    };

    handleSelectedOption = () => {
        this.setState(({ selectedOption: undefined }))
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handlePick = () => {
        const randNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randNum]
        this.setState(({ selectedOption: option }))
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter an option first'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option is already existed'
        }
        this.setState((prev) => ({ options: prev.options.concat(option) }));
    };

    handleDelete = (optionToRemove) => {
        this.setState((prev) => ({ options: prev.options.filter((option) => optionToRemove !== option) }));
    };

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

    render() {
        return (
            <div>
                <Header subtitle={this.state.subtitle} />
                <div className="container">
                    <Action
                        hasOption={this.state.options.length === 0}
                        handlePick={this.handlePick}
                    />

                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDelete={this.handleDelete}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    
                </div>

                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleSelectedOption={this.handleSelectedOption}
                />
            </div>
        );
    }
}

export default IndecisionApp;