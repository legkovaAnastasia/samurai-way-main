import s from './MyPosts.module.css'
export const MyPosts = () => {
    return <div className={s.content}>
        <div>my posts
            <div>
                <textarea></textarea>
                <button>add post</button>
            </div>
            <div>new posts
                <div className={s.posts}>
                    <div className={s.item}>
                        <img src='https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'/>
                        post 1</div>
                    <div className='item'>post 2</div>
                    <div className='item'>post 3</div>
                </div>
            </div>
        </div>
    </div>
}