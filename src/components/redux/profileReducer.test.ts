import {addPostAC, profileReducer} from "./profileReducer";

let state = {
    postData: [
        {message: 'hi', id: 1, likesCount: 2},
        {message: 'nice', id: 2, likesCount: 3},
        {message: "it is okey", id: 3, likesCount: 1},
        {message: 'sdddvsdww', id: 4, likesCount: 45}
    ],
    profile: {
        isOwner: false,
        userId: 1,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: 'ASDDF',
        aboutMe: '',
        photos: {small: null, large: null},
        contacts: {
            github: 'string',
            vk: 'string',
            facebook: 'string',
            instagram: 'string',
            twitter: 'string',
            website: 'string',
            youtube: 'string',
            mainLink: ''
        }
    },
    status: ' '
}
test('New post should be added', () => {
    let action = addPostAC('samurai')
    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(5)
})
test('New post name should be added', () => {
    let action = addPostAC('samurai')
    let newState = profileReducer(state, action)
    expect(newState.postData[4].message).toBe('samurai')
})