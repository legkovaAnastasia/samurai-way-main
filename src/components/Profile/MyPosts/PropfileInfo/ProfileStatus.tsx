import React, {ChangeEvent} from 'react';

export class ProfileStatus extends React.Component<any, any>{

    state:{editMode:boolean, status:string}={
        editMode: false,
        status:this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode:true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
        this.props.updateUserStatusTC(this.state.status)
    }
    onStatusChange = (e:ChangeEvent<HTMLInputElement>)=>{
        // debugger
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(prevProps.status !==this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
       return (
            <>
                <div>
                    {!this.state.editMode &&
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '----'}</span>
                    }
                </div>
                <div>
                    {this.state.editMode &&
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    }
                </div>
            </>
        )
    }
}
