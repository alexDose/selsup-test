import {Component} from 'react';

interface Param {
    id: number;
    name: string;
    type: 'string' | 'number';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors?: string[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

const params = [
    {
        id: 1,
        name: 'Назначение',
        type: 'string' as const,
    },
    {
        id: 2,
        name: 'Длина',
        type: 'string' as const,
    },
];

const model = {
    paramValues: [
        {
            paramId: 1,
            value: 'повседневное',
        },
        {
            paramId: 2,
            value: 'макси',
        },
    ],
};

const App = () => {
    return (
        <div>
            <ParamEditor params={params} model={model}/>
        </div>
    );
};

class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    public getModel(): Model {
        return {paramValues: this.state.paramValues, colors: this.props.model.colors};
    };

    handleChange = (id: number, value: string) => {
        const newParamValues = this.state.paramValues.map(paramValue => {
            if (paramValue.paramId === id) return {...paramValue, value};
            return paramValue;
        });
        this.setState({paramValues: newParamValues});
    };

    render() {

        return (
            <div>
                {this.props.params.map((param) => {
                    const paramValue = this.state.paramValues.find((paramValue) => paramValue.paramId === param.id);
                    const value = paramValue ? paramValue.value : '';

                    return (
                        <div key={param.id}>
                            <label>{param.name}:</label>
                            <input onChange={(event) => this.handleChange(param.id, event.target.value)}
                                   value={value}
                                   type={param.type === 'string' ? 'text' : 'number'}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default App;
