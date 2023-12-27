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

export type ProfileUpdateDataType = {
    fullName: string | null,
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: ContactsType
}
type PropsType = {
    changeEditModeHandler: () => void
}

type FormikErrorType = {
    facebook?: string
    website?: string
    vk?: string
    twitter?: string
    instagram?: string
    youtube?: string
    github?: string
    mainLink?: string
    // [key: string]: string | undefined
}
export const ProfileDataForm = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profilePage.profile)
    const contacts = useAppSelector(state => state.profilePage.profile.contacts)
    const error = useAppSelector(state => state.profilePage.profile.contacts.error)

    const validationRule = (value: string) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'Incorrect url'
        }
        return  ''
    }
    const formik = useFormik({

        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {
                facebook: contacts.facebook,
                'website': contacts.website,
                vk: contacts.vk,
                twitter: profile.contacts.twitter,
                instagram: profile.contacts.instagram,
                youtube: profile.contacts.youtube,
                github: profile.contacts.github,
                mainLink: profile.contacts.mainLink
            }
        },

        // validate: (values) => {
        //     const errors: FormikErrorType = {}
        //         if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(values.contacts.website)) {
        //         errors.website = 'Invalid email address'
        //     }
        //     return errors
        // },
        onSubmit: values => {
            dispatch(saveProfileTC(values))
            props.changeEditModeHandler()
        },
    })

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <FormControlLabel label={'Looking for a job'}
                                          control={<Checkbox name="lookingForAJob"
                                                             onChange={formik.handleChange}
                                                             checked={formik.values.lookingForAJob}
                                          />}/>
                        <TextField label="Looking for a job description"
                                   margin="normal"
                                   placeholder={profile.lookingForAJobDescription}
                                   {...formik.getFieldProps('lookingForAJobDescription')}
                        />
                        <div style={{fontWeight: 'bold'}}>Contacts:</div>
                        {Object.entries(contacts).map(([key, value]) => (
                            <div key={key}>
                                <TextField
                                    label={key}
                                    margin="normal"
                                    placeholder={value}
                                    {...formik.getFieldProps('contacts.' + key)}
                                />
                            </div>
                        ))}
                        {error && <div style={{color: 'red'}}>{error}</div>}

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Save
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}