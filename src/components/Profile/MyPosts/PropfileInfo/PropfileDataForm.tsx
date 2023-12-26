import React from "react";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {saveProfileTC} from "../../../redux/profileReducer";
import {ContactsType} from "../../ProfileContainer";
import {Input} from "@mui/material";

export type ProfileUpdateDataType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}
type PropsType = {
    changeEditModeHandler: () => void
}

export const ProfileDataForm = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profilePage.profile)

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {
                facebook: profile.contacts.facebook,
                website: profile.contacts.website,
                vk: profile.contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink
            }
        },

        // validate: (values) => {
        //     const errors: FormikErrorType = {}
        //     if (!values.email) {
        //         errors.email = 'Required'
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address'
        //     }
        //     if (!values.password) {
        //         errors.password = 'Required'
        //     } else if (values.password.length < 5) {
        //         errors.password = 'must be more then 5 symbols'
        //     }
        //     return errors
        // },
        onSubmit: values => {
            dispatch(saveProfileTC(values))
            props.changeEditModeHandler()
        },
    })
    // const textField = register('name', { required: true })
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <FormControlLabel label={'Looking for a job'}
                                          control={<Checkbox name="lookingForAJob"
                                                             onChange={formik.handleChange}
                                                             checked={formik.values.lookingForAJob}/>}/>
                        <TextField label="Looking for a job description"
                                   margin="normal"
                                   placeholder={profile.lookingForAJobDescription}
                                   {...formik.getFieldProps('lookingForAJobDescription')}
                        />
                        <div style={{fontWeight: 'bold'}}>Contacts:</div>
                        <TextField label={'facebook'}
                                   type={'text'}
                                   margin="normal"
                                   {...formik.getFieldProps('facebook')}
                        />
                        {/*{formik.errors.email && formik.touched.email &&*/}
                        {/*    // <div style={{color: 'red'}}>{formik.errors.email}</div>}*/}
                        <TextField label="website"
                                   margin="normal"
                                   placeholder={profile.contacts.website}
                                   {...formik.getFieldProps('website')}
                        />
                        {/*{formik.errors.password && formik.touched.password &&*/}
                        {/*    <div style={{color: 'red'}}>{formik.errors.password}</div>}*/}
                        {/*<FormControlLabel label={'Remember me'}*/}
                        {/*                  control={<Checkbox name="rememberMe"*/}
                        {/*                                     onChange={formik.handleChange}*/}
                        {/*                                     checked={formik.values.rememberMe}/>}/>*/}
                        {/*{error && <div style={{color: 'red'}}>{error}</div>}*/}
                        <TextField label="vk"
                                   margin="normal"
                                   placeholder={profile.contacts.vk}
                                   {...formik.getFieldProps('vk')}
                        />
                        <TextField label="twitter"
                                   margin="normal"
                                   placeholder={profile.contacts.twitter}
                                   {...formik.getFieldProps('twitter')}
                        />
                        <TextField label="instagram"
                                   margin="normal"
                                   placeholder={profile.contacts.instagram}
                                   {...formik.getFieldProps('instagram')}
                        />
                        <TextField label="youtube"
                                   margin="normal"
                                   placeholder={profile.contacts.youtube}
                                   {...formik.getFieldProps('youtube')}
                        />
                        <TextField label="gitHub"
                                   margin="normal"
                                   placeholder={profile.contacts.github}
                                   {...formik.getFieldProps('gitHub')}
                        />
                        <TextField label="mainLink"
                                   margin="normal"
                                   placeholder={profile.contacts.mainLink}
                                   {...formik.getFieldProps('mainLink')}
                        />

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Save
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}