import React, {ChangeEvent, useState} from 'react';
import {MapDispatchToPropsType, MapStateToPropsType} from "../../ProfileContainer";

export const ProfileStatus = (props: MapStateToPropsType & MapDispatchToPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        // debugger
        props.updateUserStatusTC(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus( e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status || '-----'}
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    )
}
// export class ProfileStatus extends React.Component<any, any>{
//
//     state:{editMode:boolean, status:string}={
//         editMode: false,
//         status:this.props.status
//     }
//     activateEditMode = () => {
//         this.setState({
//             editMode:true
//         })
//     }
//     deactivateEditMode = () => {
//         this.setState({
//             editMode:false
//         })
//         this.props.updateUserStatusTC(this.state.status)
//     }
//     onStatusChange = (e:ChangeEvent<HTMLInputElement>)=>{
//         // debugger
//         this.setState({
//             status: e.currentTarget.value
//         })
//     }
//     componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
//         if(prevProps.status !==this.props.status){
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//
//     render() {
//        return (
//             <>
//                 <div>
//                     {!this.state.editMode &&
//                         <span onDoubleClick={this.activateEditMode}>{this.props.status || '----'}</span>
//                     }
//                 </div>
//                 <div>
//                     {this.state.editMode &&
//                     <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
//                     }
//                 </div>
//             </>
//         )
//     }
// }
